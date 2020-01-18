<!-- 产业发展 -->
<template>
    <div class="main_content">
        <div class="echarts_content">
            <div class="echarts_content_sub">
                <div class="chart_content_box">
                    <div id="industrial_development_pie_content" class="h_100"></div>
                </div>
                <div class="chart_content_box">
                    <div id="ranking_list_content" class="h_100">
                        <div class="ml_15 mb_10 ft_16"><span class="main_c">[ {{ current_enterprise_type.split(" ")[1] }} ]</span> 的企业数量看板</div>
                        <div class="ranking_list">
                            <div class="ranking_list_overflow">
                                <a-row class="ranking_item" v-for=" i in 20" :key="i">
                                    <a-col :span="5" :offset="1">col-12</a-col>
                                    <a-col :span="18">col-12</a-col>
                                </a-row>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
            company_total: 0,
            pie_chart_data: [],
            current_enterprise_type : "",
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        this.get_company_data();
        this.get_industry_developing_compamy_layer();
    },
    methods: {
        get_industry_developing_compamy_layer(){//产业发展公司
            this.http.getLocalhostJson("../../../../static/json/publicSpace/Hutong_sanitation.json", res =>{
                for(var i = 0; i < res.length; i++){
                    var item = res[i];
                    var marker = new AMap.Marker({
                            map: this.mainMapLayer,
                            icon: new AMap.Icon({
                                size: new AMap.Size(16, 16),
                                image: "../../../../static/img/publicSpace/huishou.png",
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
        get_company_data(){
            this.http.get("Enterprise/getNumberByType", {}, res =>{
                if(res.success){
                    var data  = JSON.parse(Decrypt(res.data.results.resultKey));
                    this.get_view_data(data);
                }
            })
        },
        get_view_data(result_data){
            // var new_data = {
            //     九道湾: 0,
            //     小菊: 0,
            //     藏经馆: 0,
            //     草园: 0,
            //     青龙: 0,
            //     民安: 0,
            //     门楼: 0,
            //     海运仓: 0,
            //     北官厅: 0,
            //     十三条: 0,
            //     北新仓: 0,
            //     前永康: 0
            // };
            for(var i = 0; i < result_data.length; i++){
                var item = result_data[i];
                this.company_total += item.TOTAL_NYUMBER;
                this.pie_chart_data.push({
                    name: item.TYPE,
                    value: item.TOTAL_NYUMBER,
                });
            }
            this.current_enterprise_type = this.pie_chart_data[0].name;
            this.load_industrial_development_pie_chart();
            // for(var i = 0; i < result_data["九道湾"].length; i++){
            //     var item = result_data["九道湾"][i];
            //     this.spectaculars_list_data[item.COMMUNITY_NAME] = item.TOTAL_NUMBER;
            // }
        },
        load_industrial_development_pie_chart(){
            var pieChart = echarts.init(document.getElementById("industrial_development_pie_content"));
            var pie_option =  {
                color: this.$Basice.colors,
                title: [
                    { ...{
                        text:"街道各类企业占比数",
                    }, ...this.$Basice.echart_title},  
                    {
                        text: this.company_total,
                        subtext: '企业数量',
                        textStyle:{
                            fontSize:28,
                            color:"#f0b33c"
                        },
                        subtextStyle: {
                            fontSize: 16,
                            color: '#222'
                        },
                        textAlign:"center",
                        x: '34.5%',
                        y: '44%',
                    }
                ],
                tooltip: {
                    trigger: 'item',
                    formatter:function (parms){
                    var str=  parms.seriesName+"</br>"+
                        parms.marker+""+parms.data.name+"</br>"+
                        "数量："+ parms.data.value+"</br>"+
                        "占比："+ parms.percent+"%";
                        return  str ;
                    }
                },
                legend: {
                    type:"scroll",
                    orient: 'vertical',
                    right:'2%',
                    align:'left',
                    top:'middle',
                    textStyle: {
                        color:'#8C8C8C'
                    },
                    height:200,
                    pageIconColor:"#f0b33c",
                    pageIconInactiveColor:"#2f4554",
                    formatter: function (name) {
                        return name.split(" ")[1].slice(0, 3)+"...";
                    }
                },
                series: [
                    {
                        name:'企业',
                        type:'pie',
                        center: ['35%', '50%'],
                        radius: ['30%', '45%'],
                        clockwise: false, //饼图的扇区是否是顺时针排布
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: true,
                                position: 'outter',
                                formatter:function (parms){
                                    return parms.data.name.split(" ")[1].slice(0, 3)+"..."
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                            show: true,
                            length:5,
                            length2:3,
                            smooth:true,
                            }
                        },
                        data:this.pie_chart_data
                    }
                ]
            };
            pieChart.setOption(pie_option, true);
            pieChart.dispatchAction({
                type: 'pieSelect',
                seriesIndex:0,
                dataIndex:0
            }); 
            pieChart.dispatchAction({
                type: 'showTip',
                seriesIndex:0,
                dataIndex:0
            }); 
            pieChart.on("click",function(event){
                pieChart.dispatchAction({
                    type: 'pieUnSelect',
                    seriesIndex:0,
                    dataIndex:0
                }); 
                pieChart.dispatchAction({
                    type: 'hideTip',
                    seriesIndex:0,
                    dataIndex:0
                });
                this.current_enterprise_type = event.name;
                // this.get_community_enterprise();
            })
            window.onresize = function(){
                pieChart.resize();
            }
        }
    },
}
</script>
<style lang='less' scoped>
.ranking_list{
    height: 90%;
    margin: 0 30px 0 15px;
    font-size: 14px;
    overflow-y: auto;
    .ranking_list_overflow{
        width: 100%;
        overflow: hidden;
        .ranking_item{
            padding: 8px 0;
            margin-bottom: 10px;
            background-color: #85ccc8;
            .ant-col-5{
                color: #fff;
            }
            .ant-col-18{
                color: #e3583d;
            }
        }
        .ranking_item:nth-child(odd){
            background-color: #f0b33c;
        }
    }

}
</style>