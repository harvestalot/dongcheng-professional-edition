<!-- 人流量监测 -->
<template>
    <div class="main_content">
        <div class="echarts_content animated fadeInRight">
            <div class="echarts_content_sub">
                
            </div>
        </div>
        <div id="timeline" class="timeline">
            <a-row>
                <a-col :span="1" v-for="(item, index) in time_line_data" :key="index">
                    <p class="time_line_style">
                        <span :class="{ time_point: item.time_point, current_time_point: item.current_time_point}"></span>
                    </p>
                    {{ item.time }}
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>

export default {
    components: {},
    data() {
        return {
            mainMapLayer: this.$parent.mapLayerOption.base,
            timelineHeatLayer: this.$parent.viewLayerOption.timelineHeat,
            // time_line_data: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00",
            //     "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
            //     "16:00", "17:00", "18:00", "19:00", "20:00", "11:00", "22:00", "23:00"],
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
        };
    },
    computed: {},
    watch: {
    },
    mounted() {
        this.get_people_activities_layer();
        // this.get_timeline();
        const currentTimeData = this.time_line_data.filter((item) => {
            return item.time === this.currentTime;
        });
        currentTimeData[0].current_time_point = true;
        var index = 0;
        this.$Basice.timer = setInterval(() =>{
            console.log(index)
            index ++;
            this.currentTime =  this.time_line_data[index].time;
            this.time_line_data.forEach((item) => {
                item.current_time_point = false;
            });
            const currentTimeData = this.time_line_data.filter((item) => {
                return item.time === this.currentTime;
            });
            currentTimeData[0].current_time_point = true;
            this.get_people_activities_layer();
            index === 23? index = 0:"";
        }, 5000);
    },
    methods: {
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
                    playInterval: 5000,
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
        }
    },
    created() {},
}
</script>
<style lang='less' scoped>

</style>