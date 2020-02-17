<!-- 人流量监测 -->
<template>
    <div class="main_content">
        <div class="echarts_content animated fadeInRight">
            <div class="echarts_content_sub">
                <div class="chart_content_box">
                    <div :id="this.chartOption_1.id" class="h_100"></div>
                </div>
                <div class="chart_content_box">
                    <div :id="this.chartOption_2.id" class="h_100"></div>
                </div>
                <div class="source_content">注：点击所选重点区域，右侧将显示该区域.24小时人流量变化情况</div>
            </div>
        </div>
        <div id="timeline" class="timeline">
            <a-row>
                <a-col :span="1">
                    <div class="timeline_control" @click="handle_timeline_control" v-if="!isPlayInterval"><img src="../../../../static/img/monitor/bofang.png" alt=""></div>
                    <div class="timeline_control" @click="handle_timeline_control" v-else><img src="../../../../static/img/monitor/zanting.png" alt=""></div>
                </a-col>
                <a-col :span="23">
                    <a-row>
                        <a-col :span="1" v-for="(item, index) in time_line_data" :key="index" @click="get_current_time_layer(index, item.time)">
                            <p class="time_line_style">
                                <span :class="{ time_point: item.time_point, current_time_point: item.current_time_point}"></span>
                            </p>
                            {{ item.time }}
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>

