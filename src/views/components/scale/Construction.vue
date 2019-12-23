<!-- 建设规模 -->
<template>
    <div class='po_r h_100'>
        <div id="main_map" class="h_100"></div>
    </div>
</template>

<script>

export default {
    name:"Construction",
    components: {},
    data() {
        return {
            mainMapLayer:this.$parent.base_map,
        };
    },
    computed: {},
    watch: {},
    methods: {},
    created() {
        this.get_init_layer();
    },
    mounted() {
        console.log(this.$parent.base_map)
    },
    methods:{
        get_init_layer(){
            this.boundaryLayer = new Loca.LineLayer({
                map: this.mainMapLayer,
            });
        },
    }
}
</script>
<style lang='less' scoped>

</style>