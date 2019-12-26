<!-- 主地图图层初始化 -->
<template>
    <div class='h_100 po_r'>
        <div id="main_map" class="h_100"><slot></slot></div>
        <!-- <div class="po_a map_content">
            <slot></slot>
        </div> -->
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
    methods: {},
    created() {},
    mounted() {
        this.init_map();
    },
    methods:{
        init_map(){ //初始化地图
            this.base_map = new AMap.Map("main_map", {
                mapStyle: 'amap://styles/4ab81766c3532896d5b265289c82cbc6',
                resizeEnable:true,
                center: [116.412255,39.908886],
                zoom: 12,
            });
        }
    }
}
</script>
<style lang='less' scoped>
    .map_content{
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }
</style>