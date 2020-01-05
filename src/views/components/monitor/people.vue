<!-- 人流量监测 -->
<template>
    <div class="main_content">
        <div class="echarts_content">
            <div class="echarts_content_sub">
                
            </div>
        </div>
        <div id="timeline" class="timeline">
        </div>
    </div>
</template>

<script>

export default {
    components: {},
    data() {
        return {
            mainMapLayer: this.$parent.mapLayerOption.base,
            heatLayer: this.$parent.viewLayerOption.heat,
            time_line_data: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00",
                "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
                "16:00", "17:00", "18:00", "19:00", "20:00", "11:00", "22:00", "23:00"],
            currentTime: "00:00",
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.get_people_activities_layer();
        this.get_timeline();
    },
    methods: {
        get_people_activities_layer(){//人口活动热力图层
            this.http.getLocalhostJson("../../../../static/json/monitor/people_activities.csv", res =>{
                var _this = this;
                this.heatLayer.setData(res, {
                    value: function (params) {
                        if (params) {
                            var value = params[_this.currentTime];
                            return value;
                        }
                    },
                    // 或者使用回调函数构造经纬度坐标
                     lnglat: function (obj) {
                        if (obj.value) {
                             var value = obj.value;
                             var lnglat = wgs84togcj02(value['LON'], value['LAT']);
                             return lnglat;
                        }
                     },
                    // 指定数据类型
                    type: 'csv'
                });
                this.heatLayer.setOptions({
                    style: {
                        radius: 18,
                        color: {
                            0.1:"#2892C6",
                            0.2:"#81B3AA",
                            0.3: '#BFD38B',
                            0.4: '#FAFA64',
                            0.5: '#FCB344',
                            0.7: '#FD0100',
                            1:"#A80000",
                        },
                        // opacity:[0.3,0.7]
                    }
                });
                this.heatLayer.render();
                this.heatLayer.show();
            })
        },
        get_timeline(){//时间轴
            var option = {
                timeline: {
                    left:10,
                    right:10,
                    bottom:10,
                    axisType: 'category',
                    // realtime: false,
                    // loop: false,
                    autoPlay: true,
                    // currentIndex: 0,
                    playInterval: 3000,
                    controlStyle: {
                        position:"right",
                        showNextBtn: false,
                        showPrevBtn: false,
                        itemGap:20,
                        color:"#F0B33C",
                        borderColor:"#F0B33C",
                    },
                    data: this.time_line_data,
                    checkpointStyle:{
                        symbolSize:16,
                        color:"#F0B33C",
                    },
                    lineStyle:{
                        color:"#F0B33C",
                    },
                    label: {
                        color:"#fff",
                        lineHeight: 30,
                    }
                }
            };
            var timelineChart = echarts.init(document.getElementById("timeline"));
            timelineChart.setOption(option, true);
            var _this = this;
            timelineChart.on("timelinechanged", (params) => {
                _this.currentTime = _this.time_line_data[params.currentIndex];
                _this.get_people_activities_layer();
            })
        }
    },
    created() {},
}
</script>
<style lang='less' scoped>

</style>