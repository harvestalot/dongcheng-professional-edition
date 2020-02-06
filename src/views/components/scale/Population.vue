<!-- 人口规模 -->
<template>
    <div class="main_content">
        <div class="layer_content">
            <a-select style="width: 200px" placeholder="请选择图层类型" allowClear @change="onChangeLayer">
                <a-select-option value="1">居住人口分布</a-select-option>
                <a-select-option value="2">就业人口分布</a-select-option>
                <a-select-option value="3">居住人口就业地</a-select-option>
                <a-select-option value="4">就业人口居住地</a-select-option>
                <a-select-option value="5">职住比</a-select-option>
            </a-select>
        </div>
        <div class="echarts_content animated fadeInRight">
            <div class="echarts_content_sub">
                <div class="chart_content_box">
                    <div id="pictorial_bar_chart_content" class="h_100"></div>
                </div>
                <div class="chart_content_box">
                    <div id="line_stack_chart_content" class="h_100"></div>
                </div>
                <div class="source_content">数据来源：联通手机信令数据</div>
            </div>
        </div>
        <div class="map_legend chromatic_gradient_map_legend" v-if="layer_type_code==5">
             <a-row>
                <a-col :span="24" class="chromatic_gradient">
                    <span></span>&nbsp;&nbsp;0.23&nbsp;-&nbsp;0.35
                </a-col>
                <a-col :span="24" class="mt_10 chromatic_gradient">
                    <span></span>&nbsp;&nbsp;0.36&nbsp;-&nbsp;0.45
                </a-col>
                <a-col :span="24" class="mt_10 chromatic_gradient">
                    <span></span>&nbsp;&nbsp;0.46&nbsp;-&nbsp;0.55
                </a-col>
                <a-col :span="24" class="mt_10 chromatic_gradient">
                    <span></span>&nbsp;&nbsp;0.56&nbsp;-&nbsp;0.80
                </a-col>
                <a-col :span="24" class="mt_10 chromatic_gradient">
                    <span></span>&nbsp;&nbsp;0.81&nbsp;-&nbsp;1.00
                </a-col>
                <a-col :span="24" class="mt_10 chromatic_gradient">
                    <span></span>&nbsp;&nbsp;1.01&nbsp;-&nbsp;1.40
                </a-col>
                <a-col :span="24" class="mt_10 chromatic_gradient">
                    <span></span>&nbsp;&nbsp;1.41&nbsp;-&nbsp;2.60
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
export default {
    name:"Population",
    inject:["reload"],
    components: {},
    data() {
        return {
            mainMapLayer: this.$parent.mapLayerOption.base,
            heatLayer: this.$parent.viewLayerOption.heat,
            polygonLayer: this.$parent.viewLayerOption.polygon,
            layer_type_code:"",
            street_names: [],
            legend_data:["居住人口就业地", "就业人口居住地"],
            office_residence_ratio_data: [],//职住比
            line_chart_data: {
                "居住人口就业地": [],
                "就业人口居住地": [],
            }
        };
    },
    computed: {},
    watch: {
    },
    methods: {},
    created() {},
    mounted() {
        this.get_statistics_chart_data();
    },
    methods:{
        onChangeLayer(value){//改变图层
            this.layer_type_code = value;
            this.heatLayer.hide();
            this.polygonLayer.hide();
            switch (value){
                case "1" :
                    this.get_resident_population_layer();
                    break;
                case "2" :
                    this.get_employed_population_layer();
                    break;
                case "3" :
                    this.get_resident_population_employment_place_layer();
                    break;
                case "4" :
                    this.get_employment_population_place_layer();
                    break;
                case "5" :
                    this.get_office_residence_ratio_layer();
                    break;
                default:
                    this.heatLayer.hide();
                    this.polygonLayer.hide();
            }
        },
        get_resident_population_layer(){//居住人口热力图层
            this.http.getLocalhostJson("/static/json/scale/resident_population.json", res =>{
                this.heatLayer.setData(res, {
                    lnglat: "lnglat",
                    // // 或者使用回调函数构造经纬度坐标
                    //  lnglat: function (obj) {
                    //     if (obj.value) {
                    //          var value = obj.value;
                    //          var lnglat = [value['X'], value['Y']];
                    //          return lnglat;
                    //     }
                    //  },
                    // // 指定数据类型
                    // type: 'csv'
                });
                this.heatLayer.setOptions({
                    style: {
                        radius: 16,
                        color: {
                            0.5: '#2c7bb6',
                            0.65: '#abd9e9',
                            0.7: '#ffffbf',
                            0.9: '#fde468',
                            1.0: '#d7191c'
                        },
                        // opacity:[0.3,0.7]
                    }
                });
                this.heatLayer.render();
                this.heatLayer.show();
            })
        },
        get_resident_population_employment_place_layer(){//居住人口就业地热力图层
            this.http.getLocalhostJson("/static/json/scale/resident_population_employment_place.json", res =>{
                this.heatLayer.setData(res, {
                    lnglat: "lnglat",
                });
                this.heatLayer.setOptions({
                    style: {
                        radius: 16,
                        color: {
                            0.5: '#2c7bb6',
                            0.65: '#abd9e9',
                            0.7: '#ffffbf',
                            0.9: '#fde468',
                            1.0: '#d7191c'
                        },
                        // opacity:[0.3,0.7]
                    }
                });
                this.heatLayer.render();
                this.heatLayer.show();
            })
        },
        get_employed_population_layer(){//就业人口热力图层
            this.http.getLocalhostJson("/static/json/scale/employed_population.json", res =>{
                this.heatLayer.setData(res, {
                    lnglat: "lnglat",
                });
                this.heatLayer.setOptions({
                    style: {
                        radius: 16,
                        color: {
                            0.5: '#2c7bb6',
                            0.65: '#abd9e9',
                            0.7: '#ffffbf',
                            0.9: '#fde468',
                            1.0: '#d7191c'
                        },
                        // opacity:[0.3,0.7]
                    }
                });
                this.heatLayer.render();
                this.heatLayer.show();
            })
        },
        get_employment_population_place_layer(){//就业人口居住地热力图层
            this.http.getLocalhostJson("/static/json/scale/employment_population_place.json", res =>{
                this.heatLayer.setData(res, {
                    lnglat: "lnglat",
                });
                this.heatLayer.setOptions({
                    style: {
                        radius: 16,
                        color: {
                            0.5: '#2c7bb6',
                            0.65: '#abd9e9',
                            0.7: '#ffffbf',
                            0.9: '#fde468',
                            1.0: '#d7191c'
                        },
                        // opacity:[0.3,0.7]
                    }
                });
                this.heatLayer.render();
                this.heatLayer.show();
            })
        },
        get_office_residence_ratio_layer(){//职住比分布图层
            var _this = this;
            this.http.getLocalhostJson("/static/json/scale/office_residence_ratio.json", res =>{
                this.polygonLayer.setData(res, {lnglat: 'lnglat'});
                this.polygonLayer.setOptions({
                    style: {
                        opacity: 0.5,
                        color: function (item) {
                            var value = item.value.value;
                            var colors = _this.$Basice.chromatic_gradient;
                            var color = "";
                            switch (true){
                                case (value > 0.23 && value < 0.35) :
                                    color = colors[1];
                                    break;
                                case (value > 0.36 && value < 0.45) :
                                    color = colors[2];
                                    break;
                                case (value > 0.46 && value < 0.55) :
                                    color = colors[3];
                                    break;
                                case (value > 0.56 && value < 0.80) :
                                    color = colors[4];
                                    break;
                                case (value > 0.81 && value < 1.0) :
                                    color = colors[5];
                                    break;
                                case (value > 1.01 && value < 1.40) :
                                    color = colors[6];
                                    break;
                                case (value > 1.41 && value < 2.60) :
                                    color = colors[7];
                                    break;
                                default:
                                    color = colors[0];
                            }
                            return color;
                        },
                        // height: function () {
                        //     return Math.random() * 500 + 100;
                        // }
                    }
                });
                this.polygonLayer.render();
                this.polygonLayer.show();
            })
        },
        get_statistics_chart_data(){//获取统计图表数据
            this.http.get("/jobResidenceRatio/getjobResidenceRatio", {}, res =>{
                if(res.success){
                    var data  = JSON.parse(Decrypt(res.data.results.resultKey));
                    for(var i = 0; i < data.length; i++){
                        var item = data[i];
                        this.street_names.push(item.town.split("街道")[0]);
                        this.office_residence_ratio_data.push((item.jobResidenceRatio*1).toFixed(1));
                        this.line_chart_data["居住人口就业地"].push(item.liveEmployment);
                        this.line_chart_data["就业人口居住地"].push(item.employmentLive);
                    }
                    this.get_pictorial_bar_chart();
                    this.get_line_stack_chart();
                }
            })
        },
        get_pictorial_bar_chart(){//职住比统计图
            var pictorial_bar_chart = echarts.init(document.getElementById("pictorial_bar_chart_content"));
            var pictorial_bar_option = {
                title:{ ...{
                    text: "各街道职住比统计",
                }, ...this.$Basice.echart_title},
                grid: {
                    containLabel:false,
                    left: 30,
                    top: 50, 
                    bottom:80,
                },
                xAxis: {
                    type: "category",
                    data: this.street_names,
                    axisLabel: { ...this.$Basice.coordinate_axis_style.axisLabel, ...{
                        formatter:function(val){
                            return val.split("").join("\n");
                        }
                    }},
                    axisLine: this.$Basice.coordinate_axis_style.axisLine,
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: "value",
                    axisLabel:  this.$Basice.coordinate_axis_style.axisLabel,
                    axisLine: this.$Basice.coordinate_axis_style.axisLine,
                    splitLine: {
                        show: false
                    }
                },
                series: [
                    {
                        type: "pictorialBar",
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                fontSize: 12,
                                color: this.$Basice.colors[0],
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: {
                                    type: "linear",
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                            offset: 0,
                                            color: this.$Basice.colors[0]
                                        },
                                        {
                                            offset: 1,
                                            color: this.$Basice.colors[0]
                                        }
                                    ],
                                    global: false
                                }
                            }
                        },
                        data: this.office_residence_ratio_data,
                        stack: "a",
                        symbol: "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z"
                    }
                ]
            }
            pictorial_bar_chart.setOption(pictorial_bar_option, true);
            window.onresize = function(){
                pictorial_bar_chart.resize();
            }
        },
        get_line_stack_chart(){//居住人口就业地和就业人口居住地统计图
            var line_chart = echarts.init(document.getElementById("line_stack_chart_content"));
            var line_chart_option = {
                title:{ ...{
                    text: "居住人口就业地和就业人口居住地统计",
                }, ...this.$Basice.echart_title},
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    }
                },
                legend: { 
                    ...{ data: this.legend_data},
                    ...this.$Basice.legend
                },
                grid: { ...this.$Basice.grid, ...{ left: 60 }},
                xAxis: {
                    type : 'category',
                    data: this.street_names,
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
                series: []
            };

            for(var i = 0; i < this.legend_data.length; i++){
                var item = this.legend_data[i];
                line_chart_option.series.push({
                    name: item,
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            width: 1
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: this.$Basice.colors[i],
                                opacity:0.3,
                            }, {
                                offset: 0.8,
                                // color: 'rgba(137, 189, 27, 0)'
                                color: this.$Basice.colors[i],
                                opacity:0,
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 3
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: this.$Basice.colors[i],
                            borderColor: this.$Basice.colors[i],
                            borderWidth: 3
                        }
                    },
                    data: this.line_chart_data[item]
                })
            }
            line_chart.setOption(line_chart_option, true);
            window.onresize = function(){
                line_chart.resize();
            }
        }
    }
}
</script>
<style lang='less' scoped>
    .chart_content_box{
        height: 48.5%;
    }
    // .slide-fade-enter-active {
    //     transition: all .3s ease;
    // }
    // .slide-fade-leave-active {
    //     transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    // }
    // .slide-fade-enter, .slide-fade-leave-to {
    //     transform: translateX(-100px);
    //     opacity: 0;
    // }
</style>