<!-- 主页面 -->
<template>
    <div class='po_r h_100'>
        <div id="main_map" class="h_100"></div>
    </div>
</template>

<script>

export default {
    components: {},
    data() {
        return {
            base_map:"",
        };
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {
        this.init_map();
    },
    methods: {
        init_map(){ //初始化地图
            this.base_map = new AMap.Map("main_map", {
                mapStyle: 'amap://styles/4ab81766c3532896d5b265289c82cbc6',
                resizeEnable:true,
                center: [116.412255,39.908886],
                zoom: 12,
            });
        }
    },
}
</script>
<style lang='less' scoped>

</style>