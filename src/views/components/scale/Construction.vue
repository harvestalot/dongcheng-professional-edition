<!-- 建设规模 -->
<template>
    <div class="main_content">
        <div class="layer_content">
            <a-select style="width: 200px" placeholder="请选择图层类型" allowClear @change="onChangeLayer">
                <a-select-option value="1">建筑容积率</a-select-option>
                <a-select-option value="2">建筑密度</a-select-option>
                <a-select-option value="3">超高建筑分布</a-select-option>
                <a-select-option value="4">老旧小区</a-select-option>
            </a-select>
        </div>
        <div class="echarts_content">
            <div class="echarts_content_sub">
                <div id="bar_line_stack_chart_content" class="h_100"></div>
            </div>
        </div>
        <div class="map_legend chromatic_gradient_map_legend" v-if="layer_type_code && layer_type_code<4">
             <a-row>
                <a-col :span="24" class="chromatic_gradient">
                    <span></span>&nbsp;&nbsp;{{ chromatic_gradient[layer_type_code][0] }}
                </a-col>
                <a-col :span="24" class="mt_10 chromatic_gradient">
                    <span></span>&nbsp;&nbsp;{{ chromatic_gradient[layer_type_code][1] }}
                </a-col>
                <a-col :span="24" class="mt_10 chromatic_gradient">
                    <span></span>&nbsp;&nbsp;{{ chromatic_gradient[layer_type_code][2] }}
                </a-col>
                <a-col :span="24" class="mt_10 chromatic_gradient">
                    <span></span>&nbsp;&nbsp;{{ chromatic_gradient[layer_type_code][3] }}
                </a-col>
                <a-col :span="24" class="mt_10 chromatic_gradient" v-show="layer_type_code < 3">
                    <span></span>&nbsp;&nbsp;{{ chromatic_gradient[layer_type_code][4] }}
                </a-col>
                <a-col :span="24" class="mt_10 chromatic_gradient" v-show="layer_type_code < 3">
                    <span></span>&nbsp;&nbsp;{{ chromatic_gradient[layer_type_code][5] }}
                </a-col>
                <a-col :span="24" class="mt_10 chromatic_gradient">
                    <span></span>&nbsp;&nbsp;{{ chromatic_gradient[layer_type_code][(layer_type_code<3?6:4)]}}
                </a-col>
            </a-row>
        </div>
        <div class="map_legend chromatic_gradient_map_legend" v-else-if="layer_type_code && layer_type_code==4">
             <a-row>
                <a-col :span="24">
                    <img src="../../../../static/img/buildings/xiaoqu.png" alt="">
                    &nbsp;1900年 - 1970年
                </a-col>
                <a-col :span="24" class="mt_10">
                    <img src="../../../../static/img/buildings/xiaoqu_1.png" alt="">
                    &nbsp;1971年 - 1975年
                </a-col>
                <a-col :span="24" class="mt_10">
                    <img src="../../../../static/img/buildings/xiaoqu_2.png" alt="">
                    &nbsp;1976年 - 1980年
                </a-col>
                <a-col :span="24" class="mt_10">
                    <img src="../../../../static/img/buildings/xiaoqu_3.png" alt="">
                    &nbsp;1981年 - 1989年
                </a-col>
                <a-col :span="24" class="mt_10">
                    <img src="../../../../static/img/buildings/xiaoqu_4.png" alt="">
                    &nbsp;不明年份
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>

