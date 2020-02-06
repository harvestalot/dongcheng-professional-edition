<!-- 公园绿地 -->
<template>
    <div class="main_content">
        <div class="echarts_content animated fadeInRight">
            <div class="echarts_content_sub">
                <div class="chart_content_box">
                    <div id="green_land_bar_chart_content" class="h_100"></div>
                </div>
                <div class="chart_content_box">
                    <div id="green_land_bar_line_chart_content" class="h_100"></div>
                </div>
            </div>
        </div>
        <div class="map_legend">
             <a-row>
                <a-col :span="12">
                    <img src="../../../../static/img/publicSpace/lvdi.png" alt="">
                    &nbsp;绿地
                </a-col>
                <a-col :span="12">
                    <img src="../../../../static/img/publicSpace/lvdi_1.png" alt="">
                    &nbsp;公园
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
            polygonLayer: this.$parent.viewLayerOption.polygon,
            chart_data: [
                {"value":"5.251251657","per_area":"1.75642359","name":"安定门街道"},
                {"value":"2.563265858","per_area":"0.077698369","name":"北新桥街道"},
                {"value":"1.253742965","per_area":"0.37628037","name":"朝阳门街道"},
                {"value":"0.074720748","per_area":"0.022459803","name":"崇外街道"},
                {"value":"1.132617787","per_area":"0.441504839","name":"东花市街道"},
                {"value":"11.0881746","per_area":"8.832721708","name":"东华门街道"},
                {"value":"1.360207502","per_area":"0.426107263","name":"东四街道"},
                {"value":"0.495070258","per_area":"0.239600198","name":"东直门街道"},
                {"value":"14.72741632","per_area":"5.744017771","name":"和平里街道"},
                {"value":"4.651962007","per_area":"2.857367194","name":"建国门街道"},
                {"value":"0.58070042","per_area":"0.170877398","name":"交道口街道"},
                {"value":"1.397721324","per_area":"0.51066127","name":"景山街道"},
                {"value":"29.36469755","per_area":"13.87786023","name":"龙潭街道"},
                {"value":"1.393196412","per_area":"0.744361383","name":"前门街道"},
                {"value":"7.662965557","per_area":"3.412853043","name":"体育馆街道"},
                {"value":"50.22919569","per_area":"39.58814354","name":"天坛街道"},
                {"value":"2.052995282","per_area":"0.838819317","name":"永定门街道"}
            ],
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.get_green_land_coverage();
        this.get_green_land_layer();
    },
    methods: {
        get_green_land_layer(){
            var colors = ["#1296db", "#1296db", "#f50bf0"];
            this.http.getLocalhostJson("/static/json/publicSpace/green_land.json", res =>{
                this.polygonLayer.setData(res,{lnglat: 'lnglat'});
                this.polygonLayer.setOptions({
                    style: {
                        // opacity: 0.5,
                        color: function (item) {
                            var land_name = item.value.type;
                            var color = colors[0];
                            switch (land_name){
                                case "公园" :
                                    color = colors[1];
                                    break;
                                case "绿地" :
                                    color = colors[2];
                                    break;
                                default:
                                    color = colors[0];
                            }
                            return color;
                        },
                        height: function () {
                            return Math.random() * 500 + 100;
                        }
                    }
                    // selectStyle:{
                    //     color:"#13EFDC",
                    // }
                });
                this.polygonLayer.render();
                this.polygonLayer.show();
            })
        },
        get_green_land_coverage(){//各街道绿地数据
            this.http.get("publicSpace/getGreenLandCoverage", { category: "convenient" }, res =>{
                if(res.success){
                    var data  = JSON.parse(Decrypt(res.data.results.resultKey));
                    this.chart_data = data;
                    this.load_green_land_bar_chart();
                    this.load_green_land_bar_line_chart();
                }
            })
        },
        load_green_land_bar_chart(){//各街道绿地500米覆盖率
            var barChart = echarts.init(document.getElementById("green_land_bar_chart_content"));
            var bar_option = {
                color: this.$Basice.colors,
                title: { ...{
                    text:"各街道绿地500米覆盖率",
                }, ...this.$Basice.echart_title},
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            
                        type : 'shadow'       
                    }
                },
                grid: { ...this.$Basice.grid, ...{ top: 80 } },
                xAxis:{
                    type : 'category',
                    inverse: true,
                    data: [],
                    axisLabel: { ...this.$Basice.coordinate_axis_style.axisLabel, ...{
                        formatter:function(val){
                            return val.split("").join("\n");
                        }
                    } },
                    axisLine: this.$Basice.coordinate_axis_style.axisLine,
                    splitLine: this.$Basice.coordinate_axis_style.splitLine,
                },
                yAxis: {
                    type : 'value',
                    name: '%',
                    // minInterval:100,//设置左侧Y轴最小刻度
                    axisLabel: this.$Basice.coordinate_axis_style.axisLabel,
                    axisLine: this.$Basice.coordinate_axis_style.axisLine,
                    splitLine: this.$Basice.coordinate_axis_style.splitLine,
                },
                series :{
                    name:'各街道绿地500米覆盖率',
                    type:'bar',
                    data:[],
                    barCategoryGap:5,
                    itemStyle:{
                    normal:{
                        barBorderRadius: [30, 30, 0, 0],
                    }
                    }
                },
            };
            for(var i = 0; i < this.chart_data.length; i++){
                var item = this.chart_data[i];
                bar_option.xAxis.data.push(item.name.replace("街道",""));
                bar_option.series.data.push(item.greenCoverage500);
            }
            barChart.setOption(bar_option, true);
            window.onresize = function(){
                barChart.resize();
            }
        },
        load_green_land_bar_line_chart(){//各街道绿地覆盖率和人均绿地面积
            var barChart = echarts.init(document.getElementById("green_land_bar_line_chart_content"));
            var bar_option = {
                color: this.$Basice.colors,
                title: { ...{
                    text:"各街道绿地覆盖率和人均绿地面积",
                }, ...this.$Basice.echart_title},
                legend: {
                    data: ['覆盖率', '人均绿地面积'],
                    textStyle: {
                        color: '#B4B4B4'
                    },
                    top:40,
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            
                        type : 'shadow'       
                    }
                },
                grid: this.$Basice.grid,
                xAxis:{
                    type : 'category',
                    inverse: true,
                    data: [],
                    axisLabel: { ...this.$Basice.coordinate_axis_style.axisLabel, ...{
                        formatter:function(val){
                            return val.split("").join("\n");
                        }
                    } },
                    axisLine: this.$Basice.coordinate_axis_style.axisLine,
                    splitLine: this.$Basice.coordinate_axis_style.splitLine,
                },
                yAxis:[
                    {
                        type : 'value',
                        name: '%',
                        // minInterval:100,//设置左侧Y轴最小刻度
                        axisLabel: this.$Basice.coordinate_axis_style.axisLabel,
                        axisLine: this.$Basice.coordinate_axis_style.axisLine,
                        splitLine: this.$Basice.coordinate_axis_style.splitLine,
                    },
                    {
                        name: '平方公里',
                        splitLine: {show: false},
                        axisLine: {
                            lineStyle: {
                                color: '#B4B4B4',
                            }
                        },
                        axisLabel:{
                            formatter:'{value} ',
                        }
                    }
                ],
                series : [
                    {
                        type:'bar',
                        name:'覆盖率',
                        data:[],
                        barCategoryGap:5,
                        itemStyle:{
                            normal:{
                            barBorderRadius: [30, 30, 0, 0],
                            }
                        }
                    },{
                        name: '人均绿地面积',
                        type: 'line',
                        smooth: true,
                        showAllSymbol: true,
                        symbol: 'emptyCircle',
                        symbolSize: 5,
                        yAxisIndex: 1,
                        itemStyle: {
                                normal: {
                                color:'#F02FC2'},
                        },
                        data: []
                    }, 
                ]
            };
            for(var i = 0; i < this.chart_data.length; i++){
                var item = this.chart_data[i];
                bar_option.xAxis.data.push(item.name.replace("街道",""));
                bar_option.series[0].data.push(item.greenCoverage);
                bar_option.series[1].data.push(item.areaPerson);
            }
            barChart.setOption(bar_option, true);
            window.onresize = function(){
                barChart.resize();
            }
        },

    },
    created() {},
}
</script>
<style lang='less' scoped>

</style>