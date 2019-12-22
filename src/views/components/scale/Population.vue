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
        };
    },
    computed: {},
    watch: {},
    methods: {},
    created() {
    },
    mounted() {
        console.log(this.$parent.base_map)
    },
    methods:{
    }
}
</script>
<style lang='less' scoped>

</style>