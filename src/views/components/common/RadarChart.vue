<template>
   <div class="h_100">
        <div id="radar_chart_content" class="h_100"></div>
   </div>
</template>

<script>
export default {
    name: "RadarChart",
    props:{
        radarChartOption:{
            type: Object,
            default: () => {}
        }
    },
    data(){
        return{
            title: this.radarChartOption.title_1 || "",
            lenged_data: this.radarChartOption.lenged_data || [],
            radar_chart_indicator_data: this.radarChartOption.radar_chart_indicator_data || [],
            pie_comprehensive_data: this.radarChartOption.pie_comprehensive_data || {},
            legend_selected: this.radarChartOption.legend_selected|| {},
        }
    },
    mounted(){
        this.load_radar_chart();
    },
    methods:{
        load_radar_chart(){//加载覆盖率雷达图图表数据
            var radarChart = echarts.init(document.getElementById("radar_chart_content"));
            var radar_option = {
                color: this.$Basice.colors,
                title:{ ...{
                    text: this.title,
                }, ...this.$Basice.echart_title},
                legend: { 
                    ...{ data: this.lenged_data, selected: this.legend_selected},
                    ...this.$Basice.legend
                },
                tooltip: {
                    show: true,
                    trigger: "item"
                },
                radar: {
                    center: ["50%", "63%"],
                    radius: "60%",
                    startAngle: 90,
                    splitNumber: 4,
                    shape: "circle",
                    splitArea: {
                        "areaStyle": {
                            "color": ["transparent"]
                        }
                    },
                    axisLine: {
                        "show": true,
                        "lineStyle": {
                            "color": "grey"//
                        }
                    },
                    splitLine: {
                        "show": true,
                        "lineStyle": {
                            "color": "grey"//
                        }
                    },
                    indicator: this.radar_chart_indicator_data
                },
                "series": []
            };
            for(var i = 0; i < this.lenged_data.length; i++){
                radar_option.series.push(
                    {
                        "name": this.lenged_data[i],
                        "type": "radar",
                        "symbol": "circle",
                        "symbolSize": 5,
                        "areaStyle": {
                            "normal": {
                                "color": this.$Basice.colors[i],
                                opacity:0.5,
                            }
                        },
                        itemStyle:{
                            color:this.$Basice.colors[i],
                            borderColor:this.$Basice.colors[i],
                            borderWidth:5,
                            opacity:0.5,
                        },
                        "lineStyle": {
                            "normal": {
                                "type": "dashed",
                                "color": this.$Basice.colors[i],
                                "width": 2,
                                opacity:0.3,
                            }
                        },
                        "data": [
                            this.pie_comprehensive_data[this.lenged_data[i]]
                        ]
                    }); 
            }
            radarChart.setOption(radar_option, true);
            window.onresize = function(){
                radarChart.resize();
            }
        },
    }
}

</script>
<style scoped>
</style>