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
            streetBoundaryLayer: this.$parent.mapLayerOption.streetBoundary,
            streetNameLayer: this.$parent.mapLayerOption.streetName,
        };
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {
        this.get_init_layer();
    },
    methods: {
        get_init_layer(){
            this.get_street_name_layer();
        },
        get_street_name_layer(){//社区名字文字图层
            this.http.getLocalhostJson("/static/json/street_name_data.json", res =>{
                //添加文字标记图层
                this.streetNameLayer.setData(res, {
                    lnglat: 'lnglat'
                }).setOptions({
                    style: {
                        direction: 'center',
                        offset: [0, 0],
                        text: function (item) {
                            return item.value.name;
                        },
                        fillColor: "#F319A0",
                        fontSize: 16,
                        strokeWidth: 0
                    }
                }).render();
                this.streetNameLayer.setzIndex(100);
                this.streetNameLayer.show();
            })
        }
    },
}
</script>
<style lang='less' scoped>

</style>