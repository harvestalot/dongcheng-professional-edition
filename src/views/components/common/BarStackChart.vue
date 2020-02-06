<template>
   <div class="h_100">
        <div id="bar_stack_chart_content" class="h_100"></div>
   </div>
</template>

<script>
export default {
    name: "BarStackChart",
    props:{
        barStackChartOption:{
            type: Object,
            default: () => {}
        }
    },
    data(){
        return{
            grid: this.barStackChartOption.grid || "",
            title: this.barStackChartOption.title_2 || "",
            street_name_data: this.barStackChartOption.street_name_data || [],
            lenged_data: this.barStackChartOption.lenged_data || [],
            bar_comprehensive_data: this.barStackChartOption.bar_comprehensive_data || {},
        }
    },
    mounted(){
        this.load_bar_stack_chart();
    },
    methods:{
        load_bar_stack_chart(){//加载堆积柱状图表数据
            var barChart = echarts.init(document.getElementById("bar_stack_chart_content"));
            var bar_option = {
                color: this.$Basice.colors,
                title:{ ...{
                    text: this.title,
                }, ...this.$Basice.echart_title},
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            
                        type : 'shadow'       
                    }
                },
                legend: { 
                    ...{ data: this.lenged_data},
                    ...this.$Basice.legend
                },
                grid: this.grid? { ...this.$Basice.grid, ...this.grid } : this.$Basice.grid,
                xAxis:{
                    type : 'category',
                    inverse: true,
                    data: this.street_name_data,
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
                series : []
            };
            for(var i = 0; i < this.lenged_data.length; i++){
                var item = this.lenged_data[i];
                bar_option.series.push(
                    {
                        name: item,
                        type: 'bar',
                        stack: 'a',
                        barCategoryGap:5,
                        data: this.bar_comprehensive_data[item]
                    }
                )
            }
            barChart.setOption(bar_option, true);
            window.onresize = function(){
                barChart.resize();
            }
        }
    }
}

</script>
<style scoped>
</style>