<template>
   <div class="h_100 po_r">
       <div class="w_100 h_100" id="accessibility_map"></div>
       <div class="search_criteria">
           <a-form >
                <a-form-item label="医疗" :label-col="form_item_col.label_col" :wrapper-col="form_item_col.wrapper_col">
                    <a-checkbox-group :options="medical_data" v-model="search_criteria_params.medical">
                        <span style="color: red" slot="label" slot-scope="{value}">{{value}}</span>
                    </a-checkbox-group>
                </a-form-item>
                <a-form-item label="教育" :label-col="form_item_col.label_col" :wrapper-col="form_item_col.wrapper_col">
                    <a-checkbox-group :options="education_data" v-model="search_criteria_params.education">
                        <span style="color: red" slot="label" slot-scope="{value}">{{value}}</span>
                    </a-checkbox-group>
                </a-form-item>
                <a-form-item label="交通" :label-col="form_item_col.label_col" :wrapper-col="form_item_col.wrapper_col">
                    <a-checkbox-group :options="traffic_data" v-model="search_criteria_params.traffic">
                        <span style="color: red" slot="label" slot-scope="{value}">{{value}}</span>
                    </a-checkbox-group>
                </a-form-item>
                <a-form-item label="便民" :label-col="form_item_col.label_col" :wrapper-col="form_item_col.wrapper_col">
                    <a-checkbox-group :options="handy_service_data" v-model="search_criteria_params.handy_service">
                        <span style="color: red" slot="label" slot-scope="{value}">{{value}}</span>
                    </a-checkbox-group>
                </a-form-item>
                <a-form-item label="安全" :label-col="form_item_col.label_col" :wrapper-col="form_item_col.wrapper_col">
                    <a-checkbox-group :options="safety_data" v-model="search_criteria_params.safety">
                        <span style="color: red" slot="label" slot-scope="{value}">{{value}}</span>
                    </a-checkbox-group>
                </a-form-item>
                <a-form-item label="东西城区" :label-col="form_item_col.label_col" :wrapper-col="form_item_col.wrapper_col">
                    <a-checkbox-group :options="cultural_resources_data" v-model="search_criteria_params.cultural_resources">
                        <span style="color: red" slot="label" slot-scope="{value}">{{value}}</span>
                    </a-checkbox-group>
                </a-form-item>
                <a-form-item label="出行时间" :label-col="form_item_col.label_col" :wrapper-col="form_item_col.wrapper_col">
                    <a-radio-group :options="travel_time_data" v-model="search_criteria_params.travel_time">
                        <span slot="label" slot-scope="{value}">{{value}}</span>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="出行方式" :label-col="form_item_col.label_col" :wrapper-col="form_item_col.wrapper_col">
                    <a-radio-group :options="trip_mode_data" v-model="trip_mode_data[0]">
                        <span slot="label" slot-scope="{value}">{{value}}</span>
                    </a-radio-group>
                </a-form-item>
                <a-form-item :wrapper-col="{ span: form_item_col.wrapper_col.span, offset: (24 - form_item_col.wrapper_col.span) }">
                    <a-button type="primary" @click="handleSubmit">确定</a-button>
                    <a-button :style="{ marginLeft: '20px' }" @click="handleReset">重置</a-button>
                    <a-button type="primary" :style="{ marginLeft: '20px' }"><router-link :to="{ name: 'Home' }">返回</router-link></a-button>
                </a-form-item>
            </a-form>
       </div>
   </div>
</template>

