<!-- 便民设施 -->
<template>
    <div class="main_content">
        <div class="echarts_content">
            <div class="echarts_content_sub">
                
            </div>
        </div>
        <div class="map_legend">
             <a-row>
                <a-col :span="12">
                    <img src="../../../../static/img/facilities/caishichang.png" alt="">
                    &nbsp;菜市场
                </a-col>
                <a-col :span="12">
                    <img src="../../../../static/img/facilities/chaoshi.png" alt="">
                    &nbsp;超市便利店
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
            markers:[],
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.get_convenience_people_layer();
    },
    methods: {
        get_convenience_people_layer(){
            this.http.getLocalhostJson("../../../../static/json/facilities/convenience_people.json", res =>{
                for(var i = 0; i < res.length; i++){
                    var item = res[i];
                    var marker = new AMap.Marker({
                            map: this.mainMapLayer,
                            icon: new AMap.Icon({
                                size: new AMap.Size(16, 16),
                                image: "../../../../static/img/facilities/"+
                                    (item.properties.type === '菜市场'?'caishichang':'chaoshi')+".png",
                                imageOffset: new AMap.Pixel(0, 0),
                                imageSize: new AMap.Size(-8, -8)
                            }),
                            position: item.lnglat[0],
                            offset: new AMap.Pixel(-10, -10),
                            extData:item.properties
                        });
                        this.markers.push(marker);
                }
            })
        }
    },
    created() {},
}
</script>
<style lang='less' scoped>

</style>