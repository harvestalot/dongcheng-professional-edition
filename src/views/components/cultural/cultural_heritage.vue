<!-- 物质文化遗产 -->
<template>
    <div class="main_content">
        <div class="echarts_content">
            <div class="echarts_content_sub">
                
            </div>
        </div>
        <div class="map_legend">
             <a-row>
                <a-col :span="12">
                    <img src="../../../../static/img/cultural/wenhuayichan.png" alt="">
                    &nbsp;国家级
                </a-col>
                <a-col :span="12">
                    <img src="../../../../static/img/cultural/wenhuayichan_1.png" alt="">
                    &nbsp;市级
                </a-col>
                <a-col :span="12" class="mt_10">
                    <img src="../../../../static/img/cultural/wenhuayichan_2.png" alt="">
                    &nbsp;区级
                </a-col>
                <a-col :span="12" class="mt_10">
                    <img src="../../../../static/img/cultural/wenhuayichan_3.png" alt="">
                    &nbsp;其他
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
            markers:[],
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.heatLayer? this.heatLayer.hide():"";
        this.get_cultural_heritage_layer();
    },
    methods: {
        get_cultural_heritage_layer(){//文化遗产
            this.http.getLocalhostJson("../../../../static/json/cultural/tangible_cultural_heritage.json", res =>{
                for(var i = 0; i < res.length; i++){
                    var item = res[i];
                    var marker = new AMap.Marker({
                            map: this.mainMapLayer,
                            icon: new AMap.Icon({
                                size: new AMap.Size(16, 16),
                                image: "../../../../static/img/cultural/"+
                                    (item.protection_class === '全国重点文物保护单位'?'wenhuayichan':
                                    (item.protection_class === '市级文物保护单位'?'wenhuayichan_1':
                                    (item.protection_class === '区级文物保护单位'?'wenhuayichan_2':'wenhuayichan_3')))+".png",
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
        },
    },
    created() {},
}
</script>
<style lang='less' scoped>

</style>