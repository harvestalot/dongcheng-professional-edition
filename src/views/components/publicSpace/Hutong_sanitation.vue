<!-- 胡同环卫 -->
<template>
    <div class="main_content">
        <div class="echarts_content animated fadeInRight">
            <div class="echarts_content_sub Hutong_echarts_content_sub">
                <div id="reproducible_bar_chart_content" class="h_100"></div>
            </div>
            <div class="source_content">2018年，启动354座公厕改造升级，完成235座。2019年，继续开展”厕所革命“，完成227座公厕改造提升。</div>
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
                {"name":"安定门街道","value":"0"},
                {"name":"北新桥街道","value":"0"},
                {"name":"朝阳门街道","value":"1"},
                {"name":"崇文门外街道","value":"1"},
                {"name":"东花市街道","value":"0"},
                {"name":"东华门街道","value":"1"},
                {"name":"东四街道","value":"0"},
                {"name":"东直门街道","value":"0"},
                {"name":"和平里街道","value":"0"},
                {"name":"建国门街道","value":"8"},
                {"name":"交道口街道","value":"1"},
                {"name":"景山街道","value":"2"},
                {"name":"龙潭街道","value":"0"},
                {"name":"前门街道","value":"1"},
                {"name":"体育馆街道","value":"0"},
                {"name":"天坛街道","value":"0"},
                {"name":"永定门街道","value":"0"}
            ],
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.mainMapLayer.setStatus({zoomEnable :  true});
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
                    var data  = JSON.parse(Decrypt(res.data.results.coverageKey));
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
    .source_content{
        margin-top: 20px;
    }
</style>