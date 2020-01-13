<!-- 产业聚集度 -->
<template>
    <div class="main_content">
        <div class="layer_content">
            <a-select style="width: 200px" defaultValue="餐饮服务" placeholder="请选择服务类型" allowClear @change="onChangeLayer">
                <a-select-option v-for="(value, index) in all_poi_type" :value="value" :key="index">{{ value }}</a-select-option>
            </a-select>
        </div>
        <div class="echarts_content">
            <div class="echarts_content_sub">
                
            </div>
        </div>
        <!-- POI点列表 -->
        <div id="pio_point_list" class="pio_point_list"></div>
    </div>
</template>

<script>

export default {
    components: {},
    data() {
        return {
            mainMapLayer: this.$parent.mapLayerOption.base,
	        all_poi_type: ["餐饮服务", "购物服务", "生活服务", "体育休闲服务",
		        "商务住宅", "科教文化服务", "交通设施服务", "金融保险服务", "公共设施"],
	        current_pio_type: "餐饮服务",
        };
    },
    computed: {},
    watch: {},
    mounted() {
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
        }
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