<!-- 侧边导航 -->
<template>
    <div class='side_nav'>
        <a-menu
          mode="inline"
          :openKeys="openKeys"
          :selectedKeys="selectedKeys"
           @openChange="onOpenChange"
           @select="selectMenu"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="Scale">
            <span slot="title">人口、建设规模双控</span>
            <a-menu-item key="PopulationScale"><router-link :to="{ name: 'PopulationScale' }">人口规模</router-link></a-menu-item>
            <a-menu-item key="ConstructionScale"><router-link :to="{ name: 'ConstructionScale' }">建设规模</router-link></a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="Facilities">
            <span slot="title">公共设施服务评估</span>
            <a-menu-item key="TrafficFacilities"><router-link :to="{ name: 'TrafficFacilities' }">交通设施</router-link></a-menu-item>
            <a-menu-item key="EducationFacilities"><router-link :to="{ name: 'EducationFacilities' }">教育设施</router-link></a-menu-item>
            <a-menu-item key="ProvideFacilities"><router-link :to="{ name: 'ProvideFacilities' }">养老颐养设施</router-link></a-menu-item>
            <a-menu-item key="ConveniencePeopleFacilities"><router-link :to="{ name: 'ConveniencePeopleFacilities' }">便民设施</router-link></a-menu-item>
            <a-menu-item key="SportsFacilities"><router-link :to="{ name: 'SportsFacilities' }">文体设施</router-link></a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="Cultural">
            <span slot="title">文化资源评估</span>
            <a-menu-item key="9">概览</a-menu-item>
            <a-menu-item key="10">物质文化遗产</a-menu-item>
            <a-menu-item key="11">历史建筑</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="Monitor">
            <span slot="title">街区活力监测</span>
            <a-menu-item key="9">人流量监测</a-menu-item>
            <a-menu-item key="10">文化活动监测</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="PublicSpace">
            <span slot="title">公共空间品质评估</span>
            <a-menu-item key="9">公园绿地</a-menu-item>
            <a-menu-item key="10">胡同环卫设施</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="Industry">
            <span slot="title">产业结构</span>
            <a-menu-item key="9">产业聚集度</a-menu-item>
            <a-menu-item key="10">产业发展</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="Traffic">
            <span slot="title">道路交通</span>
            <a-menu-item key="9">交通路况监测</a-menu-item>
            <a-menu-item key="10">停车场</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="Feedback">
            <span slot="title">公众反馈</span>
            <a-menu-item key="9">社区问题反馈</a-menu-item>
          </a-sub-menu>
        </a-menu>
    </div>
</template>

<script>

export default {
    components: {},
    data() {
        return {
          rootSubmenuKeys: ['Scale', 'Facilities', 'Cultural', "Monitor",
            "PublicSpace", "Industry", "Traffic", "Feedback"],
          openKeys:[],
          selectedKeys:[],
        };
    },
    computed: {},
    watch: { 
        '$route.path':function(newVal,oldVal){
            if(newVal){
                console.log(newVal)
            }
        }
    },
    created() {
      this.get_reload_menu()
    },
    mounted() {
    },
    methods: {
      onOpenChange(openKeys) {
        const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.openKeys = openKeys;
        } else {
          this.openKeys = latestOpenKey ? [latestOpenKey] : [];
        }
      },
      selectMenu( item){
        this.selectedKeys = item.selectedKeys;
      },
      get_reload_menu(){
        var menu = this.rootSubmenuKeys.filter((item => this.$route.name.indexOf(item) > -1));
        this.openKeys = menu;
        this.selectedKeys = [this.$route.name];
      }
    },
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