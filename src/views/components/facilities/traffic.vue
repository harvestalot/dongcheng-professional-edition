<!-- 交通设置 -->
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
                    <img src="../../../../static/img/facilities/ditie.png" alt="">
                    &nbsp;地铁站
                </a-col>
                <a-col :span="12">
                    <img src="../../../../static/img/facilities/gongjiao.png" alt="">
                    &nbsp;公交站
                </a-col>
            </a-row>
            <!-- <icon-font type="icon-ditie" :style="{ fontSize: '32px', color: '#f0993c' }"/>
            <icon-font type="icon-gongjiao" :style="{ fontSize: '32px', color: '#d66349' }"/> -->
        </div>
    </div>
</template>

<script> 
// import { Icon } from 'ant-design-vue';
// const IconFont = Icon.createFromIconfontCN({
//   scriptUrl: '//at.alicdn.com/t/font_1587980_ga2oc0n6fsm.js',
// });
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
                title_1:"各街道交通设施覆盖率对比图",
                title_2:"各街道交通设施数量统计",
                street_name_data: [],
                radar_chart_indicator_data: [],
                lenged_data: ["公交站", "地铁站"],
                legend_selected:{
                    '公交站': true,
                    '地铁站': false,
                },
                pie_comprehensive_data: {
                    "公交站":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "地铁站":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                },
                bar_comprehensive_data: {
                    "公交站":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "地铁站":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                },
            },
        };
    },
    computed: {},
    watch: {},
    created() {
        this.get_traffic_layer();
        this.get_traffic_facilities_coverage();
    },
    methods: {
        get_traffic_layer(){
            this.http.getLocalhostJson("/static/json/facilities/traffic.json", res =>{
                for(var i = 0; i < res.length; i++){
                    var item = res[i];
                    var marker = new AMap.Marker({
                            map: this.mainMapLayer,
                            icon: new AMap.Icon({
                                size: new AMap.Size(16, 16),
                                image: this.$Basice.icon_url + "/static/img/facilities/"+(item.properties.type === '地铁站'?'ditie':'gongjiao')+".png",
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
        get_traffic_facilities_coverage(){//文体设施覆盖率
            this.http.get("Coverage/getCoverageByCategory", { category: "transport" }, res =>{
                if(res.success){
                    var data  = JSON.parse(Decrypt(res.data.results.coverageKey));
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
                        max:100,
                        color:'#222',
                        rotate:90
                    })
                    if(result_data[i][key].length > 0){
                        for(var j = 0; j < result_data[i][key].length; j++){
                            this.chartOption.pie_comprehensive_data[result_data[i][key][j].CATEGORY_NAME][i] = result_data[i][key][j].COVERAGE.toFixed(2);
                            this.chartOption.bar_comprehensive_data[result_data[i][key][j].CATEGORY_NAME][i] = result_data[i][key][j].QUANTITY;
                        }
                    }
                }
                this.chartOption.isSuccess = true;
            }
        },
    },
    mounted() {},
}
</script>
<style lang='less' scoped>

</style>