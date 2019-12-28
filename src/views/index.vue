<template>
    <div class="h_100">
        <a-row class="h_92">
            <a-col :span="4" class="h_100 sider_nav">
                <side-nav></side-nav>
            </a-col>
            <a-col :span="20" class="h_100">
                <a-row class="h_8 bgc_main header">
                    <a-col :span="24">头部</a-col>
                </a-row>
                <a-row class="h_92 po_r">
                    <main-map ref="mainMapChild">
                        <template v-slot="params">
                            <router-view v-if="isRouterAlive"></router-view>
                        </template>
                    </main-map>
                    <!-- <a-spin size="large" :spinning="spinning"/> -->
                </a-row>
            </a-col>
        </a-row>
        <a-row class="h_8 footer">
            <a-col :span="24">底部</a-col>
        </a-row>
    </div>
</template>

<script>
import SideNav from "./components/common/SideNav"
import MainMap from "./components/common/MainMap"
export default {
    provide(){
        return {
            reload: this.reload,
            // streetBoundaryLayer: this.mapLayer.streetBoundary,
        }
    },
    components:{
        SideNav,
        MainMap
    },
    data () {
        return {
            isRouterAlive:true,
            spinning:true,
        };
    },
    computed: {
    },
    watch: { 
        '$route.path':function(newVal,oldVal){
            if(newVal){
                this.reload();//刷新页面
            }
        }
    },
    mounted(){
        this.reload();
    }, 
    methods: {
        resetMap(){
            this.$refs.mainMapChild.mapLayerOption.base.clearMap();//重置地图
        },
        reload(){
            this.isRouterAlive = false;
            this.$nextTick( () => {
                this.isRouterAlive = true;
                this.resetMap();
            })
        }
    }
};
</script>
<style scoped>
.h_92{
    height: 92%;
}
.h_8{
    height: 8%;
}
.sider_nav{
    background-color: #F4F4F0;
    border-right: 3px solid #f0b33c;
    box-shadow: 1px 0 5px #fff;
    box-sizing: border-box;
    /* overflow-y: auto; */
}
.header{

}
.footer {
    position: relative;
    height: 8%;
    border-top: 3px solid #f0b33c;
    /* background: url(../images/logo-bottom.png) 20px center no-repeat; */
    box-sizing: border-box;
}
</style>