webpackJsonp([21],{"3T7P":function(e,t){},zqAj:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={render:function(){var e=this.$createElement;return(this._self._c||e)("div")},staticRenderFns:[]};var r=a("VU/8")({components:{},data:function(){return{mainMapLayer:this.$parent.mapLayerOption.base,heatLayer:this.$parent.viewLayerOption.heat,polygonLayer:this.$parent.viewLayerOption.polygon,trafficLayer:this.$parent.viewLayerOption.traffic}},computed:{},watch:{},created:function(){this.heatLayer&&this.heatLayer.hide(),this.polygonLayer&&this.polygonLayer.hide(),this.trafficLayer&&this.get_real_time_traffic_layer()},methods:{get_real_time_traffic_layer:function(){this.trafficLayer.setMap(this.mainMapLayer),this.trafficLayer.show(),this.$message.info("每小时更新一次路况信息。",20)}},mounted:function(){}},i,!1,function(e){a("3T7P")},"data-v-133b2944",null);t.default=r.exports}});