<!-- 文化活动监测 -->
<template>
    <div class="main_content">
        <div class="layer_content">
            <a-select style="width: 200px" defaultValue="全部" placeholder="请选择图层类型" allowClear @change="onChangeLayer">
                <a-select-option value="全部">全部</a-select-option>
                <a-select-option value="音乐">音乐</a-select-option>
                <a-select-option value="戏剧">戏剧</a-select-option>
                <a-select-option value="展览">展览</a-select-option>
                <a-select-option value="电影">电影</a-select-option>
                <a-select-option value="公益">公益</a-select-option>
                <a-select-option value="讲座">讲座</a-select-option>
                <a-select-option value="聚会">聚会</a-select-option>
                <a-select-option value="课程">课程</a-select-option>
                <a-select-option value="其他">其他</a-select-option>
            </a-select>
        </div>
        <div class="echarts_content animated fadeInRight">
            <div class="echarts_content_sub">
                <div class="chart_content_box">
                    <radar-chart v-if="chartOption.isSuccess" :radarChartOption="chartOption"></radar-chart>
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
            heatLayer: this.$parent.viewLayerOption.heat,
            layer_type_code:"全部",
            chartOption:{
                isSuccess:false,
                title_1:"各街道文化活动覆盖率对比图",
                street_name_data: [],
                radar_chart_indicator_data: [],
                lenged_data: ["音乐", "戏剧", "展览", "电影","公益", "讲座", "聚会", "课程", "其他"],
                legend_selected:{
                    '音乐': true,
                    '戏剧': false,
                    '展览': false,
                    '电影': false,
                    '公益': false,
                    '讲座': false,
                    '聚会': false,
                    '课程': false,
                    '其他': false,
                },
                pie_comprehensive_data: {
                    "音乐":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "戏剧":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "展览":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "电影":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "公益":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "讲座":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "聚会":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "课程":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "其他":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                },
            },
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.get_cultural_activities_coverage();
        this.get_cultural_activities_layer();
    },
    methods: {
        onChangeLayer(value){//改变图层
            this.layer_type_code = value;
            this.get_cultural_activities_layer();
        },
        get_cultural_activities_layer(){//文化活动图层
            this.http.getLocalhostJson("/static/json/monitor/culture_vitality_data.json", res =>{
                var data = [];
                if(this.layer_type_code !== "全部"){
                    data = res.filter( (item) => {
                        return item.type === this.layer_type_code;
                    });
                }else{
                    data = res;
                }
                this.heatLayer.setData(data, {
                    lnglat: "lnglat",
                });
                this.heatLayer.setOptions({
                    style: {
                        radius: 20,
                        color: {
                            0.1: '#9DB578',
                            0.3: '#EAC736',
                            0.6: '#E28B4A',
                            1: '#D94E5D',
                        },
                        opacity:[0.4,0.7]
                    }
                });
                this.heatLayer.render();
                this.heatLayer.show();
            })
        },
        get_cultural_activities_coverage(){//文化活动覆盖率
            this.http.get("vigour/getVigourList", { category: "convenient" }, res =>{
                if(res.success){
                    var data  = JSON.parse(Decrypt(res.data.results.resultKey));
                    this.get_view_data(data);
                }
            })
        },
        get_view_data(result_data){
            const lenged_english_data = {
                "music": "音乐",
                "theatre": "戏剧",
                "display": "展览",
                "film": "电影",
                "publicWelfare" : "公益",
                "lecture" : "讲座",
                "party" : "聚会",
                "curriculun" : "课程",
                "others" : "其他"
            };
            for(var i = 0; i < result_data.length; i++){
                var item = result_data[i];
                this.chartOption.street_name_data.push(item.streetName.replace("街道",""));
                this.chartOption.radar_chart_indicator_data.push({
                    name: item.streetName.replace("街道",""),
                    max:100,
                    color:'#222',
                    rotate:90
                })
                for(var key in lenged_english_data){
                    this.chartOption.pie_comprehensive_data[lenged_english_data[item[key]]][i] = item[key];
                }
                this.chartOption.isSuccess = true;
            }
        },
    },
    created() {},
}
</script>
<style lang='less' scoped>

</style>