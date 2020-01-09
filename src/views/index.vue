<template>
    <div class="h_100">
        <a-row class="h_92">
            <a-col :span="4" class="h_100 sider_nav">
                <div class="pointer logo">
                    <img src="../../static/img/logo.png" @click="go_home">
                </div>
                <side-nav></side-nav>
            </a-col>
            <a-col :span="20" class="h_100">
                <a-row class="h_8 bgc_main header">
                    <a-col :span="1">
                        <div class="pointer logo_icon">
                            <img src="../../static/img/logo_icon.png" @click="go_home">
                        </div>
                    </a-col>
                    <a-col :span="6">
                        <h1 class="title">东城区体检平台(专业版)</h1>
                    </a-col>
                    <a-col :span="6" class="h_100">
                        <nav id="nav" class="nav">
                            <router-link :to="{ name: 'Home' }" class="nav_item">首页</router-link>
                            <span class="nav_item">平台简介</span>
                        </nav>
                    </a-col>
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
            <img src="../../static/img/logo-bottom.png" alt="">
            <router-link :to="{ name: 'AboutUs' }" class="about_us">关于我们</router-link>
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
                this.resetMap();//刷新页面
            }
        }
    },
    mounted(){
        this.reload();
    }, 
    methods: {
        resetMap(){
            window.clearInterval(this.$Basice.timer);
            this.$refs.mainMapChild.mapLayerOption.base.clearMap();//重置地图
            this.$refs.mainMapChild.viewLayerOption.heat.hide();
            this.$refs.mainMapChild.viewLayerOption.timelineHeat.hide();
            this.$refs.mainMapChild.viewLayerOption.polygon.hide();
            this.$refs.mainMapChild.viewLayerOption.traffic.hide();
        },
        reload(){
            this.isRouterAlive = false;
            this.$nextTick( () => {
                this.isRouterAlive = true;
                this.resetMap();
            })
        },
        go_home(){
            window.location.href= 'http://peking.caupdcloud.com/';
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
.logo{
    width: 180px;
    height: 70px;
    margin: 30px auto;
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
.logo_icon{
    margin: 15px 15px;
}
.title{
    margin-top: 3%;
    font-size: 22px;
}
.nav{
    display: table;
    height: 100%;
}
.nav .nav_item {
    display: table-cell;
    height: 100%;
    padding: 0 30px;
    vertical-align: middle;
    font-size: 18px;
    color: #000;
    cursor: pointer;
}
.nav .nav_item:hover{
	color: #fff;
}
.footer {
    position: relative;
    height: 8%;
    border-top: 3px solid #f0b33c;
    /* background: url(../images/logo-bottom.png) 20px center no-repeat; */
    box-sizing: border-box;
}
.footer img{
    margin: 0.7% 50px;
}
.about_us{
	position: absolute;
	right: 150px;
	top: 50%;
	width: 120px;
	height: 26px;
	line-height: 26px;
	margin-top: -13px;
	text-align: center;
	font-size: 14px;
	border: 1px solid #666;
    color: #666;
}
.about_us:hover{
	border: 1px solid #f0b33c;
	color: #f0b33c;
}
.user_access{
	position: absolute;
	right: 10px;
	bottom: 10px;
	color: #666;
	font-size: 14px;
}
</style>