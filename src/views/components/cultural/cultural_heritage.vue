<!-- 物质文化遗产 -->
<template>
    <div class="main_content">
        <div class="echarts_content animated fadeInRight">
            <div class="echarts_content_sub">
                <div class="chart_content_box">
                    <div id="cultural_relic_coverage_chart_content" class="h_100"></div>
                </div>
                <div class="chart_content_box">
                    <div id="cultural_relic_chart_content" class="h_100"></div>
                </div>
            </div>
        </div>
        <div class="map_legend">
             <a-row>
                <a-col :span="12">
                    <img src="../../../../static/img/cultural/wenhuayichan.png" alt="">
                    &nbsp;国家级
                </a-col>
                <a-col :span="12">
                    <img src="../../../../static/img/cultural/wenhuayichan_1.png" alt="">
                    &nbsp;市级
                </a-col>
                <a-col :span="12" class="mt_10">
                    <img src="../../../../static/img/cultural/wenhuayichan_2.png" alt="">
                    &nbsp;区级
                </a-col>
                <a-col :span="12" class="mt_10">
                    <img src="../../../../static/img/cultural/wenhuayichan_3.png" alt="">
                    &nbsp;其他
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>

export default {
    components: {},
    data() {
        return {
            mainMapLayer: this.$parent.mapLayerOption.base,
            markers:[],
            level_data:[],
            years_ring_data:[],
            level_data_total: 0,
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.get_statistics_chart_data();
        this.get_cultural_heritage_layer();
    },
    methods: {
        get_cultural_heritage_layer(){//文化遗产
            this.http.getLocalhostJson("/static/json/cultural/tangible_cultural_heritage.json", res =>{
                for(var i = 0; i < res.length; i++){
                    var item = res[i];
                    var marker = new AMap.Marker({
                            map: this.mainMapLayer,
                            icon: new AMap.Icon({
                                size: new AMap.Size(16, 16),
                                image: this.$Basice.icon_url + "/static/img/cultural/"+
                                    (item.protection_class === '全国重点文物保护单位'?'wenhuayichan':
                                    (item.protection_class === '市级文物保护单位'?'wenhuayichan_1':
                                    (item.protection_class === '区级文物保护单位'?'wenhuayichan_2':'wenhuayichan_3')))+".png",
                                imageOffset: new AMap.Pixel(0, 0),
                                imageSize: new AMap.Size(-8, -8)
                            }),
                            position: item.lnglat,
                            offset: new AMap.Pixel(-10, -10),
                            extData:item.properties
                        });
                        this.markers.push(marker);
                }
            })
        },
        get_statistics_chart_data(){//获取统计图表数据
            this.http.get("culturaheritage/getCoverageByLevels", {}, res =>{//按等级
                if(res.success){
                    var data  = JSON.parse(Decrypt(res.data.results.key));
                    this.level_data_total = data.totalNumber;
                    this.get_view_data(data);
                    // for(var i = 0; i < data.list.length; i++){
                    //     var item = data.list[i];
                    //     this.data[item.LEVELS] = item.TOTAL;
                    //     this.legend_data.push(item.LEVELS);
                    //     this.level_data.push(item.TOTAL);
                    // }
                    this.load_three_quarters_pie_chart();
                }
            })
            this.http.get("culturaheritage/getCoverageByYears", {}, res =>{//按年代
                if(res.success){
                    var data = JSON.parse(Decrypt(res.data.results.key)).list;
                    data.forEach( (item) => {
                        this.years_ring_data.push({
                            name: item.YEARS,
                            value: item.TOTAL,
                        }) ;
                    })
                    this.load_years_pie_chart();
                }
            })
        },
        get_view_data (result_data){
            this.level_data.push({
                name:result_data.list[2].LEVELS,
                value:result_data.list[2].TOTAL
            });
            this.level_data.push({
                name:result_data.list[3].LEVELS,
                value:result_data.list[3].TOTAL
            });
            this.level_data.push({
                name:result_data.list[1].LEVELS,
                value:result_data.list[1].TOTAL
            });
            this.level_data.push({
                name:result_data.list[0].LEVELS,
                value:result_data.list[0].TOTAL
            });
            // for(var i = 0; i < result_data.list.length; i++){
            //     this.level_data.push({
            //         name:result_data.list[i].LEVELS,
            //         value:result_data.list[i].TOTAL
            //     })
            // }
        },
        load_three_quarters_pie_chart(){//物质文化遗产(按保护等级)
            var three_quarters_pie_chart = echarts.init(document.getElementById("cultural_relic_coverage_chart_content"));
            var data = this.level_data;
            var arrName = getArrayValue(data, "name");
            var arrValue = getArrayValue(data, "value");
            var sumValue = this.level_data_total;
            var objData = array2obj(data, "name");
            var optionData = getData(data)
            function getArrayValue(array, key) {
                var key = key || "value";
                var res = [];
                if (array) {
                    array.forEach(function(t) {
                        res.push(t[key]);
                    });
                }
                return res;
            }

            function array2obj(array,key) {
                var resObj = {};
                for(var i=0;i<array.length;i++){
                    resObj[array[i][key]] = array[i];
                }
                return resObj;
            }

            function getData(data) {
                var res = {
                    series: [],
                    yAxis: []
                };
                for (let i = 0; i < data.length; i++) {
                    // console.log([70 - i * 15 + '%', 67 - i * 15 + '%']);
                    res.series.push({
                        name: '',
                        type: 'pie',
                        clockWise: false, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        radius: [68 - i * 15 + '%', 63 - i * 15 + '%'],
                        center: ["35%", "55%"],
                        label: {
                            show: false
                        },
                        itemStyle: {
                            label: {
                                show: false,
                            },
                            labelLine: {
                                show: false
                            },
                            borderWidth: 5,
                        },
                        data: [{
                            value: data[i].value,
                            name: data[i].name
                        }, {
                            value: sumValue - data[i].value,
                            name: '',
                            itemStyle: {
                                color: "rgba(0,0,0,0)",
                                borderWidth: 0
                            },
                            tooltip: {
                                show: false
                            },
                            hoverAnimation: false
                        }]
                    });
                    res.series.push({
                        name: '',
                        type: 'pie',
                        silent: true,
                        z: 1,
                        clockWise: false, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        radius: [68 - i * 15 + '%', 63 - i * 15 + '%'],
                        center: ["35%", "55%"],
                        label: {
                            show: false
                        },
                        itemStyle: {
                            label: {
                                show: false,
                            },
                            labelLine: {
                                show: false
                            },
                            borderWidth: 5,
                        },
                        data: [{
                            value: 7.5,
                            itemStyle: {
                                color: "#999",
                                borderWidth: 0
                            },
                            tooltip: {
                                show: false
                            },
                            hoverAnimation: false
                        }, {
                            value: 2.5,
                            name: '',
                            itemStyle: {
                                color: "rgba(0,0,0,0)",
                                borderWidth: 0
                            },
                            tooltip: {
                                show: false
                            },
                            hoverAnimation: false
                        }]
                    });
                    res.yAxis.push((data[i].value / sumValue * 100).toFixed(2) + "%");
                }
                return res;
            }

            var three_quarters_pie_option = {
                color: this.$Basice.colors,
                title:{ ...{
                    text: "物质文化遗产(按保护等级)",
                }, ...this.$Basice.echart_title},
                legend: {
                    show: true,
                    icon:"circle",
                    top: "center",
                    right: '5%',
                    data: arrName,
                    width:50,
                    itemGap: 20,
                    formatter: function(name) {
                        return "{title|" + name.slice(0,4) + "}\n{value|" + (objData[name].value) +"}  {title|个}"
                    },
                    textStyle: {
                        rich: {
                            title: {
                                fontSize: 16,
                                lineHeight: 15,
                                color: "rgb(0, 178, 246)"
                            },
                            value: {
                                fontSize: 18,
                                lineHeight: 20,
                                color: "#222"
                            }
                        }
                    },
                },
                tooltip: {
                    show: true,
                    trigger: "item",
                    formatter: "{a}<br>{b}:{c}({d}%)"
                },
                grid: {
                    top: '18%',
                    bottom: '50%',
                    left: "35%",
                    containLabel: false
                },
                yAxis: [{
                    type: 'category',
                    inverse: true,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        interval: 0,
                        inside: true,
                        textStyle: {
                            color: "#222",
                            fontSize: 16,
                        },
                        show: true
                    },
                    data:  optionData.yAxis
                }],
                xAxis: [{
                    show: false
                }],
                series: optionData.series
            };
            three_quarters_pie_chart.setOption(three_quarters_pie_option, true);
            window.onresize = function(){
                three_quarters_pie_chart.resize();
            }
        },
        load_years_pie_chart(){//按年代统计饼状图
            var myChart = echarts.init(document.getElementById("cultural_relic_chart_content"));
            // var dataStyle = {
            //     normal: {
            //         label: {
            //             show: false
            //         },
            //         labelLine: {
            //             show: false
            //         },
            //         shadowBlur: 0,
            //         shadowColor: '#203665'
            //     }
            // };
            // var option = {
            //     title:{ ...{
            //         text: "物质文化遗产(按年代)",
            //     }, ...this.$Basice.echart_title},
            //     series: []
            // };
            // for(var i = 0; i < this.years_ring_data.length; i++){
            //     var item = this.years_ring_data[i];
            //     option.series.push({
            //         name: item.YEARS,
            //         type: 'pie',
            //         clockWise: false,
            //         radius: [50, 60],
            //         itemStyle: dataStyle,
            //         hoverAnimation: false,
            //         center: ( i === 0? ['25%', '75%']:
            //             (i === 1? ['25%', '30%']:['75%', '30%'])),
            //         data: [
            //         {
            //             value: item.TOTAL,
            //             label: {
            //                 normal: {
            //                     rich: {
            //                         a: {
            //                             color: '#3a7ad5',
            //                             align: 'center',
            //                             fontSize: 20,
            //                             fontWeight: "bold"
            //                         },
            //                         b: {
            //                             color: '#222',
            //                             align: 'center',
            //                             fontSize: 16
            //                         }
            //                     },
            //                     formatter: function(params){
            //                         var formatter_str = "";
            //                         if(params.seriesName === "其他"){
            //                             formatter_str = "{b|其他}\n\n"+"{a|"+params.value+"个}";
            //                         }else if(params.seriesName === "明"){
            //                             formatter_str = "{b|明}\n\n"+"{a|"+params.value+"个}";
            //                         }else if(params.seriesName === "清"){
            //                             formatter_str = "{b|清}\n\n"+"{a|"+params.value+"个}";
            //                         }else if(params.seriesName === "民国"){
            //                             formatter_str = "{b|民国}\n\n"+"{a|"+params.value+"个}";
            //                         }
            //                         return formatter_str;
            //                     },
            //                     position: 'center',
            //                     show: true,
            //                     textStyle: {
            //                         fontSize: '14',
            //                         fontWeight: 'normal',
            //                         color: '#222'
            //                     }
            //                 }
            //             },
            //             itemStyle: {
            //                 normal: {
            //                     color: '#2c6cc4',
            //                     shadowColor: '#2c6cc4',
            //                     shadowBlur: 0
            //                 }
            //             }
            //         }, {
            //             value: this.level_data_total,
            //             name: 'invisible',
            //             itemStyle: {
            //                 normal: {
            //                     color: '#eaeaea'
            //                 },
            //                 emphasis: {
            //                     color: '#eaeaea'
            //                 }
            //             }
            //         }]
            //     });
            // }
            const _this = this;
            var scale = 1;
            var rich = {
                yellow: {
                    color: "#ffc72b",
                    fontSize: 20 * scale,
                    padding: [5, 4],
                    align: 'center'
                },
                total: {
                    color: "#ffc72b",
                    fontSize: 30 * scale,
                    align: 'center'
                },
                white: {
                    color: "#fff",
                    align: 'center',
                    fontSize: 14 * scale,
                    padding: [21, 0]
                },
                name: {
                    color: "#F0B33C",
                    align: 'center',
                    fontSize: 12 * scale,
                },
                blue: {
                    color: '#49dff0',
                    fontSize: 14 * scale,
                    align: 'center',
                },
                hr: {
                    borderColor: '#0b5263',
                    width: '100%',
                    borderWidth: 1,
                    height: 0,
                }
            }
            var option = {
                title: [{...{
                        text: "物质文化遗产(按年代)",
                    }, ...this.$Basice.echart_title
                },{
                    subtext: "总数",
                    left:'center',
                    top:'50%',
                    padding:[15,0],
                    subtextStyle:{
                        color:'#000',
                        fontSize:18*scale,
                        align:'center'
                    },
                }],
                legend: {
                    selectedMode:false,
                    formatter: function(name) {
                        var total = 0; //各科正确率总和
                        var averagePercent; //综合正确率
                        _this.years_ring_data.forEach(function(value, index, array) {
                            total += value.value;
                        });
                        return '{total|' + total + '}';
                    },
                    data: [_this.years_ring_data[0].name],
                    // data: ['高等教育学'],
                    // itemGap: 50,
                    left: 'center',
                    top: 'center',
                    icon: 'none',
                    align:'center',
                    textStyle: {
                        color: "#fff",
                        fontSize: 16 * scale,
                        rich: rich
                    },
                },
                series: [{
                    // name: '总考生数量',
                    type: 'pie',
                    radius: ['42%', '50%'],
                    // hoverAnimation: false,
                    clockwise : false,
                    color: this.$Basice.colors,
                    label: {
                        normal: {
                            formatter: function(params, ticket, callback) {
                                var total = 0; //考生总数量
                                var percent = 0; //考生占比
                                _this.years_ring_data.forEach(function(value, index, array) {
                                    total += value.value;
                                });
                                percent = ((params.value / total) * 100).toFixed(1);
                                // return '{name|' + params.name + '}\n{hr|}\n{yellow|' + params.value + '}\n{blue|' + percent + '%}';
                                return '{name|' + params.name + '：}{blue|' + params.value + '}';
                            },
                            rich: rich
                        },
                    },
                    labelLine: {
                        normal: {
                            length: 15 * scale,
                            length2: 10,
                            lineStyle: {
                                color: '#0b5263'
                            }
                        }
                    },
                    data: _this.years_ring_data
                }]
            };
            myChart.setOption(option, true);
            window.onresize = function(){
                myChart.resize();
            }
        }
    },
    created() {},
}
</script>
<style lang='less' scoped>

</style>