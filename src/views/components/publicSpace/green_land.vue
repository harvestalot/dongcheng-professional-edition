<!-- 公园绿地 -->
<template>
    <div class="main_content">
        <div class="echarts_content">
            <div class="echarts_content_sub">
                
            </div>
        </div>
        <div class="map_legend">
             <a-row>
                <a-col :span="12">
                    <img src="../../../../static/img/publicSpace/lvdi.png" alt="">
                    &nbsp;绿地
                </a-col>
                <a-col :span="12">
                    <img src="../../../../static/img/publicSpace/lvdi_1.png" alt="">
                    &nbsp;公园
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
            polygonLayer: this.$parent.viewLayerOption.polygon,
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.get_green_land_layer();
    },
    methods: {
        get_green_land_layer(){
            var colors = ["#1296db", "#1296db", "#f50bf0"];
            this.http.getLocalhostJson("../../../../static/json/publicSpace/green_land.json", res =>{
                this.polygonLayer.setData(res,{lnglat: 'lnglat'});
                this.polygonLayer.setOptions({
                    style: {
                        // opacity: 0.5,
                        color: function (item) {
                            var land_name = item.value.type;
                            var color = colors[0];
                            switch (land_name){
                                case "公园" :
                                    color = colors[1];
                                    break;
                                case "绿地" :
                                    color = colors[2];
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
                    // selectStyle:{
                    //     color:"#13EFDC",
                    // }
                });
                this.polygonLayer.render();
                this.polygonLayer.show();
            })
        }
    },
    created() {},
}
</script>
<style lang='less' scoped>

</style>