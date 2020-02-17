<!-- 社区问题反馈 -->
<template>
    <div class="main_content">
        <div class="layer_content">
            <a-select style="width: 200px" placeholder="请选择舆情类型" allowClear @change="onChangeSocialPublicOpinion">
                <a-select-option :value="item.TYPE_BIG" v-for="item in social_public_opinion_type_data" :key="item.TYPE_BIG">{{ item.TYPE_BIG }}</a-select-option>
            </a-select>
        </div>
        <div class="echarts_content animated fadeInRight">
            <div class="echarts_content_sub">
                <div id="ranking_list_content" class="h_100">
                    <div class="ml_15 mb_10 ft_16">各类型的案件看板</div>
                    <div class="ranking_list">
                        <div class="ranking_list_overflow">
                            <a-row class="ranking_item" v-for=" (items, key, index) in ranking_list_data" :key="index">
                                <a-tooltip :title="key"><a-col :span="6" >&nbsp;&nbsp;{{ key }}：</a-col></a-tooltip>
                                <span v-for="item in items" :key="item.STREET_NAME">
                                    <a-tooltip :title="item.STREET_NAME"><a-col :span="3">{{ item.STREET_NAME }}</a-col></a-tooltip>
                                    <a-col :span="3">{{ (item["COUNT_NUMBER/TOTAL"] * 100).toFixed(1) }}%</a-col>
                                </span>
                            </a-row>
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
            heatLayer: this.$parent.viewLayerOption.heat,
            social_public_opinion_type_data: [],
            type_name:"街面秩序",
            ranking_list_data:[],
            type_heatmap_data:[],
        };
    },
    computed: {},
    watch: {},
    methods: {
        onChangeSocialPublicOpinion(value){
            this.type_name = value;
            this.get_community_problem_heat_layer_data()
        },
        get_community_problem_type_data(){//获得所有类型数据
            this.http.get("lawCase/getBigType", {}, res =>{
                if(res.success){
                    var data  = JSON.parse(Decrypt(res.data.results.key));
                    this.social_public_opinion_type_data = data;
                }
            })
        },
        get_community_problem_data(){//根据类型获取各街道数据
            this.http.get("lawCase/getTopByType", { }, res =>{
                if(res.success){
                    var data  = JSON.parse(Decrypt(res.data.results.key));
                    this.ranking_list_data = data
                }
            })
        },
        get_community_problem_heat_layer_data(){//根据类型获取各街道热力数据
            this.http.get("lawCase/getListByBigType", { bigType: this.type_name }, res =>{
                if(res.success){
                    var data  = JSON.parse(Decrypt(res.data.results.key));
                    this.get_view_data(data)
                }
            })
        },
        get_view_data (result_data){
            this.type_heatmap_data = [];
            for(var i = 0; i < result_data.length; i++){
                var item = result_data[i];
                this.type_heatmap_data.push({
                    value: item.TOTAL_NUMBER,
                    lnglat:wgs84togcj02(item.LONGITUDE, item.LATITUDE),
                })
            }
            this.load_community_problem_heat_layer();
        },
        load_community_problem_heat_layer(){//热力图层
            this.heatLayer.setData(this.type_heatmap_data, {
                lnglat: "lnglat",
            });
            this.heatLayer.setOptions({
                style: {
                    radius: 30,
                    color: {
                        0.5: '#2c7bb6',
                        0.65: '#abd9e9',
                        0.7: '#ffffbf',
                        0.9: '#fde468',
                        1.0: '#d7191c'
                    },
                    // opacity:[0.3,0.7]
                }
            });
            this.heatLayer.render();
            this.heatLayer.show();
        },
    },
    created() {
        this.get_community_problem_type_data()
        this.get_community_problem_data()
    },
    mounted() {
        this.mainMapLayer.setStatus({zoomEnable :  true});
    },
}
</script>
<style lang='less' scoped>
.ranking_list{
    height: 90%;
    margin: 0 30px 0 15px;
    font-size: 12px;
    overflow-y: auto;
    .ranking_list_overflow{
        width: 100%;
        overflow: hidden;
        .ranking_item{
            padding: 8px 0;
            margin-bottom: 10px;
            background-color: #85ccc8;
            color: #fff;
            .ant-col-6{
                white-space: nowrap; 
                text-overflow:ellipsis; 
                overflow:hidden; 
            }
            .ant-col-3{
                white-space: nowrap; 
                text-overflow:ellipsis; 
                overflow:hidden; 
            }
        }
        .ranking_item:nth-child(odd){
            background-color: #f0b33c;
        }
    }

}

</style>