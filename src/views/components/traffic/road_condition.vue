<!-- 交通路况监测 -->
<template>

</template>

<script>

export default {
    components: {},
    data() {
        return {
            mainMapLayer: this.$parent.mapLayerOption.base,
            heatLayer: this.$parent.viewLayerOption.heat,
            polygonLayer: this.$parent.viewLayerOption.polygon,
            trafficLayer: this.$parent.viewLayerOption.traffic,
        };
    },
    computed: {},
    watch: {},
    created() {
        this.heatLayer? this.heatLayer.hide():"";
        this.polygonLayer? this.polygonLayer.hide():"";
        this.trafficLayer? this.get_real_time_traffic_layer():"";
    },
    methods: {
        get_real_time_traffic_layer(){
            this.trafficLayer.setMap(this.mainMapLayer);
            this.trafficLayer.show();
            this.$message.info('每小时更新一次路况信息。', 20);
        }
    },
    mounted() {},
}
</script>
<style lang='less' scoped>

</style>