import LineAreaChart from "../common/LineAreaChart";
export default {
    components: {
        LineAreaChart,
    },
    data() {
        return {
            mainMapLayer: this.$parent.mapLayerOption.base,
            timelineHeatLayer: this.$parent.viewLayerOption.timelineHeat,
            polygonLayer: this.$parent.viewLayerOption.polygon,
            // time_line_data: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00",
            //     "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
            //     "16:00", "17:00", "18:00", "19:00", "20:00", "11:00", "22:00", "23:00"],
            isPlayInterval:false,
            timeline_control_icon_1: "../../../../static/img/monitor/bofang.png",
            timeline_control_icon_2: "../../../../static/img/monitor/zanting.png",
            current_index: 0,
            currentTime: "00:00",
            time_line_data:[
                { time: "00:00", time_point : true, current_time_point : false },
                { time: "01:00", time_point : true, current_time_point : false },
                { time: "02:00", time_point : true, current_time_point : false },
                { time: "03:00", time_point : true, current_time_point : false },
                { time: "04:00", time_point : true, current_time_point : false },
                { time: "05:00", time_point : true, current_time_point : false },
                { time: "06:00", time_point : true, current_time_point : false },
                { time: "07:00", time_point : true, current_time_point : false },
                { time: "08:00", time_point : true, current_time_point : false },
                { time: "09:00", time_point : true, current_time_point : false },
                { time: "10:00", time_point : true, current_time_point : false },
                { time: "11:00", time_point : true, current_time_point : false },
                { time: "12:00", time_point : true, current_time_point : false },
                { time: "13:00", time_point : true, current_time_point : false },
                { time: "14:00", time_point : true, current_time_point : false },
                { time: "15:00", time_point : true, current_time_point : false },
                { time: "16:00", time_point : true, current_time_point : false },
                { time: "17:00", time_point : true, current_time_point : false },
                { time: "18:00", time_point : true, current_time_point : false },
                { time: "19:00", time_point : true, current_time_point : false },
                { time: "20:00", time_point : true, current_time_point : false },
                { time: "21:00", time_point : true, current_time_point : false },
                { time: "22:00", time_point : true, current_time_point : false },
                { time: "23:00", time_point : true, current_time_point : false },
            ],
            street_names: [],
            legend_data:["居住人口就业地", "就业人口居住地"],
            office_residence_ratio_data: [],//职住比
            line_chart_data: {
                "居住人口就业地": [],
                "就业人口居住地": [],
            },
            chartOption_1:{
                isSuccess:false,
                id: "line_area_chart_content_1",
                title:"01:00 ~ 12:00时人流量变化",
                line_name:"崇文门外商圈",
                xAxis_data:[ "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00",
                    "08:00", "09:00", "10:00", "11:00", "12:00"],
                line_series_data:[],
            },
            chartOption_2:{
                isSuccess:false,
                id: "line_area_chart_content_2",
                title:"13:00 ~ 24:00时人流量变化",
                line_name:"崇文门外商圈",
                xAxis_data:[ "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
                    "20:00", "11:00", "22:00", "23:00", "24:00"],
                line_series_data:[],
            }
        };
    },
    computed: {},
    watch: {
    },
    mounted() {
        this.mainMapLayer.setStatus({zoomEnable :  true});
        this.get_statistics_chart_data();
        this.get_people_activities_layer();
        this.load_vitality_important_area_layer();
        // this.get_timeline();
        const currentTimeData = this.time_line_data.filter((item) => {
            return item.time === this.currentTime;
        });
        currentTimeData[0].current_time_point = true;
        // var index = 0;
        // this.$Basice.timer = setInterval(() =>{
        //     // console.log(index)
        //     this.current_index ++;
        //     this.currentTime =  this.time_line_data[this.current_index].time;
        //     this.time_line_data.forEach((item) => {
        //         item.current_time_point = false;
        //     });
        //     const currentTimeData = this.time_line_data.filter((item) => {
        //         return item.time === this.currentTime;
        //     });
        //     currentTimeData[0].current_time_point = true;
        //     this.get_people_activities_layer();
        //     this.current_index === 23? this.current_index = 0 : "";
        // }, 5000);
    },
    methods: {
        handle_timeline_control(){//操作时间轴暂停和开始
            this.isPlayInterval = !this.isPlayInterval;
            if(this.isPlayInterval){
                this.paly_timeline()
            }else{
                window.clearInterval(this.$Basice.timer);
            }
        },
        paly_timeline(){
            this.$Basice.timer = setInterval(() =>{
                // console.log(index)
                this.current_index ++;
                this.currentTime =  this.time_line_data[this.current_index].time;
                this.time_line_data.forEach((item) => {
                    item.current_time_point = false;
                });
                const currentTimeData = this.time_line_data.filter((item) => {
                    return item.time === this.currentTime;
                });
                currentTimeData[0].current_time_point = true;
                this.get_people_activities_layer();
                this.current_index === 23? this.current_index = 0 : "";
            }, 3000);
        },
        get_current_time_layer(index, time){
            this.current_index = index;
            this.currentTime = time;
            this.time_line_data.forEach((item) => {
                item.current_time_point = false;
            });
            const currentTimeData = this.time_line_data.filter((item) => {
                return item.time === this.currentTime;
            });
            currentTimeData[0].current_time_point = true;
            this.get_people_activities_layer();
        },
        get_people_activities_layer(){//人口活动热力图层
            this.http.getLocalhostJson("/static/json/monitor/people_activities.csv", res =>{
                var _this = this;
                this.timelineHeatLayer.setData(res, {
                    value: function (params) {
                        if (params) {
                            var value = params[_this.currentTime];
                            return value;
                        }
                    },
                    // 或者使用回调函数构造经纬度坐标
                     lnglat: function (obj) {
                        if (obj.value) {
                             var value = obj.value;
                             var lnglat = wgs84togcj02(value['LON'], value['LAT']);
                             return lnglat;
                        }
                     },
                    // 指定数据类型
                    type: 'csv'
                });
                this.timelineHeatLayer.setOptions({
                    style: {
                        radius: 18,
                        color: {
                            0.1:"#2892C6",
                            0.2:"#81B3AA",
                            0.3: '#BFD38B',
                            0.4: '#FAFA64',
                            0.5: '#FCB344',
                            0.7: '#FD0100',
                            1:"#A80000",
                        },
                        // opacity:[0.3,0.7]
                    }
                });
                this.timelineHeatLayer.render();
                this.timelineHeatLayer.show();
            })
        },
        load_vitality_important_area_layer(){//重点活动区域图层
            const _this = this;
            this.http.getLocalhostJson("/static/json/monitor/important_culture_area_border_data.json", res =>{
                this.polygonLayer.setData(res,{lnglat: 'lnglat'});
                this.polygonLayer.setOptions({
                    style: {
                        // opacity: 0.5,
                        color: function (item) {
                            var value = item.value.properties.type;
                            var colors = _this.$Basice.chromatic_gradient;
                            var color = "";
                            switch (value){
                                case "音乐" :
                                    color = colors[1];
                                    break;
                                case (value > 0.51 && value < 0.80) :
                                    color = colors[2];
                                    break;
                                case (value > 0.81 && value < 1.0) :
                                    color = colors[3];
                                    break;
                                case (value > 1.01 && value < 1.20) :
                                    color = colors[4];
                                    break;
                                case (value > 1.21 && value < 1.40) :
                                    color = colors[5];
                                    break;
                                case (value > 1.41 && value < 1.60) :
                                    color = colors[6];
                                    break;
                                case (value > 1.61 && value < 2.24) :
                                    color = colors[7];
                                    break;
                                default:
                                    color = colors[7];
                            }
                            return color;
                        },
                    }
                });
                this.polygonLayer.render();
                this.polygonLayer.show();
                this.polygonLayer.on("click", function(ev){
                    var name = ev.rawData.properties.name;
                    _this.chartOption_1.line_name = name;
                    _this.chartOption_2.line_name = name;
                    _this.get_view_data(name);
                })
            })
        },
        get_timeline(){//时间轴
            var timelineChart = echarts.init(document.getElementById("timeline"));
            var option = {
                timeline: {
                    left:10,
                    right:10,
                    bottom:10,
                    axisType: 'category',
                    // realtime: false,
                    // loop: false,
                    autoPlay: true,
                    // currentIndex: 0,
                    playInterval: 3000,
                    controlStyle: {
                        position:"right",
                        showNextBtn: false,
                        showPrevBtn: false,
                        itemGap:20,
                        color:"#F0B33C",
                        borderColor:"#F0B33C",
                    },
                    data: this.time_line_data,
                    checkpointStyle:{
                        symbolSize:16,
                        color:"#F0B33C",
                    },
                    lineStyle:{
                        color:"#F0B33C",
                    },
                    label: {
                        color:"#fff",
                        lineHeight: 30,
                    }
                }
            };
            timelineChart.setOption(option, true);
            var _this = this;
            console.log(window)
            timelineChart.off("timelinechanged");
            timelineChart.on("timelinechanged", (params) => {
                console.log(params)
                _this.currentTime = _this.time_line_data[params.currentIndex];
                _this.get_people_activities_layer();
            })
        },
        get_statistics_chart_data(){//获取统计图表数据
            this.http.get("vitality/getPopulationVitality", {}, res =>{
                if(res.success){
                    var data  = JSON.parse(Decrypt(res.data.results.resultKey));
                    this.visitors_flow_rate_data = data;
                    this.get_view_data(this.chartOption_1.line_name);
                }
            })
        },
        get_view_data(name){
            this.chartOption_1.isSuccess = false;
            this.chartOption_2.isSuccess = false;
            const filter_data = this.visitors_flow_rate_data.filter( (item) =>{
                return item.keyArea === name
            })
            var data_1 = [], data_2 = [];
            for(var i = 0; i < 24; i++){
                if( 1 <= i && i <= 12){
                    data_1.push(filter_data[0]["sumPeop" + i]);
                }else if( 13 <= i && i <= 23){
                    data_2.push(filter_data[0]["sumPeop" + i]);
                }
            }
            data_2.push(filter_data[0]["sumPeop0"]);
            this.chartOption_1 = {
                isSuccess:true,
                id: "line_area_chart_content_1",
                title:"01:00 ~ 12:00时人流量变化",
                line_name: name,
                xAxis_data:[ "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00",
                    "08:00", "09:00", "10:00", "11:00", "12:00"],
                line_series_data: data_1,
            }
            this.chartOption_2 = {
                isSuccess:true,
                id: "line_area_chart_content_2",
                title:"13:00 ~ 24:00时人流量变化",
                line_name: name,
                xAxis_data:[ "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
                    "20:00", "11:00", "22:00", "23:00", "24:00"],
                line_series_data: data_2,
            }
            this.load_line_chart(this.chartOption_1)
            this.load_line_chart(this.chartOption_2)
        },
        load_line_chart(lineChartOption){
            var lineChart = echarts.init(document.getElementById(lineChartOption.id));
            var line_option = {
                color: this.$Basice.colors,
                title:{ ...{
                    text: lineChartOption.line_name + lineChartOption.title,
                }, ...this.$Basice.echart_title},
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            
                        type : 'shadow'       
                    }
                },
                // legend: { 
                //     ...{ data: this.lenged_data},
                //     ...this.$Basice.legend
                // },
                grid: { ...this.$Basice.grid, ...{ left: 60 }},
                xAxis: {
                    type : 'category',
                    data: lineChartOption.xAxis_data,
                    axisLabel: { ...this.$Basice.coordinate_axis_style.axisLabel, 
                        ...{formatter:function(val){
                                return val.split("").join("\n");
                            }
                        }
                    },
                    axisLine: this.$Basice.coordinate_axis_style.axisLine,
                    splitLine: this.$Basice.coordinate_axis_style.splitLine,
                },
                yAxis: { ...{
                    type : 'value',
                    name: '数量',
                }, ...this.$Basice.coordinate_axis_style},
                series: [
                    {
                        name: lineChartOption.line_name,
                        type: 'line',
                        stack: 'a',
                        barCategoryGap:5,
                        data: lineChartOption.line_series_data
                    }
                ]
            };
            lineChart.setOption(line_option, true);
            window.onresize = function(){
                lineChart.resize();
            }
        }
    },
    created() {},
}
</script>
<style lang='less' scoped>
    .chart_content_box{
        height: 47%;
    }
    .source_content{
        padding-right: 15px;
        font-size: 12px;
    }
</style>