<!-- 交通设置 -->
<template>
    <div class="main_content">
        <div class="echarts_content">
            <div class="echarts_content_sub">
                
            </div>
        </div>
        <div class="map_legend">
             <a-row>
                <a-col :span="12">
                    <img src="../../../../static/img/facilities/ditie.png" alt="">
                    &nbsp;地铁站
                </a-col>
                <a-col :span="12">
                    <img src="../../../../static/img/facilities/gongjiao.png" alt="">
                    &nbsp;公交站
                </a-col>
            </a-row>
            <!-- <icon-font type="icon-ditie" :style="{ fontSize: '32px', color: '#f0993c' }"/>
            <icon-font type="icon-gongjiao" :style="{ fontSize: '32px', color: '#d66349' }"/> -->
        </div>
    </div>
</template>

<script> 
// import { Icon } from 'ant-design-vue';
// const IconFont = Icon.createFromIconfontCN({
//   scriptUrl: '//at.alicdn.com/t/font_1587980_ga2oc0n6fsm.js',
// });
export default {
    components: {
        // IconFont
    },
    data() {
        return {
            mainMapLayer: this.$parent.mapLayerOption.base,
            heatLayer: this.$parent.viewLayerOption.heat,
            markers:[],
        };
    },
    computed: {},
    watch: {},
    created() {
        this.heatLayer? this.heatLayer.hide():"";
        this.get_traffic_layer();
    },
    methods: {
        get_traffic_layer(){
            this.http.getLocalhostJson("../../../../static/json/facilities/traffic.json", res =>{
                for(var i = 0; i < res.length; i++){
                    var item = res[i];
                    var marker = new AMap.Marker({
                            map: this.mainMapLayer,
                            icon: new AMap.Icon({
                                size: new AMap.Size(16, 16),
                                image: "../../../../static/img/facilities/"+(item.properties.type === '地铁站'?'ditie':'gongjiao')+".png",
                                imageOffset: new AMap.Pixel(0, 0),
                                imageSize: new AMap.Size(-8, -8)
                            }),
                            position: item.lnglat,
                            offset: new AMap.Pixel(-10, -10),
                            extData:item.properties
                        });
                        this.markers.push(marker);
                }
            })
        }
    },
    mounted() {},
}
</script>
<style lang='less' scoped>

</style>