<!-- 人口规模 -->
<template class="h_100">
    <div class='po_r h_100'>
        <div id="sub_main_map" class="h_100"></div>
    </div>
</template>

<script>
export default {
    name:"Population",
    components: {},
    data() {
        return {
            mainMapLayer:"",
            boundaryLayer:"",
        };
    },
    computed: {},
    watch: {},
    methods: {},
    created() {
    },
    mounted() {
        this.init_map();
    },
    methods:{
        init_map(){ //初始化地图
            this.mainMapLayer = new AMap.Map("sub_main_map", {
                mapStyle: 'amap://styles/4ab81766c3532896d5b265289c82cbc6',
                resizeEnable:true,
                center: [116.412255,39.908886],
                zoom: 12,
            });
            this.get_init_layer();
        },
        get_init_layer(){
            this.boundaryLayer = new Loca.LineLayer({
                map: this.mainMapLayer,
            });
            this.get_boundary_layer();
        },
        get_boundary_layer(){
            this.http.getLocalhostJson("../../../../static/json/boundary_data.json", res =>{
                this.boundaryLayer.setData(res, {lnglat: 'lnglat'});
                this.boundaryLayer.setOptions({
                    style: {
                        height: function () {
                            return Math.random() * 20000;
                        },
                        opacity: 1,
                        color:"#d66349",
                    },
                });
                this.boundaryLayer.render();
            })
        }
    }
}
</script>
<style lang='less' scoped>

</style>