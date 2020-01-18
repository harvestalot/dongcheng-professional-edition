<!-- 停车场 -->
<template>
    <div class="main_content">
        <div class="echarts_content">
            <div class="echarts_content_sub">
                <div id="bar_stack_chart_content" class="h_100"></div>
            </div>
        </div>
        <div class="map_legend">
             <a-row>
                <a-col :span="12">
                    <img src="../../../../static/img/parking/1.png" alt="">
                    &nbsp;小区停车场
                </a-col>
                <a-col :span="12">
                    <img src="../../../../static/img/parking/2.png" alt="">
                    &nbsp;商业停车场
                </a-col>
                <a-col :span="12" class="mt_10">
                    <img src="../../../../static/img/parking/3.png" alt="">
                    &nbsp;路边停车场
                </a-col>
                <a-col :span="12" class="mt_10">
                    <img src="../../../../static/img/parking/4.png" alt="">
                    &nbsp;工作地停车场
                </a-col>
                <a-col :span="24" class="mt_10">
                    <img src="../../../../static/img/parking/5.png" alt="">
                    &nbsp;其他公共停车场
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
            heatLayer: this.$parent.viewLayerOption.heat,
            polygonLayer: this.$parent.viewLayerOption.polygon,
            trafficLayer: this.$parent.viewLayerOption.traffic,
            markers:[],
            parkingTypeName : ["工作地停车场", "商业停车场", "路边停车场", "小区停车场", "其他公共停车场"],
            street_names: [],
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.heatLayer? this.heatLayer.hide():"";
        this.polygonLayer? this.polygonLayer.hide():"";
        this.trafficLayer? this.trafficLayer.hide():"";
        this.load_parking_bar_chart();
        this.get_parking_layer();
    },
    methods: {
        get_parking_layer(){
            this.http.getLocalhostJson("/static/json/parking.json", res =>{
                for(var i = 0; i < res.length; i++){
                    var item = res[i];
                    var marker = new AMap.Marker({
                        map: this.mainMapLayer,
                        icon: new AMap.Icon({
                            size: new AMap.Size(16, 16),
                            image: this.$Basice.icon_url + "/static/img/parking/"+
                                (item.type === '小区停车场'?'1':
                                (item.type === '商业停车场'?'2':
                                (item.type === '路边停车场'?'3':
                                (item.type === '工作地停车场'?'4':
                                '5'))))+".png",
                            imageOffset: new AMap.Pixel(0, 0),
                            imageSize: new AMap.Size(-8, -8)
                        }),
                        position: item.lnglat,
                        offset: new AMap.Pixel(-10, -10),
                        extData:item
                    });
                    var _this = this;
                    marker.on('click', function (ev) {
                        var properties = ev.target.B.extData;
                        _this.load_info_window(properties, ev.lnglat);
                    });
                    this.markers.push(marker);
                }
            })
        },
        load_info_window(properties, center){
            var info = [];
            info.push('<div class="info_window">名称：'+properties.name+'</div>');
            info.push('<div class="info_window">类型：'+properties.type+'</div>');
            info.push('<div class="info_window">地址：'+properties.addres+'</div>');
            var infoWindow = new AMap.InfoWindow({
                content: info.join(""),  //使用默认信息窗体框样式，显示信息内容
            });
            infoWindow.open(this.mainMapLayer, center);
        },
        load_parking_bar_chart(){//各街道停车场统计数据
            var parking_bar_chart = echarts.init(document.getElementById("bar_stack_chart_content"));
            var seriesLabel = {
                normal: {
                    show: true,
                    textBorderColor: '#333',
                    textBorderWidth: 2
                }
            }
            var bar_option = {
                color: this.$Basice.colors,
                title:{ ...{
                    text: "各街道停车场数据",
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
                    data: this.parkingTypeName
                },
                grid: {
                    left: 80,
                    top:110,
                    right:50,
                    bottom:30,
                },
                xAxis: {
                    type: 'value',
                    name: '个',
                    axisLabel:  this.$Basice.coordinate_axis_style.axisLabel,
                    axisLine:  this.$Basice.coordinate_axis_style.axisLine,
                    splitLine:  this.$Basice.coordinate_axis_style.splitLine,
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
            this.http.get("parking/geParkingList", {}, res =>{
                if(res.success){
                    var englishParking = ["jobParking", "commercialParking", "roadsideParking", "communityParking", "othres"];
                    var data  = JSON.parse(Decrypt(res.data.results.resultKey));
                    for(var i = 0; i < englishParking.length; i++){
                        bar_option.series[i] = {
                            name: this.parkingTypeName[i],
                            type: 'bar',
                            barWidth:20, 
                            stack:"1",
                            data: []
                        };
                        var itemData = [];
                        for(var j = 0; j < data.length; j++){
                            var item = data[j];
                            this.street_names.indexOf(item.streetName.split("街道")[0]) === -1? this.street_names.push(item.streetName.split("街道")[0]):"";
                            bar_option.series[i].data.push(item[englishParking[i]]);
                        }
                    }
                    parking_bar_chart.setOption(bar_option, true);
                    window.onresize = function(){
                        parking_bar_chart.resize();
                    }
                }
            })
        }
    },
    created() {},
}
</script>
<style lang='less' scoped>

</style>