<!-- 历史建筑 -->
<template>
    <div class="main_content">
        <div class="echarts_content animated fadeInRight">
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
                    <img src="../../../../static/img/cultural/jiaotang.png" alt="">
                    &nbsp;教堂
                </a-col>
                <a-col :span="12" class="mt_10">
                    <img src="../../../../static/img/cultural/qingzhensi.png" alt="">
                    &nbsp;清真寺
                </a-col>
                <a-col :span="12" class="mt_10">
                    <img src="../../../../static/img/cultural/guju.png" alt="">
                    &nbsp;故居
                </a-col>
                <a-col :span="12" class="mt_10">
                    <img src="../../../../static/img/cultural/paifang.png" alt="">
                    &nbsp;牌楼
                </a-col>
                <a-col :span="12" class="mt_10">
                    <img src="../../../../static/img/cultural/citang.png" alt="">
                    &nbsp;祠堂
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
                    <img src="../../../../static/img/cultural/huiguan.png" alt="">
                    &nbsp;会馆
                </a-col>
                <a-col :span="12" class="mt_10">
                    <img src="../../../../static/img/cultural/gushumingmu.png" alt="">
                    &nbsp;古树名木
                </a-col>
                <a-col :span="12" class="mt_10">
                    <img src="../../../../static/img/cultural/yuanlin.png" alt="">
                    &nbsp;园林
                </a-col>
                <a-col :span="12" class="mt_10">
                    <img src="../../../../static/img/cultural/weizhi.png" alt="">
                    &nbsp;未注明
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
                grid:{top: 150},
                radar_radius:"40%",
                street_name_data: [],
                radar_chart_indicator_data: [],
                lenged_data: ["寺庙宫观", "清真寺", "教堂", "故居", "祠堂", "牌楼", "使馆", "王府", "官署", "会馆", "古树名木", "园林", "未注明"],
                legend_selected:{
                    '寺庙宫观': true,
                    '清真寺': false,
                    '教堂': false,
                    '故居': false,
                    '祠堂': false,
                    '牌楼': false,
                    '使馆': false,
                    '王府': false,
                    '官署': false,
                    '会馆': false,
                    '古树名木': false,
                    '园林': false,
                    '未注明': false,
                },
                pie_comprehensive_data: {
                    "寺庙宫观":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "清真寺":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "教堂":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "故居":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "祠堂":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "牌楼":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "使馆":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "王府":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "官署":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "会馆":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "古树名木":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "园林":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "未注明":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                },
                bar_comprehensive_data: {
                    "寺庙宫观":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "清真寺":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "教堂":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "故居":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "祠堂":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "牌楼":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "使馆":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "王府":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "官署":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "会馆":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "古树名木":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "园林":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "未注明":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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
                                    (item.type === '教堂'?'jiaotang':
                                    (item.type === '清真寺'?'qingzhensi':
                                    (item.type === '祠堂'?'citang':
                                    (item.type === '牌楼'?'paifang':
                                    (item.type === '会馆'?'huiguan':
                                    (item.type === '园林'?'yuanlin':
                                    (item.type === '未注明'?'weizhi':
                                    (item.type === '官署'?'guanshu':'gushumingmu'))))))))))))+".png",
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
                    var data  = JSON.parse(Decrypt(res.data.results.key));
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
                        max:70,
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