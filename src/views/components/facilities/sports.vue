
<!-- 便民设施 -->
<template>
    <div class="main_content">
        <div class="echarts_content">
            <div class="echarts_content_sub">
                
            </div>
        </div>
        <div class="map_legend">
             <a-row>
                <a-col :span="24">
                    <img src="../../../../static/img/facilities/shineihuodong.png" alt="">
                    &nbsp;室内体育设施
                </a-col>
                <a-col :span="24" class="mt_10">
                    <img src="../../../../static/img/facilities/wenhuafuwuzhongxin.png" alt="">
                    &nbsp;街道文化服务中心
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
        this.get_sports_layer();
    },
    methods: {
        get_sports_layer(){
            this.http.getLocalhostJson("../../../../static/json/facilities/sports.json", res =>{
                for(var i = 0; i < res.length; i++){
                    var item = res[i];
                    var marker = new AMap.Marker({
                            map: this.mainMapLayer,
                            icon: new AMap.Icon({
                                size: new AMap.Size(16, 16),
                                image: "../../../../static/img/facilities/"+
                                    (item.properties.type === '室内体育设施'?'shineihuodong':'wenhuafuwuzhongxin')+".png",
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