<!-- 主地图图层初始化 -->
<template>
    <div class='h_100 po_r'>
        <div id="main_map" class="w_100 h_100"></div>
        <slot :map="mapLayerOption"></slot>
        <tool :toolOption="toolOption" v-if="toolOption.isConfig"></tool>
        <div id="land_legend_content" class="land_legend_content" v-show="is_land_legend">
            <a-row>
                <a-col :span="12" class="land_legend">
                    <span></span>&nbsp;&nbsp;居住用地
                </a-col>
                <a-col :span="12" class="land_legend">
                    <span></span>&nbsp;&nbsp;工业用地
                </a-col>
                <a-col :span="24" class="mt_10 land_legend ">
                    <span></span>&nbsp;&nbsp;商业服务业设施用地
                </a-col>
                <a-col :span="24" class="mt_10 land_legend">
                    <span></span>&nbsp;&nbsp;公共管理与公共服务用地
                </a-col>
                <a-col :span="24" class="mt_10 land_legend">
                    <span></span>&nbsp;&nbsp;公用设施用地
                </a-col>
                <a-col :span="24" class="mt_10 land_legend">
                    <span></span>&nbsp;&nbsp;物流仓储用地
                </a-col>
                <a-col :span="24" class="mt_10 land_legend">
                    <span></span>&nbsp;&nbsp;未知用地
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import Tool from "./tool"
export default {
    name:"MainMap",
    components: {
        Tool
    },
    data() {
        return {
            is_land_legend:false,
            mapLayerOption:{
                base:"",
                streetArea:"",
                streetBoundary:"",
                streetName:"",
                streetRoad:"",
                streetLand:"",
            },
            viewLayerOption:{//页面图层
                heat:"",
                timelineHeat:"",
                Icon:"",
                polygon:"",
                pointCloud:"",
                traffic:"",
            },
            toolOption:{
                isConfig:true,
                tool_checked:["street"],
                change: this.onChangeMapTool
            },
        };
    },
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {
        this.init_map();
    },
    methods:{
        init_map(){ //初始化地图
            this.mapLayerOption.base = new AMap.Map("main_map", {
                mapStyle: 'amap://styles/4ab81766c3532896d5b265289c82cbc6',
                resizeEnable:true,
                center: [116.412255,39.908886],
                zoom: 12,
                // zooms: [12, 13]
            });
            this.init_layer();
        },
        init_layer(){
            this.mapLayerOption.streetArea = new Loca.PolygonLayer({//社区街道边界图层
                map: this.mapLayerOption.base,
                eventSupport:true,
            });
            this.mapLayerOption.streetBoundary = new Loca.LineLayer({//社区街道边界图层
                map: this.mapLayerOption.base,
            });
            this.mapLayerOption.streetName = new Loca.LabelsLayer({//社区街道名字图层
                map: this.mapLayerOption.base,
                zIndex: 10,
            });
            this.mapLayerOption.streetRoad = new Loca.LineLayer({//社区街道路网图层
                map: this.mapLayerOption.base,
            });
            this.mapLayerOption.streetLand = new Loca.PolygonLayer({//社区街道x现状用地图层
                map: this.mapLayerOption.base,
                // zIndex: 15,
            });
            this.viewLayerOption.heat = new Loca.HeatmapLayer({//热力图层
                map: this.mapLayerOption.base,
                // zIndex: 15,
            });
            this.viewLayerOption.timelineHeat = new Loca.HeatmapLayer({//时间轴热力图层
                map: this.mapLayerOption.base,
                // zIndex: 15,
            });
            this.viewLayerOption.polygon = new Loca.PolygonLayer({//平面图层
                map: this.mapLayerOption.base,
                eventSupport:true,
                zIndex: 100,
            });
            this.viewLayerOption.Icon = new Loca.IconLayer({
                map: this.mapLayerOption.base
            });
            this.viewLayerOption.pointCloud = new Loca.PointCloudLayer({
                map: this.mapLayerOption.base,
                // fitView: false
            });
            this.viewLayerOption.traffic = new AMap.TileLayer.Traffic({
                autoRefresh:true,
                interval:3600,
            });
            this.get_street_boundary_layer();
            this.get_street_name_layer();
            this.get_street_area_layer();
        },
        get_street_land_layer(){//社区现状用地图层
            var colors = ["#A900E6", "#FF0000", "#0084A8", "#FFFF00", "#730000", "#9C9C9C","#FFAA00"];
            this.http.getLocalhostJson("/static/json/present_land.json", res =>{
                this.mapLayerOption.streetLand.setData(res, {lnglat: 'lnglat'});
                this.mapLayerOption.streetLand.setOptions({
                    style: {
                        // opacity: 0.5,
                        color: function (item) {
                            var land_name = item.value.type;
                            var color = colors[0];
                            switch (land_name){
                                case "商业服务业设施用地" :
                                    color = colors[1];
                                    break;
                                case "居住用地" :
                                    color = colors[2];
                                    break;
                                case "工业用地" :
                                    color = colors[3];
                                    break;
                                case "公共管理与公共服务用地" :
                                    color = colors[4];
                                    break;
                                case "公用设施用地" :
                                    color = colors[5];
                                    break;
                                case "物流仓储用地" :
                                    color = colors[6];
                                    break;
                                default:
                                    color = colors[0];
                            }
                            return color;
                        },
                        height: function () {
                            return Math.random() * 500 + 100;
                        }
                    }
                });
                this.mapLayerOption.streetLand.render();
                this.mapLayerOption.streetLand.show();
            })
        },
        get_street_boundary_layer(){//社区街道边界图层
            this.http.getLocalhostJson("/static/json/street_boundary_data.json", res =>{
                this.mapLayerOption.streetBoundary.setData(res, {lnglat: 'lnglat'});
                this.mapLayerOption.streetBoundary.setOptions({
                    style: {
                        borderWidth: 2,
                        opacity: 1,
                        color:"#d66349",
                    },
                });
                this.mapLayerOption.streetBoundary.render();
                this.mapLayerOption.streetBoundary.show();
            })
        },
        get_street_name_layer(){//社区名字文字图层
            this.http.getLocalhostJson("/static/json/street_name_data.json", res =>{
                //添加文字标记图层
                this.mapLayerOption.streetName.setData(res, {
                    lnglat: 'lnglat'
                }).setOptions({
                    style: {
                        direction: 'center',
                        offset: [0, 0],
                        text: function (item) {
                            return item.value.name;
                        },
                        fillColor: "#F319A0",
                        fontSize: 15,
                        strokeWidth: 0
                    }
                }).render();
                // this.mapLayerOption.streetName.setzIndex(100);
                this.mapLayerOption.streetName.show();
            })
        },
        get_street_area_layer(){//社区街道面图层
            this.http.getLocalhostJson("/static/json/street_boundary_data.json", res =>{
                this.mapLayerOption.streetArea.setMap(this.mapLayerOption.base);
                this.mapLayerOption.streetArea.setData(res, {lnglat: 'lnglat'});
                this.mapLayerOption.streetArea.setOptions({
                    style: {
                        opacity: 0.1,
                        color:"#85ccc8",
                    },
                });
                this.mapLayerOption.streetArea.render();
                this.mapLayerOption.streetArea.show();
                const _this = this;
                _this.mapLayerOption.streetArea.on("click", function(ev){
                    var properties = ev.rawData.properties;
                    _this.load_info_window(properties, properties.lnglat);
                })
            })
        },
        get_street_road_layer(){//社区路网图层
            this.http.getLocalhostJson("/static/json/road.json", res =>{
                this.mapLayerOption.streetRoad.setData(res, {lnglat: 'lnglat'});
                this.mapLayerOption.streetRoad.setOptions({
                    style: {
                        // height: function () {
                        //     return Math.random() * 20000;
                        // },
                        opacity: 1,
                        color:"#F8F735",
                    },
                });
                this.mapLayerOption.streetRoad.render();
                this.mapLayerOption.streetRoad.show();
            })
        },
        onChangeMapTool(checkedValues){//切换地图工具
            this.toolOption.isRouterAlive = false;
            this.$nextTick( () => {
                this.toolOption.isRouterAlive = true;
                this.toolOption.tool_checked = checkedValues;
                this.viewMapToolLayer();
            })
        },
        viewMapToolLayer(){
            if(this.toolOption.tool_checked.indexOf("street") > -1){
                this.get_street_area_layer();
                this.get_street_boundary_layer();
                this.get_street_name_layer();
            }else{
                this.mapLayerOption.streetArea.setMap(null);
                this.mapLayerOption.streetBoundary.hide();
                this.mapLayerOption.streetName.hide();
            }
            if(this.toolOption.tool_checked.indexOf("land") > -1){
                this.get_street_land_layer();
                this.is_land_legend = true;
            }else{
                this.mapLayerOption.streetLand.hide();
                this.is_land_legend = false;
            }
            
            // this.toolOption.tool_checked.indexOf("land") > -1? this.get_street_land_layer(): this.mapLayerOption.streetLand.hide();
            // this.toolOption.tool_checked.indexOf("street") > -1? : 
            this.toolOption.tool_checked.indexOf("road") > -1? this.get_street_road_layer(): this.mapLayerOption.streetRoad.hide();
        },
        load_info_window(properties, center){
            var info = [];
            info.push('<div class="info_window">名称：'+properties.name+'</div>');
            var infoWindow = new AMap.InfoWindow({
                content: info.join(""),  //使用默认信息窗体框样式，显示信息内容
            });
            infoWindow.open(this.mapLayerOption.base, center);
        },
    }
}
</script>
<style lang='less' scoped>
    // .map_content{
    //     width: 100%;
    //     height: 100%;
    //     left: 0;
    //     top: 0;
    // }
</style>