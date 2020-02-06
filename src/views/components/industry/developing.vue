<!-- 产业发展 -->
<template>
    <div class="main_content">
        <div class="layer_content">
            <a-select style="width: 200px" v-model="current_enterprise_type" placeholder="请选择服务类型" allowClear @change="onChangeLayer">
                <a-select-option v-for="(item, index) in company_data" :value="item.type" :key="index">{{ item.type }}</a-select-option>
            </a-select>
        </div>
        <div class="map_legend chromatic_gradient_map_legend">
             <a-row>
                <a-col :span="24" class="chromatic_gradient">
                    <span></span>&nbsp;&nbsp;1&nbsp;-&nbsp;10
                </a-col>
                <a-col :span="24" class="mt_10 chromatic_gradient">
                    <span></span>&nbsp;&nbsp;11&nbsp;-&nbsp;20
                </a-col>
                <a-col :span="24" class="mt_10 chromatic_gradient">
                    <span></span>&nbsp;&nbsp;21&nbsp;-&nbsp;30
                </a-col>
                <a-col :span="24" class="mt_10 chromatic_gradient">
                    <span></span>&nbsp;&nbsp;31&nbsp;-&nbsp;40
                </a-col>
                <a-col :span="24" class="mt_10 chromatic_gradient">
                    <span></span>&nbsp;&nbsp;41&nbsp;-&nbsp;50
                </a-col>
                <a-col :span="24" class="mt_10 chromatic_gradient">
                    <span></span>&nbsp;&nbsp;51&nbsp;-&nbsp;100
                </a-col>
                <a-col :span="24" class="mt_10 chromatic_gradient">
                    <span></span>&nbsp;&nbsp;101&nbsp;-&nbsp;200
                </a-col>
                <a-col :span="24" class="mt_10 chromatic_gradient">
                    <span></span>&nbsp;&nbsp;200以上
                </a-col>
            </a-row>
        </div>
        <div class="echarts_content animated fadeInRight">
            <div class="echarts_content_sub">
                <div class="chart_content_box">
                    <div id="industrial_development_pie_content" class="h_100"></div>
                </div>
                <div class="chart_content_box">
                    <div id="ranking_list_content" class="h_100">
                        <div class="ml_15 mb_10 ft_16"><span class="main_c">[ {{ current_enterprise_type }} ]</span> 的企业数量和资本看板</div>
                        <div class="ranking_list">
                            <div class="ranking_list_overflow">
                                <a-row class="ranking_item" v-for=" (value , key, index) in ranking_list_data" :key="index">
                                    <a-col :span="6" :offset="1">{{ key }}</a-col>
                                    <a-col :span="5">{{ value[0] }}</a-col>
                                    <a-col :span="12">{{ value[1] }}</a-col>
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
            polygonLayer: this.$parent.viewLayerOption.polygon,
            markers:[],
            company_total: 0,
            pie_chart_data: [],
            current_enterprise_type : "",
            street_names: [],
            format_street_names:{
                andingmen: "安定门",
                beixinqiao: "北新桥",
                chaoyangmen: "朝阳门",
                chongwenmenwai: "崇文门外",
                donghuamen: "东华门",
                donghuashi: "东花市",
                dongsi: "东四",
                dongzhimen: "东直门",
                hepingli: "和平里",
                jianguomen: "建国门",
                jiaodaokou: "交道口",
                jingshan: "景山",
                longtan: "龙潭",
                qianmen: "前门",
                tiantan: "天坛",
                tiyugan: "体育馆",
                yongdingmenwai: "永定门外",
            },
            registered_capital_data: [],
            company_data: [],
            ranking_list_data: {},
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        this.get_company_data();
    },
    methods: {
        onChangeLayer(value){//改变图层
            this.current_enterprise_type = value? value: this.pie_chart_data[0].name;
            this.get_community_enterprise();
        },
        get_industry_developing_compamy_layer(){//产业发展公司
            var _this = this;
            this.http.getLocalhostJson("/static/json/street_boundary_data.json", res =>{
                var data = [];
                res.forEach(item => {
                    item.properties.value = this.ranking_list_data[item.properties.name.split("街道")[0]][0];
                    data.push(item);
                });
                this.polygonLayer.setData(data,{lnglat: 'lnglat'});
                this.polygonLayer.setOptions({
                    style: {
                        opacity: 0.5,
                        color: function (item) {
                            var value = item.value.properties.value*1;
                            var colors = _this.$Basice.chromatic_gradient;
                            var color = "";
                            switch (true){
                                case (value >= 1 && value <= 10) :
                                    color = colors[0];
                                    break;
                                case (value > 10 && value <= 20) :
                                    color = colors[1];
                                    break;
                                case (value > 20 && value <= 30) :
                                    color = colors[2];
                                    break;
                                case (value > 30 && value <= 40) :
                                    color = colors[3];
                                    break;
                                case (value > 40 && value <= 50) :
                                    color = colors[4];
                                    break;
                                case (value > 50 && value <= 100) :
                                    color = colors[5];
                                    break;
                                case (value > 100 && value <= 200) :
                                    color = colors[6];
                                    break;
                                case (value > 200) :
                                    color = colors[7];
                                    break;
                            }
                            return color;
                        },
                    }
                });
                this.polygonLayer.render();
                this.polygonLayer.show();
            })
        },
        get_company_data(){
            this.http.get("Enterprise/getCommpanyNumber", {}, res =>{//获取企业数量
                if(res.success){
                    var data  = JSON.parse(Decrypt(res.data.results.key));
                    this.company_data = data;
                    this.http.get("Enterprise/getCommpanyRegister", {}, res =>{//获取企业注册资金
                        if(res.success){
                            var register_data  = JSON.parse(Decrypt(res.data.results.key));
                            this.registered_capital_data = register_data;
                            this.get_view_data(data);
                        }
                    })
                }
            })
        },
        get_community_enterprise(){//根据类型查询各街道看板
            const filter_number_data = this.company_data.filter( (item) => {
                return item.type === this.current_enterprise_type;
            })
            const filter_register_data = this.registered_capital_data.filter( (item) => {
                return item.type === this.current_enterprise_type;
            })
            for(var key in filter_number_data[0]){
                if(key !== "type" && key !== "id" && key !== "total"){
                    this.ranking_list_data[this.format_street_names[key]] = [ filter_number_data[0][key] , filter_register_data[0][key]];
                }
            }
            this.get_industry_developing_compamy_layer();
        },
        get_view_data(result_data){
            for(var i = 0; i < result_data.length; i++){
                var item = result_data[i];
                this.company_total += item.total * 1;
                this.pie_chart_data.push({
                    name: item.type,
                    value: item.total * 1,
                });
            }
            this.current_enterprise_type = this.pie_chart_data[0].name;
            this.get_community_enterprise();
            this.load_industrial_development_pie_chart();
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
                    var str=  parms.seriesName+"</br>"+parms.data.name+"</br>"+
                        "数量："+ parms.data.value+"</br>"+
                        "占比："+ parms.percent+"%";
                        return  str ;
                    }
                },
                legend: {
                    type:"scroll",
                    orient: 'vertical',
                    right:'5%',
                    align:'left',
                    top:'middle',
                    textStyle: {
                        color:'#8C8C8C'
                    },
                    height:200,
                    pageIconColor:"#f0b33c",
                    pageIconInactiveColor:"#2f4554",
                    formatter: function (name) {
                        return name.slice(0, 3)+"...";
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
                                    return parms.data.name.slice(0, 3)+"..."
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                            show: true,
                            length:10,
                            length2:5,
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
            const _this = this;
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
                _this.current_enterprise_type = event.name;
                _this.get_community_enterprise();
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