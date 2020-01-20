<!-- 便民设施 -->
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
                    <img src="../../../../static/img/facilities/caishichang.png" alt="">
                    &nbsp;菜市场
                </a-col>
                <a-col :span="12">
                    <img src="../../../../static/img/facilities/chaoshi.png" alt="">
                    &nbsp;超市便利店
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
                title_1:"各街道便民设施覆盖率对比图",
                title_2:"各街道便民设施数量统计",
                street_name_data: [],
                radar_chart_indicator_data: [],
                lenged_data: ["超市", "菜站"],
                legend_selected:{
                    '超市': true,
                    '菜站': false,
                },
                pie_comprehensive_data: {
                    "超市":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "菜站":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                },
                bar_comprehensive_data: {
                    "超市":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "菜站":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                },
            },
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.get_convenience_people_facilities_coverage();
        this.get_convenience_people_layer();
    },
    methods: {
        get_convenience_people_layer(){
            this.http.getLocalhostJson("/static/json/facilities/convenience_people.json", res =>{
                for(var i = 0; i < res.length; i++){
                    var item = res[i];
                    var marker = new AMap.Marker({
                            map: this.mainMapLayer,
                            icon: new AMap.Icon({
                                size: new AMap.Size(16, 16),
                                image: this.$Basice.icon_url + "/static/img/facilities/"+
                                    (item.properties.type === '菜市场'?'caishichang':'chaoshi')+".png",
                                imageOffset: new AMap.Pixel(0, 0),
                                imageSize: new AMap.Size(-8, -8)
                            }),
                            position: item.lnglat[0],
                            offset: new AMap.Pixel(-10, -10),
                            extData:item.properties
                        });
                        this.markers.push(marker);
                }
            })
        },
        get_convenience_people_facilities_coverage(){//便民设施覆盖率
            this.http.get("Coverage/getCoverageByCategory", { category: "convenient" }, res =>{
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
    created() {},
}
</script>
<style lang='less' scoped>

</style>