<script>
export default {
    data(){
        return{
            main_map_layer:"",
            reachabilityLayer:"",
            form_item_col:{
                label_col: { span: 6},
                wrapper_col: { span: 18},
            },
            medical_data:["大型医院", "医院", "诊所"],
            education_data:["幼儿园", "小学", "中学"],
            traffic_data:["地铁站", "公交站", "停车场"],
            handy_service_data:["超市", "商场", "便利店"],
            safety_data:["公园", "广场", "消防站"],
            cultural_resources_data:["文化资源"],
            travel_time_data:[
                {label: '10分钟', value: '10'},
                {label: '15分钟', value: '15'},
            ],
            trip_mode_data:["步行"],
            search_criteria_params:{
                medical:[],
                education:[],
                traffic:[],
                handy_service:[],
                safety:[],
                cultural_resources:[],
                travel_time:"10",
            },
            current_search_criteria_str:"",//搜索条件
            centerpoint:"",
            reachability_data:[],//可达性范围数据
            area_cultural_resources_point_data:[],
        }
    },
    mounted(){
        this.init_map();
    },
    methods:{
        init_map(){ //初始化地图
            var _this = this;
            this.main_map_layer = new AMap.Map("accessibility_map", {
                mapStyle: 'amap://styles/4ab81766c3532896d5b265289c82cbc6',
                resizeEnable:true,
                center: [116.412255,39.908886],
                zoom: 12,
            });
            this.reachabilityLayer = new Loca.PolygonLayer({
                map: this.main_map_layer,
                zIndex: 1,
                fitView: true,
                eventSupport:false,
            });
            //点击地图区域
            this.main_map_layer.on('click', function(event){
                _this.reset_layer_data();
                _this.centerpoint = event.lnglat.lng + "," + event.lnglat.lat;
                _this.accessibility_initialize();
            });
        },
        reset_layer_data(){//重置图层、数据
            this.main_map_layer.clearMap();//重置地图
			this.reachabilityLayer? this.reachabilityLayer.hide():"";//清除文化资源点图层
            this.reachability_data = [];
            this.area_cultural_resources_point_data = [];//可达性区域内的文化资源点
        },
        accessibility_initialize(){//初始化
			this.reset_layer_data();
			var marker = new AMap.Marker({
			    position: new AMap.LngLat(this.centerpoint.split(",")[0], this.centerpoint.split(",")[1]),
			    offset: new AMap.Pixel(0, 0),
			    icon: '//vdata.amap.com/icons/b18/1/2.png', // 添加 Icon 图标 URL
			});
			this.main_map_layer.add(marker);
			this.accessibility_range();
        },
        accessibility_range(){//获取可达性范围
            var _this = this;
            this.http.getLocalhostJson(this.$Basice.reachability_url+"?centerpoint="+this.centerpoint+
                "&time="+this.search_criteria_params.travel_time, res =>{
                if(res.info === "ok"){
                    var reachability_data = [];
                    for(var i = 0; i < res.result.split(";").length; i++){
                        var item = res.result.split(";")[i];
                        reachability_data.push([item.split(",")[0],item.split(",")[1]])
                    };
                    _this.reachability_data = reachability_data;
                    _this.load_reachability_layer();
                    if(_this.current_search_criteria_str.length > 0){
                        _this.get_accessibility_POI();
                    }
                    if(_this.search_criteria_params.cultural_resources.length > 0){
                        _this.accessibility_resources();//获取文化资源点
                    }
                }else{
                    this.$message.info('获取可达性范围失败，请重新获取。');
                }
            })
        },
        get_accessibility_POI(){//根据条件筛选类型获取范围内的POI点
            var _this = this;
            var placeSearch = new AMap.PlaceSearch({});
            AMap.service(["AMap.PlaceSearch"], function() {
                var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
                    pageSize: 50, // 单页显示结果条数
                    pageIndex: 1, // 页码
                    map: _this.main_map_layer, // 展现结果的地图实例
                    autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                });
                var polygon = new AMap.Polygon({
                    path: _this.reachability_data,//设置多边形边界路径
                });
                placeSearch.searchInBounds(_this.current_search_criteria_str, polygon, function (status, result){
                })
            })
        },
        accessibility_resources(){//如类型选择文化资源，则判断文化资源点是否在可达性范围之内
            this.http.getLocalhostJson("../../static/json/cultural/cultural_resources.json", res =>{
                // var data = JSON.parse(Decrypt(cultural_resources_point_data));
                for(var i = 0; i < res.length; i++){
                    var items = res[i];
                    var isPointInRing = AMap.GeometryUtil.isPointInRing(items.lnglat, this.reachability_data);
                    isPointInRing? this.area_cultural_resources_point_data.push({ ...items, ...{
                        icon: "../../static/img/cultural/wenhuayichan_4.png",
                    }}): "";
                }
                console.log(this.area_cultural_resources_point_data)
                this.render_point_layer();
            })
        },
        render_point_layer(){//渲染可达性区域内的符合条件的点图层
            var _this = this;
            _this.area_cultural_resources_point_data.forEach(function(marker) {
                var marker = new AMap.Marker({
                    map: _this.main_map_layer,
                    icon: new AMap.Icon({
                        size: new AMap.Size(32, 32),
                        image: marker.icon,
                        imageOffset: new AMap.Pixel(0, 0),
                        imageSize: new AMap.Size(-16, -16)
                    }),
                    extData:marker,
                    position: marker.lnglat,
                });
                marker.on('click', function (ev) {
                    var properties = ev.target.B.extData;
                    var info = [];
                    info.push('<div class="info_window">'+properties.name+'</div>');
                    info.push('<div class="info_window">地址：'+properties.address+'</div>');
                    var infoWindow = new AMap.InfoWindow({
                        content: info.join(""),  //使用默认信息窗体框样式，显示信息内容
                    });
                    infoWindow.open(_this.main_map_layer, properties.lnglat);
                });
            });
        },
        load_reachability_layer(){// 加载可达性区域范围图层
            this.reachabilityLayer.setData([{lnglat: this.reachability_data}], {
                lnglat: 'lnglat'
            });
            this.reachabilityLayer.setOptions({
                style: {
                    color: "#35F8BA",
                    opacity:0.2,
                }
            });
            this.reachabilityLayer.render();
            this.reachabilityLayer.show();
        },
        handleSubmit(e) {
            e.preventDefault();
            var data = this.search_criteria_params.medical.concat(this.search_criteria_params.education,
                this.search_criteria_params.traffic, this.search_criteria_params.handy_service,
                this.search_criteria_params.safety, this.search_criteria_params.cultural_resources);
            this.current_search_criteria_str = data.join("|");
            if(this.centerpoint){
                this.accessibility_initialize();
            }else{
                this.$message.info('请您现在地图上选取中心点。');
            }
        },
         handleReset() {
            this.reset_layer_data();
            this.centerpoint = "";
            this.search_criteria_params = {
                medical:[],
                education:[],
                traffic:[],
                handy_service:[],
                safety:[],
                cultural_resources:[],
                travel_time:"10",
            };
        },
    }
}

</script>
<style scoped>
.search_criteria{
    position: absolute;
    top: 5px;
    left: 5px;
    width: 360px;
    padding: 20px 20px;
    background-color: #fff;
    box-shadow: 0px 0px 8px 0px rgba(188, 142, 94, 1);
}
</style>