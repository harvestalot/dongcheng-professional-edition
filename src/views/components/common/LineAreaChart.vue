<template>
   <div class="h_100">
        <div :id="this.lineChartOption.id" class="h_100"></div>
   </div>
</template>

<script>
export default {
    name: "LineAreaChart",
    props:{
        lineAreaChartOption:{
            type: Object,
            default: () => {}
        }
    },
    data(){
        return{
            lineChartOption : this.lineAreaChartOption,
            // line_area_chart_content_id: this.lineAreaChartOption.id || "",
            // title: this.lineAreaChartOption.title || "",
            // line_name: this.lineAreaChartOption.line_name || "",
            // xAxis_data: this.lineAreaChartOption.xAxis_data || [],
            // lenged_data: this.lineAreaChartOption.lenged_data || [],
            // line_series_data: this.lineAreaChartOption.line_series_data || [],
        }
    },
    watch:{
        "lineAreaChartOption.line_name"(value){
            if(value){
                this.lineAreaChartOption = this.$props.lineAreaChartOption;
                this.load_bar_stack_chart()
            console.log(this.lineAreaChartOption)
            }
        }
    },
    mounted(){
        this.load_bar_stack_chart();
    },
    methods:{
        load_bar_stack_chart(){//加载堆积柱状图表数据
            var lineChart = echarts.init(document.getElementById(this.lineChartOption.id));
            var line_option = {
                color: this.$Basice.colors,
                title:{ ...{
                    text: this.lineChartOption.title,
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
                grid: this.$Basice.grid,
                xAxis: {
                    type : 'category',
                    data: this.lineChartOption.xAxis_data,
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
                        name: this.lineChartOption.line_name,
                        type: 'line',
                        stack: 'a',
                        barCategoryGap:5,
                        data: this.lineChartOption.line_series_data
                    }
                ]
            };
            // for(var i = 0; i < this.lenged_data.length; i++){
            //     var item = this.lenged_data[i];
            //     bar_option.series.push(
            //     )
            // }
            lineChart.setOption(line_option, true);
            window.onresize = function(){
                lineChart.resize();
            }
        }
    }
}

</script>
<style scoped>
</style>