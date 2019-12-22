<!-- 侧边导航 -->
<template>
    <div class='side_nav'>
        <a-menu
          mode="inline"
          :defaultSelectedKeys="['1']"
          :defaultOpenKeys="['sub1']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="sub1">
            <span slot="title">人口、建设规模双控</span>
            <a-menu-item key="1"><router-link :to="{ name: 'PopulationScale' }">人口规模</router-link></a-menu-item>
            <a-menu-item key="2"><router-link :to="{ name: 'ConstructionScale' }">建设规模</router-link></a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title">公共设施服务评估</span>
            <a-menu-item key="5">交通设施</a-menu-item>
            <a-menu-item key="6">教育设施</a-menu-item>
            <a-menu-item key="7">养老颐养设施</a-menu-item>
            <a-menu-item key="8">便民设施</a-menu-item>
            <a-menu-item key="9">文体设施</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <span slot="title">文化资源评估</span>
            <a-menu-item key="9">概览</a-menu-item>
            <a-menu-item key="10">物质文化遗产</a-menu-item>
            <a-menu-item key="11">历史建筑</a-menu-item>
          </a-sub-menu>
        </a-menu>
    </div>
</template>

<script>

export default {
    components: {},
    data() {
        return {

        };
    },
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {},
}
</script>
<style lang='less'>
    .side_nav{
        .ant-menu{
            background-color:transparent!important;
            .ant-menu-submenu-title{
                font-size: 16px!important;
                font-weight: 700;
                color: #222;
            }
        }
    }
</style>