export default {
    name:"Construction",
    inject:["reload"],
    components: {},
    data() {
        return {
            mainMapLayer: this.$parent.mapLayerOption.base,
            // heatLayer: this.$parent.viewLayerOption.heat,
            polygonLayer: this.$parent.viewLayerOption.polygon,
            markers:[],
            layer_type_code:"",
            chromatic_gradient:{
                "1": ["0.40 - 0.50", "0.51 - 0.80", "0.81 - 0.10",
                    "1.01 - 1.20", "1.21 - 1.40", "1.41 - 1.60", "1.61 - 2.24"],
                "2": ["13.5 - 15.0", "15.1 - 20.0", "20.1 - 23.1",
                    "23.2 - 26.0", "26.1 - 29.3", "29.4 - 32.0", "32.1 - 39.4"],
                "3": ["1 - 3", "4 - 6", "7 - 10", "11 - 15", "15以上"],
                "4": ["1900年 - 1970年", "1971年 - 1975年", "1976年 - 1980年", "1981年 - 1989年", "不明年份"]
            },
            street_names:[],
            legend_data:["建筑密度", "容积率"],
            buildings_density_data:[],
            buildings_volume_ratio_data:[],
        };
    },
    computed: {},
    watch: {},
    methods: {},
    created() {
    },
    mounted() {
        this.get_statistics_chart_data();
    },
    methods:{
        onChangeLayer(value){//改变图层
            this.layer_type_code = value;
            this.polygonLayer.hide();
            this.mainMapLayer.clearMap()
            switch (value){
                case "1" :
                    this.get_buildings_volume_ratio_layer();
                    break;
                case "2" :
                    this.get_buildings_density_layer();
                    break;
                case "3" :
                    this.get_buildings_super_high_layer();
                    break;
                case "4" :
                    this.get_buildings_second_hand_house_layer();
                    break;
                default:
                    this.polygonLayer.hide();
            }
        },
        get_buildings_volume_ratio_layer(){//建筑容积率图层
            var _this = this;
            this.http.getLocalhostJson("../../../../static/json/scale/buildings_volume_ratio_and_density.json", res =>{
                this.polygonLayer.setData(res,{lnglat: 'lnglat'});
                this.polygonLayer.setOptions({
                    style: {
                        // opacity: 0.5,
                        color: function (item) {
                            var value = item.value.volume_ratio;
                            var colors = _this.$Basice.chromatic_gradient;
                            var color = "";
                            switch (true){
                                case (value > 0.40 && value < 0.50) :
                                    color = colors[1];
                                    break;
                                case (value > 0.51 && value < 0.80) :
                                    color = colors[2];
                                    break;
                                case (value > 0.81 && value < 1.0) :
                                    color = colors[3];
                                    break;
                                case (value > 1.01 && value < 1.20) :
                                    color = colors[4];
                                    break;
                                case (value > 1.21 && value < 1.40) :
                                    color = colors[5];
                                    break;
                                case (value > 1.41 && value < 1.60) :
                                    color = colors[6];
                                    break;
                                case (value > 1.61 && value < 2.24) :
                                    color = colors[7];
                                    break;
                                default:
                                    color = colors[0];
                            }
                            return color;
                        },
                    }
                });
                this.polygonLayer.render();
                this.polygonLayer.show();
            })
        },
        get_buildings_density_layer(){//建筑密度图层
            var _this = this;
            this.http.getLocalhostJson("../../../../static/json/scale/buildings_volume_ratio_and_density.json", res =>{
                this.polygonLayer.setData(res,{lnglat: 'lnglat'});
                this.polygonLayer.setOptions({
                    style: {
                        // opacity: 0.5,
                        color: function (item) {
                            var value = item.value.density;
                            var colors = _this.$Basice.chromatic_gradient;
                            var color = "";
                            switch (true){
                                case (value > 13.5 && value < 15.0) :
                                    color = colors[1];
                                    break;
                                case (value > 15.1 && value < 20.0) :
                                    color = colors[2];
                                    break;
                                case (value > 20.1 && value < 23.1) :
                                    color = colors[3];
                                    break;
                                case (value > 23.2 && value < 26.0) :
                                    color = colors[4];
                                    break;
                                case (value > 26.1 && value < 29.3) :
                                    color = colors[5];
                                    break;
                                case (value > 29.4 && value < 32.0) :
                                    color = colors[6];
                                    break;
                                case (value > 32.1 && value < 39.4) :
                                    color = colors[7];
                                    break;
                                default:
                                    color = colors[0];
                            }
                            return color;
                        },
                    }
                });
                this.polygonLayer.render();
                this.polygonLayer.show();
            })
        },
        get_buildings_super_high_layer(){//超高建筑分布图层
            var _this = this;
            this.http.getLocalhostJson("../../../../static/json/scale/buildings.json", res =>{
                this.polygonLayer.setData(res,{lnglat: 'lnglat'});
                this.polygonLayer.setOptions({
                    style: {
                        // opacity: 0.5,
                        color: function (item) {
                            var value = item.value.value;
                            var colors = _this.$Basice.chromatic_gradient;
                            var color = "";
                            switch (true){
                                case (value >= 1 && value <= 3) :
                                    color = colors[1];
                                    break;
                                case (value >= 4 && value <= 6) :
                                    color = colors[2];
                                    break;
                                case (value >= 7 && value <= 10) :
                                    color = colors[3];
                                    break;
                                case (value >= 11 && value <= 15) :
                                    color = colors[4];
                                    break;
                                case (value > 15) :
                                    color = colors[7];
                                    break;
                                default:
                                    color = colors[0];
                            }
                            return color;
                        },
                    }
                });
                this.polygonLayer.render();
                this.polygonLayer.show();
            })
        },
        get_buildings_second_hand_house_layer(){//老旧小区图层
            this.http.getLocalhostJson("../../../../static/json/scale/buildings_second_hand_house.json", res =>{
                for(var i = 0; i < res.length; i++){
                    var item = res[i];
                    var marker = new AMap.Marker({
                            map: this.mainMapLayer,
                            icon: new AMap.Icon({
                                size: new AMap.Size(16, 16),
                                image: "../../../../static/img/buildings/"+
                                    (item.year >= 1900 && item.year <= 1970?"xiaoqu":
                                    (item.year >= 1971 && item.year <= 1975?"xiaoqu_1":
                                    (item.year >= 1976 && item.year <= 1980?"xiaoqu_2":
                                    (item.year >= 1981 && item.year <= 1989?"xiaoqu_3":"xiaoqu_4"))))+".png",
                                imageOffset: new AMap.Pixel(0, 0),
                                imageSize: new AMap.Size(-8, -8)
                            }),
                            position: item.lnglat,
                            offset: new AMap.Pixel(-10, -10),
                            extData:item
                        });
                        this.markers.push(marker);
                }
            })
        },
        get_statistics_chart_data(){//获取统计图表数据
            this.http.get("parking/geParkingList", {}, res =>{
                if(res.success){
                    var data  = JSON.parse(Decrypt(res.data.results.resultKey));
                    for(var i = 0; i < data.length; i++){
                        var item = data[i];
                        this.street_names.push(item.streetName.split("街道")[0]);
                        this.buildings_density_data.push(item.jobParking);
                        this.buildings_volume_ratio_data.push(item.communityParking/100);
                    }
                    this.get_line_bar_stack_chart();
                }
            })
        },
        get_line_bar_stack_chart(){//建筑密度、容积率统计图
            var line_bar_stack_chart = echarts.init(document.getElementById("bar_line_stack_chart_content"));
            var line_bar_option = {
                title:{ ...{
                    text: "各街道建筑密度和容积率统计",
                }, ...this.$Basice.echart_title},
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                        label: {
                            show: true,
                            backgroundColor: '#7B7DDC'
                        }
                    }
                },
                legend: {
                    top:40,
                    data: this.legend_data,
                    icon:"circle",
                    textStyle: {
                        color: '#222'
                    },
                },
                grid: {
                    left: 80,
                    top:110,
                    right:50,
                    bottom:30,
                },
                yAxis: {
                    data: this.street_names,
                    axisLine: {
                        lineStyle: {
                            color: '#B4B4B4'
                        }
                    },
                    axisTick:{
                        show:false,
                    },
                },
                xAxis: [{

                    splitLine: {show: false},
                    axisLine: {
                        lineStyle: {
                            color: '#B4B4B4',
                        }
                    },
                    
                    axisLabel:{
                        formatter:'{value} ',
                    }
                },
                    {

                    splitLine: {show: false},
                    axisLine: {
                        lineStyle: {
                            color: '#B4B4B4',
                        }
                    },
                    axisLabel:{
                        formatter:'{value} ',
                    }
                }],
                series: [{
                    name: '容积率',
                    type: 'line',
                    smooth: true,
                    showAllSymbol: true,
                    symbol: 'emptyCircle',
                    symbolSize: 8,
                    xAxisIndex: 1,
                    itemStyle: {
                            normal: {
                            color: this.$Basice.colors[0]},
                    },
                    data: this.buildings_volume_ratio_data
                }, 
                
                {
                    name: '建筑密度',
                    type: 'bar',
                    barWidth: 10,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 5,
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#956FD4'},
                                    {offset: 1, color: '#3EACE5'}
                                ]
                            )
                        }
                    },
                    data: this.buildings_density_data
                }]
            };
            line_bar_stack_chart.setOption(line_bar_option, true);
            window.onresize = function(){
                line_bar_stack_chart.resize();
            }

        },
    }
}
</script>
<style lang='less' scoped>

</style>