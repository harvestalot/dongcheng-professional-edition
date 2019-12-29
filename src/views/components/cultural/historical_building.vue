<!-- 历史建筑 -->
<template>
    <div class="main_content">
        <div class="echarts_content">
            <div class="echarts_content_sub">
                
            </div>
        </div>
        <div class="map_legend">
             <a-row>
                <a-col :span="12">
                    <img src="../../../../static/img/cultural/simiao.png" alt="">
                    &nbsp;寺庙宫观
                </a-col>
                <a-col :span="12">
                    <img src="../../../../static/img/cultural/guju.png" alt="">
                    &nbsp;故居
                </a-col>
                <a-col :span="12" class="mt_10">
                    <img src="../../../../static/img/cultural/shiguan.png" alt="">
                    &nbsp;使馆
                </a-col>
                <a-col :span="12" class="mt_10">
                    <img src="../../../../static/img/cultural/wangfu.png" alt="">
                    &nbsp;王府
                </a-col>
                <a-col :span="12" class="mt_10">
                    <img src="../../../../static/img/cultural/guanshu.png" alt="">
                    &nbsp;官署
                </a-col>
                <a-col :span="12" class="mt_10">
                    <img src="../../../../static/img/cultural/gushumingmu.png" alt="">
                    &nbsp;古树名木
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
        this.get_historical_building_layer();
        // this.http.get("banner/getBannerList", { type:"VIGOUR" }, res =>{
        //     if(res.success){
        //         var data  = res.data.results;
        //         console.log(data)
        //     }
        // })
    },
    methods: {
        get_historical_building_layer(){//历史建筑
            this.http.getLocalhostJson("../../../../static/json/cultural/historical_building.json", res =>{
                for(var i = 0; i < res.length; i++){
                    var item = res[i];
                    var marker = new AMap.Marker({
                            map: this.mainMapLayer,
                            icon: new AMap.Icon({
                                size: new AMap.Size(16, 16),
                                image: "../../../../static/img/cultural/"+
                                    (item.type === '故居'?'guju':
                                    (item.type === '寺庙宫观'?'simiao':
                                    (item.type === '王府'?'wangfu':
                                    (item.type === '使馆'?'shiguan':
                                    (item.type === '官署'?'guanshu':'gushumingmu')))))+".png",
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
    created() {},
}
</script>
<style lang='less' scoped>

</style>