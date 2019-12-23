<!-- 人口规模 -->
<template>
    <div class='po_r h_100'>
        <div id="main_map" class="h_100"></div>
    </div>
</template>

<script>
export default {
    name:"Population",
    components: {},
    data() {
        return {
            mainMapLayer:this.$parent.base_map,
            boundaryLayer:"",
        };
    },
    computed: {},
    watch: {},
    methods: {},
    created() {
        this.get_init_layer();
        this.get_boundary_layer();
    },
    mounted() {
    },
    methods:{
        get_init_layer(){
            this.boundaryLayer = new Loca.LineLayer({
                map: this.mainMapLayer,
            });
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