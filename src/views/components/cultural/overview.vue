<!-- 文化资源评估 -- 概览 -->
<template>
    <div class="main_content">
        <div class="echarts_content animated fadeInRight">
            <div class="echarts_content_sub">
                <div id="cultural_resources_overview_bar_content" class="h_100"></div>
            </div>
        </div>
        <div class="map_legend">
             <a-row>
                <a-col :span="12">
                    <img src="../../../../static/img/cultural/simiao.png" alt="">
                    &nbsp;寺庙宫观
                </a-col>
                <a-col :span="12">
                    <img src="../../../../static/img/cultural/guju.png" alt="">
                    &nbsp;故居
                </a-col>
                <a-col :span="12" class="mt_10">
                    <img src="../../../../static/img/cultural/shiguan.png" alt="">
                    &nbsp;使馆
                </a-col>
                <a-col :span="12" class="mt_10">
                    <img src="../../../../static/img/cultural/wangfu.png" alt="">
                    &nbsp;王府
                </a-col>
                <a-col :span="12" class="mt_10">
                    <img src="../../../../static/img/cultural/guanshu.png" alt="">
                    &nbsp;官署
                </a-col>
                <a-col :span="12" class="mt_10">
                    <img src="../../../../static/img/cultural/gushumingmu.png" alt="">
                    &nbsp;古树名木
                </a-col>
                <a-col :span="12" class="mt_10">
                    <img src="../../../../static/img/cultural/wenhuayichan.png" alt="">
                    &nbsp;文化遗产
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
            markers:[],
            street_names: [],
            legend_data:["物质文化遗产", "历史建筑"],
            bar_chart_data: {
                "物质文化遗产": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                "历史建筑": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            }
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.get_statistics_chart_data();
        this.get_cultural_heritage_layer();
        this.get_historical_building_layer();
    },
    methods: {
        get_cultural_heritage_layer(){//文化遗产
            this.http.getLocalhostJson("/static/json/cultural/tangible_cultural_heritage.json", res =>{
                for(var i = 0; i < res.length; i++){
                    var item = res[i];
                    var marker = new AMap.Marker({
                            map: this.mainMapLayer,
                            icon: new AMap.Icon({
                                size: new AMap.Size(16, 16),
                                image: this.$Basice.icon_url + "/static/img/cultural/wenhuayichan.png",
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
        get_historical_building_layer(){//历史建筑
            this.http.getLocalhostJson("/static/json/cultural/historical_building.json", res =>{
                for(var i = 0; i < res.length; i++){
                    var item = res[i];
                    var marker = new AMap.Marker({
                            map: this.mainMapLayer,
                            icon: new AMap.Icon({
                                size: new AMap.Size(16, 16),
                                image: this.$Basice.icon_url + "/static/img/cultural/"+
                                    (item.type === '故居'?'guju':
                                    (item.type === '寺庙宫观'?'simiao':
                                    (item.type === '王府'?'wangfu':
                                    (item.type === '使馆'?'shiguan':
                                    (item.type === '官署'?'guanshu':
                                    (item.type === '古树名木'?'gushumingmu':
                                    'wenhuayichan'))))))+".png",
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
        get_statistics_chart_data(){//获取统计图表数据
            this.http.get("culture/getCoverage", {}, res =>{
                if(res.success){
                    var data  = JSON.parse(Decrypt(res.data.results.resultKey));
                    this.get_view_data(data);
                }
            })
        },
        get_view_data(result_data){//格式化数据
            for(var i = 0; i < result_data.length; i++){
                for(var key in result_data[i]){
                    this.street_names.push(key);
                    for(var item in result_data[i][key]){
                        result_data[i][key][item].length > 0?
                            ( item === "architecture" ? this.bar_chart_data["历史建筑"][i] = result_data[i][key][item][0].TOTAL : this.bar_chart_data["物质文化遗产"][i] = result_data[i][key][item][0].TOTAL):"";
                    }
                }
            }
            this.load_bar_chart();
        },
        load_bar_chart(){
            var cultural_resources_overview_bar_chart = echarts.init(document.getElementById("cultural_resources_overview_bar_content"));
            var bar_option = {
                color: this.$Basice.colors,
                title:{ ...{
                    text: "各街道物质文化遗产和历史建筑统计",
                }, ...this.$Basice.echart_title},
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    top:40,
                    right:100,
                    icon:"circle",
                    textStyle:{
                        color:"#222",
                    },
                    data: this.legend_data
                },
                grid: {
                    left: 80,
                    top:80,
                    right:50,
                    bottom:30,
                },
                xAxis: {
                    type: 'value',
                    axisLabel:  this.$Basice.coordinate_axis_style.axisLabel,
                    axisLine:  this.$Basice.coordinate_axis_style.axisLine,
                    splitLine:  this.$Basice.coordinate_axis_style.splitLine,
                    name: "数量",
                },
                yAxis: {
                    type: 'category',
                    axisLabel:  this.$Basice.coordinate_axis_style.axisLabel,
                    axisLine:  this.$Basice.coordinate_axis_style.axisLine,
                    splitLine:  this.$Basice.coordinate_axis_style.splitLine,
                    inverse: true,
                    data: this.street_names,
                },
                series: []
            };
            for(var i = 0; i < this.legend_data.length; i++){
                bar_option.series.push({
                    name: this.legend_data[i],
                    type: 'bar',
                    data: this.bar_chart_data[this.legend_data[i]],
                })
            }
            cultural_resources_overview_bar_chart.setOption(bar_option, true);
            window.onresize = function(){
                cultural_resources_overview_bar_chart.resize();
            }
        }
    },
    created() {},
}
</script>
<style lang='less' scoped>

</style>