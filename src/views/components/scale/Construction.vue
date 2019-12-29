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

            </div>
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
            polygonLayer: this.$parent.viewLayerOption.polygon,
        };
    },
    computed: {},
    watch: {},
    methods: {},
    created() {
    },
    mounted() {
    },
    methods:{
        onChangeLayer(value){//改变图层
            switch (value){
                case "1" :
                    this.get_buildings_volume_ratio_layer();
                    break;
                case "2" :
                    this.get_buildings_density_layer();
                    break;
                case "3" :
                    this.get_resident_population_employment_place_layer();
                    break;
                case "4" :
                    this.get_employment_population_place_layer();
                    break;
                case "5" :
                    this.get_office_residence_ratio_layer();
                    break;
                default:
                    this.heatLayer.hide();
            }
        },
        get_buildings_volume_ratio_layer(){//建筑容积率图层
            this.http.getLocalhostJson("../../../../static/json/scale/buildings_volume_ratio_and_density.json", res =>{
                this.polygonLayer.setData(res,{lnglat: 'lnglat'});
                this.polygonLayer.setOptions({
                    style: {
                        // opacity: 0.5,
                        color: function (item) {
                            // var land_name = item.value.type;
                            // var color = colors[0];
                            // switch (land_name){
                            //     case "公园" :
                            //         color = colors[1];
                            //         break;
                            //     case "绿地" :
                            //         color = colors[2];
                            //         break;
                            //     default:
                            //         color = colors[0];
                            // }
                            return "#1afa29";
                        },
                        height: function () {
                            return Math.random() * 500 + 100;
                        }
                    }
                });
                this.polygonLayer.render();
                this.polygonLayer.show();
            })
        },
        get_buildings_density_layer(){//建筑密度图层
            this.http.getLocalhostJson("../../../../static/json/scale/buildings_volume_ratio_and_density.json", res =>{
                this.heatLayer.setData(res, {
                    lnglat: "lnglat",
                });
                this.heatLayer.setOptions({
                    style: {
                        radius: 16,
                        color: {
                            0.5: '#2c7bb6',
                            0.65: '#abd9e9',
                            0.7: '#ffffbf',
                            0.9: '#fde468',
                            1.0: '#d7191c'
                        },
                        // opacity:[0.3,0.7]
                    }
                });
                this.heatLayer.render();
                this.heatLayer.show();
            })
        },
        get_employed_population_layer(){//就业人口热力图层
            this.http.getLocalhostJson("../../../../static/json/scale/employed_population.json", res =>{
                this.heatLayer.setData(res, {
                    lnglat: "lnglat",
                });
                this.heatLayer.setOptions({
                    style: {
                        radius: 16,
                        color: {
                            0.5: '#2c7bb6',
                            0.65: '#abd9e9',
                            0.7: '#ffffbf',
                            0.9: '#fde468',
                            1.0: '#d7191c'
                        },
                        // opacity:[0.3,0.7]
                    }
                });
                this.heatLayer.render();
                this.heatLayer.show();
            })
        },
        get_employment_population_place_layer(){//就业人口居住地热力图层
            this.http.getLocalhostJson("../../../../static/json/scale/employment_population_place.json", res =>{
                this.heatLayer.setData(res, {
                    lnglat: "lnglat",
                });
                this.heatLayer.setOptions({
                    style: {
                        radius: 16,
                        color: {
                            0.5: '#2c7bb6',
                            0.65: '#abd9e9',
                            0.7: '#ffffbf',
                            0.9: '#fde468',
                            1.0: '#d7191c'
                        },
                        // opacity:[0.3,0.7]
                    }
                });
                this.heatLayer.render();
                this.heatLayer.show();
            })
        },
        get_office_residence_ratio_layer(){//职住比热力图层
            this.http.getLocalhostJson("../../../../static/json/scale/office_residence_ratio.json", res =>{
                this.heatLayer.setData(res, {
                    lnglat: "lnglat",
                });
                this.heatLayer.setOptions({
                    style: {
                        radius: 16,
                        color: {
                            0.5: '#2c7bb6',
                            0.65: '#abd9e9',
                            0.7: '#ffffbf',
                            0.9: '#fde468',
                            1.0: '#d7191c'
                        },
                        // opacity:[0.3,0.7]
                    }
                });
                this.heatLayer.render();
                this.heatLayer.show();
            })
        },
    }
}
</script>
<style lang='less' scoped>

</style>