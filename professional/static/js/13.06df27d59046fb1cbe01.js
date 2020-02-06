webpackJsonp([13],{DCH9:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("Dd8w"),n=i.n(a),r={name:"LineAreaChart",props:{lineAreaChartOption:{type:Object,default:function(){}}},data:function(){return{lineChartOption:this.lineAreaChartOption}},watch:{"lineAreaChartOption.line_name":function(t){t&&(this.lineAreaChartOption=this.$props.lineAreaChartOption,this.load_bar_stack_chart(),console.log(this.lineAreaChartOption))}},mounted:function(){this.load_bar_stack_chart()},methods:{load_bar_stack_chart:function(){var t=echarts.init(document.getElementById(this.lineChartOption.id)),e={color:this.$Basice.colors,title:n()({text:this.lineChartOption.title},this.$Basice.echart_title),tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},grid:this.$Basice.grid,xAxis:{type:"category",data:this.lineChartOption.xAxis_data,axisLabel:n()({},this.$Basice.coordinate_axis_style.axisLabel,{formatter:function(t){return t.split("").join("\n")}}),axisLine:this.$Basice.coordinate_axis_style.axisLine,splitLine:this.$Basice.coordinate_axis_style.splitLine},yAxis:n()({type:"value",name:"数量"},this.$Basice.coordinate_axis_style),series:[{name:this.lineChartOption.line_name,type:"line",stack:"a",barCategoryGap:5,data:this.lineChartOption.line_series_data}]};t.setOption(e,!0),window.onresize=function(){t.resize()}}}},s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"h_100"},[e("div",{staticClass:"h_100",attrs:{id:this.lineChartOption.id}})])},staticRenderFns:[]};var o={components:{LineAreaChart:i("VU/8")(r,s,!1,function(t){i("OLwP")},"data-v-4fc8453c",null).exports},data:function(){return{mainMapLayer:this.$parent.mapLayerOption.base,timelineHeatLayer:this.$parent.viewLayerOption.timelineHeat,polygonLayer:this.$parent.viewLayerOption.polygon,currentTime:"00:00",time_line_data:[{time:"00:00",time_point:!0,current_time_point:!1},{time:"01:00",time_point:!0,current_time_point:!1},{time:"02:00",time_point:!0,current_time_point:!1},{time:"03:00",time_point:!0,current_time_point:!1},{time:"04:00",time_point:!0,current_time_point:!1},{time:"05:00",time_point:!0,current_time_point:!1},{time:"06:00",time_point:!0,current_time_point:!1},{time:"07:00",time_point:!0,current_time_point:!1},{time:"08:00",time_point:!0,current_time_point:!1},{time:"09:00",time_point:!0,current_time_point:!1},{time:"10:00",time_point:!0,current_time_point:!1},{time:"11:00",time_point:!0,current_time_point:!1},{time:"12:00",time_point:!0,current_time_point:!1},{time:"13:00",time_point:!0,current_time_point:!1},{time:"14:00",time_point:!0,current_time_point:!1},{time:"15:00",time_point:!0,current_time_point:!1},{time:"16:00",time_point:!0,current_time_point:!1},{time:"17:00",time_point:!0,current_time_point:!1},{time:"18:00",time_point:!0,current_time_point:!1},{time:"19:00",time_point:!0,current_time_point:!1},{time:"20:00",time_point:!0,current_time_point:!1},{time:"21:00",time_point:!0,current_time_point:!1},{time:"22:00",time_point:!0,current_time_point:!1},{time:"23:00",time_point:!0,current_time_point:!1}],street_names:[],legend_data:["居住人口就业地","就业人口居住地"],office_residence_ratio_data:[],line_chart_data:{"居住人口就业地":[],"就业人口居住地":[]},chartOption_1:{isSuccess:!1,id:"line_area_chart_content_1",title:"01:00 ~ 12:00时人流量变化",line_name:"崇文门外商圈",xAxis_data:["01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00"],line_series_data:[]},chartOption_2:{isSuccess:!1,id:"line_area_chart_content_2",title:"13:00 ~ 24:00时人流量变化",line_name:"崇文门外商圈",xAxis_data:["13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","11:00","22:00","23:00","24:00"],line_series_data:[]}}},computed:{},watch:{},mounted:function(){var t=this;this.get_statistics_chart_data(),this.get_people_activities_layer(),this.load_vitality_important_area_layer(),this.time_line_data.filter(function(e){return e.time===t.currentTime})[0].current_time_point=!0;var e=0;this.$Basice.timer=setInterval(function(){e++,t.currentTime=t.time_line_data[e].time,t.time_line_data.forEach(function(t){t.current_time_point=!1}),t.time_line_data.filter(function(e){return e.time===t.currentTime})[0].current_time_point=!0,t.get_people_activities_layer(),23===e&&(e=0)},5e3)},methods:{get_people_activities_layer:function(){var t=this;this.http.getLocalhostJson("/static/json/monitor/people_activities.csv",function(e){var i=t;t.timelineHeatLayer.setData(e,{value:function(t){if(t){var e=t[i.currentTime];return e}},lnglat:function(t){if(t.value){var e=t.value,i=wgs84togcj02(e.LON,e.LAT);return i}},type:"csv"}),t.timelineHeatLayer.setOptions({style:{radius:18,color:{.1:"#2892C6",.2:"#81B3AA",.3:"#BFD38B",.4:"#FAFA64",.5:"#FCB344",.7:"#FD0100",1:"#A80000"}}}),t.timelineHeatLayer.render(),t.timelineHeatLayer.show()})},load_vitality_important_area_layer:function(){var t=this,e=this;this.http.getLocalhostJson("/static/json/monitor/important_culture_area_border_data.json",function(i){t.polygonLayer.setData(i,{lnglat:"lnglat"}),t.polygonLayer.setOptions({style:{color:function(t){var i=t.value.properties.type,a=e.$Basice.chromatic_gradient,n="";switch(i){case"音乐":n=a[1];break;case i>.51&&i<.8:n=a[2];break;case i>.81&&i<1:n=a[3];break;case i>1.01&&i<1.2:n=a[4];break;case i>1.21&&i<1.4:n=a[5];break;case i>1.41&&i<1.6:n=a[6];break;case i>1.61&&i<2.24:n=a[7];break;default:n=a[7]}return n}}}),t.polygonLayer.render(),t.polygonLayer.show(),t.polygonLayer.on("click",function(t){var i=t.rawData.properties.name;e.chartOption_1.line_name=i,e.chartOption_2.line_name=i,e.get_view_data(i)})})},get_timeline:function(){var t=echarts.init(document.getElementById("timeline")),e={timeline:{left:10,right:10,bottom:10,axisType:"category",autoPlay:!0,playInterval:5e3,controlStyle:{position:"right",showNextBtn:!1,showPrevBtn:!1,itemGap:20,color:"#F0B33C",borderColor:"#F0B33C"},data:this.time_line_data,checkpointStyle:{symbolSize:16,color:"#F0B33C"},lineStyle:{color:"#F0B33C"},label:{color:"#fff",lineHeight:30}}};t.setOption(e,!0);var i=this;console.log(window),t.off("timelinechanged"),t.on("timelinechanged",function(t){console.log(t),i.currentTime=i.time_line_data[t.currentIndex],i.get_people_activities_layer()})},get_statistics_chart_data:function(){var t=this;this.http.get("vitality/getPopulationVitality",{},function(e){if(e.success){var i=JSON.parse(Decrypt(e.data.results.resultKey));t.visitors_flow_rate_data=i,t.get_view_data(t.chartOption_1.line_name)}})},get_view_data:function(t){this.chartOption_1.isSuccess=!1,this.chartOption_2.isSuccess=!1;for(var e=this.visitors_flow_rate_data.filter(function(e){return e.keyArea===t}),i=[],a=[],n=0;n<24;n++)1<=n&&n<=12?i.push(e[0]["sumPeop"+n]):13<=n&&n<=23&&a.push(e[0]["sumPeop"+n]);a.push(e[0].sumPeop0),this.chartOption_1={isSuccess:!0,id:"line_area_chart_content_1",title:"01:00 ~ 12:00时人流量变化",line_name:t,xAxis_data:["01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00"],line_series_data:i},this.chartOption_2={isSuccess:!0,id:"line_area_chart_content_2",title:"13:00 ~ 24:00时人流量变化",line_name:t,xAxis_data:["13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","11:00","22:00","23:00","24:00"],line_series_data:a},this.load_line_chart(this.chartOption_1),this.load_line_chart(this.chartOption_2)},load_line_chart:function(t){var e=echarts.init(document.getElementById(t.id)),i={color:this.$Basice.colors,title:n()({text:t.line_name+t.title},this.$Basice.echart_title),tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},grid:n()({},this.$Basice.grid,{left:60}),xAxis:{type:"category",data:t.xAxis_data,axisLabel:n()({},this.$Basice.coordinate_axis_style.axisLabel,{formatter:function(t){return t.split("").join("\n")}}),axisLine:this.$Basice.coordinate_axis_style.axisLine,splitLine:this.$Basice.coordinate_axis_style.splitLine},yAxis:n()({type:"value",name:"数量"},this.$Basice.coordinate_axis_style),series:[{name:t.line_name,type:"line",stack:"a",barCategoryGap:5,data:t.line_series_data}]};e.setOption(i,!0),window.onresize=function(){e.resize()}}},created:function(){}},_={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"main_content"},[i("div",{staticClass:"echarts_content animated fadeInRight"},[i("div",{staticClass:"echarts_content_sub"},[i("div",{staticClass:"chart_content_box"},[i("div",{staticClass:"h_100",attrs:{id:this.chartOption_1.id}})]),t._v(" "),i("div",{staticClass:"chart_content_box"},[i("div",{staticClass:"h_100",attrs:{id:this.chartOption_2.id}})])])]),t._v(" "),i("div",{staticClass:"timeline",attrs:{id:"timeline"}},[i("a-row",t._l(t.time_line_data,function(e,a){return i("a-col",{key:a,attrs:{span:1}},[i("p",{staticClass:"time_line_style"},[i("span",{class:{time_point:e.time_point,current_time_point:e.current_time_point}})]),t._v("\n                "+t._s(e.time)+"\n            ")])}),1)],1)])},staticRenderFns:[]};var c=i("VU/8")(o,_,!1,function(t){i("cqux")},"data-v-0382a68b",null);e.default=c.exports},OLwP:function(t,e){},cqux:function(t,e){}});