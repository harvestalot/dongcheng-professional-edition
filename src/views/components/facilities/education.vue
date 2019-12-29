<!-- 教育设施 -->
<template>
    <div class="main_content">
        <div class="echarts_content">
            <div class="echarts_content_sub">
                
            </div>
        </div>
        <div class="map_legend">
             <a-row>
                <a-col :span="12">
                    <img src="../../../../static/img/facilities/youeryuan.png" alt="">
                    &nbsp;幼儿园
                </a-col>
                <a-col :span="12">
                    <img src="../../../../static/img/facilities/xiaoxue.png" alt="">
                    &nbsp;小学
                </a-col>
                <a-col :span="12" class="mt_10">
                    <img src="../../../../static/img/facilities/zhongxue.png" alt="">
                    &nbsp;中学
                </a-col>
                <a-col :span="12" class="mt_10">
                    <img src="../../../../static/img/facilities/xuexiao.png" alt="">
                    &nbsp;九年一贯制
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
        this.get_education_layer();
    },
    methods: {
        get_education_layer(){
            this.http.getLocalhostJson("../../../../static/json/facilities/education.json", res =>{
                for(var i = 0; i < res.length; i++){
                    var item = res[i];
                    var marker = new AMap.Marker({
                            map: this.mainMapLayer,
                            icon: new AMap.Icon({
                                size: new AMap.Size(16, 16),
                                image: "../../../../static/img/facilities/"+
                                    (item.properties.type === '幼儿园'?'youeryuan':
                                    (item.properties.type === '小学'?'xiaoxue':
                                    (item.properties.type === '中学'?'zhongxue':'xuexiao')))+".png",
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