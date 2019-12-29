<!-- 文化活动监测 -->
<template>
    <div class="main_content">
        <div class="echarts_content">
            <div class="echarts_content_sub">
                
            </div>
        </div>
    </div>
</template>

<script>

export default {
    components: {},
    data() {
        return {
            mainMapLayer: this.$parent.mapLayerOption.base,
            heatLayer: this.$parent.viewLayerOption.heat,
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.heatLayer? this.heatLayer.hide():"";
        this.get_cultural_activities_layer();
    },
    methods: {
        get_cultural_activities_layer(){//文化活动图层
            this.http.getLocalhostJson("../../../../static/json/monitor/culture_vitality_data.json", res =>{
                this.heatLayer.setData(res, {
                    lnglat: "lnglat",
                });
                this.heatLayer.setOptions({
                    style: {
                        radius: 12,
                        color: {
                            0.5: '#2c7bb6',
                            0.65: '#abd9e9',
                            0.7: '#ffffbf',
                            0.9: '#fde468',
                            1.0: '#d7191c'
                        },
                        opacity:[0.4,0.7]
                    }
                });
                this.heatLayer.render();
                this.heatLayer.show();
            })
        },
    },
    created() {},
}
</script>
<style lang='less' scoped>

</style>