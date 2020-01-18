<!-- 胡同环卫 -->
<template>
    <div class="main_content">
        <div class="echarts_content">
            <div class="echarts_content_sub">
                <div id="reproducible_bar_chart_content" class="h_100"></div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    components: {},
    data() {
        return {
            mainMapLayer: this.$parent.mapLayerOption.base,
            markers:[],
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
        this.get_Hutong_sanitation_data();
        this.get_Hutong_sanitation_layer();
    },
    methods: {
        get_Hutong_sanitation_layer(){//文化遗产
            this.http.getLocalhostJson("/static/json/publicSpace/Hutong_sanitation.json", res =>{
                for(var i = 0; i < res.length; i++){
                    var item = res[i];
                    var marker = new AMap.Marker({
                            map: this.mainMapLayer,
                            icon: new AMap.Icon({
                                size: new AMap.Size(16, 16),
                                image: this.$Basice.icon_url + "/static/img/publicSpace/huishou.png",
                                imageOffset: new AMap.Pixel(0, 0),
                                imageSize: new AMap.Size(-8, -8)
                            }),
                            position: item.lnglat,
                            offset: new AMap.Pixel(-10, -10),
                            extData:item.properties
                        });
                        this.markers.push(marker);
                }
            })
        },
        get_Hutong_sanitation_data(){//各街道再生资源回收站数据
            this.http.get("Coverage/getCoverageByCategory", { category: "convenient" }, res =>{
                if(res.success){
                    var data  = JSON.parse(Decrypt(res.data.results.resultKey));
                    this.load_reproducible_bar_chart();
                }
            })
        },
        load_reproducible_bar_chart(){//各街道再生资源回收站数量统计
            var bar_chart = echarts.init(document.getElementById("reproducible_bar_chart_content"));
            var seriesLabel = {
                normal: {
                    show: true,
                    textBorderColor: '#333',
                    textBorderWidth: 2
                }
            }
            var bar_option = {
                color: this.$Basice.colors,
                title: { ...{
                    text:"各街道再生资源回收站数量统计",
                }, ...this.$Basice.echart_title},
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    containLabel:false,
                    left: 50,
                    top: 40,
                    right:30,
                    bottom:40,
                },
                xAxis: {
                    type: 'value',
                    name: '个',
                    axisLabel: this.$Basice.coordinate_axis_style.axisLabel,
                    axisLine: this.$Basice.coordinate_axis_style.axisLine,
                    splitLine: this.$Basice.coordinate_axis_style.splitLine,
                },
                yAxis: {
                    type: 'category',
                    axisLabel: this.$Basice.coordinate_axis_style.axisLabel,
                    axisLine: this.$Basice.coordinate_axis_style.axisLine,
                    splitLine: this.$Basice.coordinate_axis_style.splitLine,
                    inverse: true,
                    data: [],
                },
                series: {
                    name: "可再生资源",
                    type: 'bar',
                    itemStyle: {
                        barBorderRadius: 10,
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: 'rgba(0,222,215,0.2)'
                            },
                            {
                                offset: 1,
                                color: '#FFFC00'
                            }
                        ])
                    },
                    barWidth: 10,
                    data: []
                }
            };
            for(var i = 0; i < this.chart_data.length; i++){
                var item = this.chart_data[i];
                bar_option.yAxis.data.push(item.name.replace("街道",""));
                bar_option.series.data.push(item.value);
            }
            bar_chart.setOption(bar_option, true);
            window.onresize = function(){
                bar_chart.resize();
            }
        },
    },
    created() {},
}
</script>
<style lang='less' scoped>

</style>