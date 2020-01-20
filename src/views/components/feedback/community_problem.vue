<!-- 社区问题反馈 -->
<template>
    <div class="main_content">
        <div class="echarts_content animated fadeInRight">
            <div class="echarts_content_sub">
                <div id="ranking_list_content" class="h_100">
                    <div class="ml_15 mb_10 ft_16">各类型的案件看板</div>
                    <div class="ranking_list">
                        <div class="ranking_list_overflow">
                            <a-row class="ranking_item" v-for=" i in 20" :key="i">
                                <a-col :span="5" :offset="1">公共设施</a-col>
                                <a-col :span="3">崇文门</a-col>
                                <a-col :span="3">14.0%</a-col>
                                <a-col :span="3">崇文门</a-col>
                                <a-col :span="3">14.0%</a-col>
                                <a-col :span="3">崇文门</a-col>
                                <a-col :span="3">14.0%</a-col>
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

        };
    },
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {},
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