<!-- 建设规模 -->
<template>
    <div class='po_r h_100'>
        <div id="sub_main_map" class="h_100"></div>
    </div>
</template>

<script>

export default {
    name:"Construction",
    components: {},
    data() {
        return {
            mainMapLayer:"",
        };
    },
    computed: {},
    watch: {},
    methods: {},
    created() {
    },
    mounted() {
        this.init_map();
        this.get_init_layer();
        // console.log(this.$parent.base_map)
    },
    methods:{
        init_map(){ //初始化地图
            this.mainMapLayer = new AMap.Map("sub_main_map", {
                mapStyle: 'amap://styles/4ab81766c3532896d5b265289c82cbc6',
                resizeEnable:true,
                center: [116.412255,39.908886],
                zoom: 12,
            });
        },
        get_init_layer(){
            // this.boundaryLayer = new Loca.LineLayer({
            //     map: this.mainMapLayer,
            // });
        },
    }
}
</script>
<style lang='less' scoped>

</style>