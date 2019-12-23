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
                        <template>
                            <div>
                                <router-view v-if="isMap"></router-view>
                            </div>
                        </template>
                    </main-map>
                </a-row>
            </a-col>
        </a-row>
        <a-row class="h_8 footer">
            <a-col :span="24">底部</a-col>
        </a-row>
    </div>
</template>

<script>
import SideNav from "./components/SideNav"
import MainMap from "./components/MainMap"
export default {
    components:{
        SideNav,
        MainMap
    },
    data () {
        return {
            isMap:"",
        };
    },
    computed: {
    },
    watch: { 
        '$route.path':function(newVal,oldVal){
            if(newVal){
                this.resetMap();//重置地图
            }
        }
    },
    mounted(){
        this.isMap = this.$refs.mainMapChild.base_map;
        // console.log(this.$refs.mainMapChild.base_map)
        // this.http.get(this.ports.homePage.hotLine, res => {
        //     console.log(res)
        // })
    }, 
    methods: {
        resetMap(){
            this.isMap.clearMap();
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