<!-- 教育设施 -->
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
                    <img src="../../../../static/img/facilities/youeryuan.png" alt="">
                    &nbsp;幼儿园
                </a-col>
                <a-col :span="12">
                    <img src="../../../../static/img/facilities/xiaoxue.png" alt="">
                    &nbsp;小学
                </a-col>
                <a-col :span="12" class="mt_10">
                    <img src="../../../../static/img/facilities/zhongxue.png" alt="">
                    &nbsp;中学
                </a-col>
                <a-col :span="12" class="mt_10">
                    <img src="../../../../static/img/facilities/xuexiao.png" alt="">
                    &nbsp;九年一贯制
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
                title_1:"各街道教育设施覆盖率对比图",
                title_2:"各街道教育设施数量统计",
                street_name_data: [],
                radar_chart_indicator_data: [],
                lenged_data: ["幼儿园", "小学", "中学", "九年一贯制"],
                legend_selected:{
                    '幼儿园': true,
                    '小学': false,
                    '中学': false,
                    '九年一贯制': false,
                },
                pie_comprehensive_data: {
                    "幼儿园":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "小学":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "中学":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "九年一贯制":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                },
                bar_comprehensive_data: {
                    "幼儿园":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "小学":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "中学":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "九年一贯制":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                },
            },
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.get_education_facilities_coverage();
        this.get_education_layer();
    },
    methods: {
        get_education_layer(){//教育设施图层
            this.http.getLocalhostJson("/static/json/facilities/education.json", res =>{
                for(var i = 0; i < res.length; i++){
                    var item = res[i];
                    var marker = new AMap.Marker({
                            map: this.mainMapLayer,
                            icon: new AMap.Icon({
                                size: new AMap.Size(16, 16),
                                image: this.$Basice.icon_url + "/static/img/facilities/"+
                                    (item.properties.type === '幼儿园'?'youeryuan':
                                    (item.properties.type === '小学'?'xiaoxue':
                                    (item.properties.type === '中学'?'zhongxue':'xuexiao')))+".png",
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
        get_education_facilities_coverage(){//教育设施覆盖率
            this.http.get("Coverage/getCoverageByCategory", { category: "education" }, res =>{
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