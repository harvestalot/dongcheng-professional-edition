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
                <a-row class="h_8 bgc_main po_r header">
                    <a-col :span="1">
                        <div class="pointer logo_icon">
                            <img src="../../static/img/logo_icon.png" @click="go_home">
                        </div>
                    </a-col>
                    <a-col :span="6">
                        <h1 class="title">东城区街区更新平台专业版</h1>
                    </a-col>
                    <a-col :span="6" class="h_100">
                        <nav id="nav" class="nav">
                            <router-link :to="{ name: 'Home' }" class="nav_item"><a-badge status="default"/>首页</router-link>
                            <span class="nav_item" @click="introduction_visible = !introduction_visible"><a-badge status="default"/>平台简介</span>
                        </nav>
                    </a-col>
                    <!-- <div class="introduction"></div> -->
                </a-row>
                <a-row class="h_92 po_r">
                    <main-map ref="mainMapChild">
                        <template>
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
            <!-- <div class="user_access">
                <span>访问者总数：<span class="number">{{ views_number.user_views }}</span></span>&nbsp;&nbsp;
                <span>页面浏览总量：<span class="number">{{ views_number.total_user_number }}</span></span>
            </div> -->
        </a-row>
        <a-modal v-model="introduction_visible" centered :footer="null" width="70%">
            <div class="introduction_content">
                <h1 class="introduction_title">简介</h1>
                <p class="text_indent">东城区地处北京市中心城区的东部，东、北与朝阳区接壤，南与丰台区相连，西与西城区毗邻，东西最大距离5.2公里，南北最大距离13公里，总面积41.84平方公里。2018年，东城区下辖17个街道，常住人口82.2万人，是北京文物古迹最为集中的区域。辖区内拥有国家级文物保护单位16处，占北京市的37%；市级文物保护单位60处，占全市的24%；区级文物保护单位57处。东城区历史街区有18.5片，面积达10.35平方公里，占全区总面积的1/4，是全市历史文化街区最多的地区。</p>
                <p class="text_indent">本系统是对东城区街区更新的专业化解读。</p>
            </div>
          
        </a-modal>
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
            introduction_visible: false,
            views_number : {
                user_views: 0,
                total_user_number: 0
            }
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
            this.get_page_views();
            document.getElementById("views").style.overflow = "hidden";
            if(this.$route.name === "Home" || this.$route.name === "RoadConditionTraffic"){
                document.getElementById("map_tool").style.right = "5px";
                document.getElementById("land_legend_content").style.right = "5px";
            }else{
                document.getElementById("map_tool").style.right = "25.5%";
                document.getElementById("land_legend_content").style.right = "25.5%";
            }
            window.clearInterval(this.$Basice.timer);
            this.$refs.mainMapChild.mapLayerOption.base.clearMap();//重置地图
            this.$refs.mainMapChild.viewLayerOption.heat.hide();
            this.$refs.mainMapChild.viewLayerOption.timelineHeat.hide();
            this.$refs.mainMapChild.viewLayerOption.polygon.hide();
            this.$refs.mainMapChild.viewLayerOption.traffic.hide();
            this.$refs.mainMapChild.toolOption.tool_checked = ["street"];
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
        },
        get_page_views(){
            this.http.getViews({ data:  { userIp: returnCitySN["cip"] } }, res =>{
                if(res.resultCode === "10000"){
                    var data = JSON.parse(Decrypt(res.data.resultKey));
                    this.views_number = {
                        user_views: data.USER_NUMBER,
                        total_user_number: data.VIEW_NUMBER
                    }
                }
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
	right: 50px;
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
    top: 50%;
    right: 300px;
    margin-top: -10px;
	color: #666;
	font-size: 14px;
}
.user_access .number{
    font-size: 16px;
    color: #f0b33c;
}
</style>
<style >
.nav .ant-badge-status-default{
    width: 8px;
    height: 8px;
    background-color: #000;
}
</style>