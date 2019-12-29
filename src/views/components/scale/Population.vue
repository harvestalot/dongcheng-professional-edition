<!-- 人口规模 -->
<template>
    <div class="main_content">
        <div class="layer_content">
            <a-select style="width: 200px" placeholder="请选择图层类型" allowClear @change="onChangeLayer">
                <a-select-option value="1">居住人口分布</a-select-option>
                <a-select-option value="2">就业人口分布</a-select-option>
                <a-select-option value="3">居住人口就业地</a-select-option>
                <a-select-option value="4">就业人口居住地</a-select-option>
                <a-select-option value="5">职住比</a-select-option>
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
    name:"Population",
    inject:["reload"],
    components: {},
    data() {
        return {
            mainMapLayer: this.$parent.mapLayerOption.base,
            heatLayer: this.$parent.viewLayerOption.heat,
        };
    },
    computed: {},
    watch: {
    },
    methods: {},
    created() {},
    mounted() {
    },
    methods:{
        onChangeLayer(value){//改变图层
            switch (value){
                case "1" :
                    this.get_resident_population_layer();
                    break;
                case "2" :
                    this.get_employed_population_layer();
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
        get_resident_population_layer(){//居住人口热力图层
            this.http.getLocalhostJson("../../../../static/json/scale/resident_population.json", res =>{
                this.heatLayer.setData(res, {
                    lnglat: "lnglat",
                    // // 或者使用回调函数构造经纬度坐标
                    //  lnglat: function (obj) {
                    //     if (obj.value) {
                    //          var value = obj.value;
                    //          var lnglat = [value['X'], value['Y']];
                    //          return lnglat;
                    //     }
                    //  },
                    // // 指定数据类型
                    // type: 'csv'
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
        get_resident_population_employment_place_layer(){//居住人口就业地热力图层
            this.http.getLocalhostJson("../../../../static/json/scale/resident_population_employment_place.json", res =>{
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
    // .slide-fade-enter-active {
    //     transition: all .3s ease;
    // }
    // .slide-fade-leave-active {
    //     transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    // }
    // .slide-fade-enter, .slide-fade-leave-to {
    //     transform: translateX(-100px);
    //     opacity: 0;
    // }
</style>