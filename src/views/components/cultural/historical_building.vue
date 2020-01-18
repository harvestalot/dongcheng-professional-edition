<!-- 历史建筑 -->
<template>
    <div class="main_content">
        <div class="echarts_content">
            <div class="echarts_content_sub">
                <div class="chart_content_box">
                    <radar-chart v-if="chartOption.isSuccess" :radarChartOption="chartOption"></radar-chart>
                </div>
                <div class="chart_content_box">
                    <bar-stack-chart v-if="chartOption.isSuccess" :barStackChartOption="chartOption"></bar-stack-chart>
                </div>
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
            </a-row>
        </div>
    </div>
</template>

<script>

import RadarChart from "../common/RadarChart";
import BarStackChart from "../common/BarStackChart";
export default {
    components: {
        RadarChart,
        BarStackChart,
    },
    data() {
        return {
            mainMapLayer: this.$parent.mapLayerOption.base,
            markers:[],
            chartOption:{
                isSuccess:false,
                title_1:"各街道历史建筑数量占比图",
                title_2:"各街道历史建筑数量统计",
                street_name_data: [],
                radar_chart_indicator_data: [],
                lenged_data: ["寺庙宫观", "故居", "使馆", "王府", "官署", "古树名木"],
                legend_selected:{
                    '寺庙宫观': true,
                    '故居': false,
                    '使馆': false,
                    '王府': false,
                    '官署': false,
                    '古树名木': false,
                },
                pie_comprehensive_data: {
                    "寺庙宫观":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "故居":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "使馆":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "王府":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "官署":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "古树名木":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                },
                bar_comprehensive_data: {
                    "寺庙宫观":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "故居":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "使馆":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "王府":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "官署":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "古树名木":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                },
            },
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.get_historical_building_layer();
        this.get_historical_building_coverage();
    },
    methods: {
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
                                    (item.type === '官署'?'guanshu':'gushumingmu')))))+".png",
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
        get_historical_building_coverage(){//历史建筑覆盖率
            this.http.get("architecture/getCoverage", {}, res =>{
                if(res.success){
                    var data  = JSON.parse(Decrypt(res.data.results.resultKey));
                    this.get_view_data(data);
                }
            })
        },
        get_view_data(result_data){
            for(var i = 0; i < result_data.length; i++){
                for(var key in result_data[i]){
                    this.chartOption.street_name_data.push(key.replace("街道",""));
                    this.chartOption.radar_chart_indicator_data.push({
                        name: key.replace("街道",""),
                        max:20,
                        color:'#222',
                        rotate:90
                    })
                    if(result_data[i][key].length > 0){
                        for(var j = 0; j < result_data[i][key].length; j++){
                            this.chartOption.pie_comprehensive_data[result_data[i][key][j].TYPE][i] = result_data[i][key][j].TOTAL;
                            this.chartOption.bar_comprehensive_data[result_data[i][key][j].TYPE][i] = result_data[i][key][j].TOTAL;
                        }
                    }
                }
                this.chartOption.isSuccess = true;
            }
        },
    },
    created() {},
}
</script>
<style lang='less' scoped>

</style>