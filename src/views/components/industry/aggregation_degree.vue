<!-- 产业聚集度 -->
<template>
    <div class="main_content">
        <div class="layer_content">
            <a-select style="width: 200px" defaultValue="餐饮服务" placeholder="请选择服务类型" allowClear @change="onChangeLayer">
                <a-select-option v-for="(value, index) in all_poi_type" :value="value" :key="index">{{ value }}</a-select-option>
            </a-select>
        </div>
        <div class="echarts_content animated fadeInRight">
            <div class="echarts_content_sub">
                <div class="chart_content_box">
                    <radar-chart v-if="chartOption.isSuccess" :radarChartOption="chartOption"></radar-chart>
                </div>
            </div>
        </div>
        <!-- POI点列表 -->
        <div id="pio_point_list" class="pio_point_list"></div>
    </div>
</template>

<script>

import RadarChart from "../common/RadarChart";
export default {
    components: {
        RadarChart,
    },
    data() {
        return {
            mainMapLayer: this.$parent.mapLayerOption.base,
	        all_poi_type: ["餐饮服务", "购物服务", "生活服务", "体育休闲服务",
		        "商务住宅", "科教文化服务", "交通设施服务", "金融保险服务", "公共设施"],
	        current_pio_type: "餐饮服务",
            chartOption:{
                isSuccess:false,
                title_1:"各街道各类个数统计",
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
            },
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.get_aggregation_degree_statistics();
        this.get_dongcheng_polygon_layer();
    },
    methods: {
        onChangeLayer(value){//改变图层
            this.current_pio_type = value? value: "餐饮服务";
            this.get_dongcheng_polygon_layer();
        },
        get_dongcheng_polygon_layer(){//东城范围边界
            this.http.getLocalhostJson("/static/json/dongcheng_boundary_data.json", res =>{
                var _this = this;
                var placeSearch = new AMap.PlaceSearch({});
                AMap.service(["AMap.PlaceSearch"], function() {
                    var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
                        pageSize: 5, // 单页显示结果条数
                        pageIndex: 1, // 页码
                        city: "010", // 兴趣点城市
                        citylimit: true,  //是否强制限制在设置的城市内搜索
                        map: _this.mainMapLayer, // 展现结果的地图实例
                        panel: "pio_point_list", // 结果列表将在此容器中进行展示。
                        autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                    });
                    var polygon = new AMap.Polygon({
                        path: res[0].lnglat,//设置多边形边界路径
                        // strokeColor: "#FF33FF", //线颜色
                        // strokeOpacity: 0.2, //线透明度
                        // strokeWeight: 3,    //线宽
                        // fillColor: "#1791fc", //填充色
                        // fillOpacity: 0.35//填充透明度
                    });
                    placeSearch.searchInBounds(_this.current_pio_type, polygon, function (status, result){
                        // console.log(result)
                    })
                })
            })
        },
        get_aggregation_degree_statistics(){//各街道产业数量统计
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
    .pio_point_list{
        position:absolute;
        left: -298%;
        bottom: 5px;
        box-shadow: 0px 0px 8px 0px rgba(188, 142, 94, 1);
    }
</style>