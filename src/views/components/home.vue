<!-- 主页面 -->
<template>
    <div>
    </div>
</template>

<script>

export default {
    components: {},
    data() {
        return {
            mainMapLayer: this.$parent.mapLayerOption.base,
        };
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {
        this.mainMapLayer.setStatus({zoomEnable :  true});
    },
    methods: {
        get_init_layer(){
            // this.get_street_name_layer();
        },
    },
}
</script>
<style lang='less' scoped>

</style>