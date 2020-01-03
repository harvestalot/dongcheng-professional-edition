<!-- 地图工具 -->
<template>
    <div class='map_tool'>
        <div>
            <a-checkbox-group
            :options="tool_options"
            :defaultValue="toolOption.tool_checked"
            @change="toolOption.change"
            >
                <span style="color: red" slot="label" slot-scope="{value}">{{value}}</span>
            </a-checkbox-group>
        </div>
        <div class="mt_10">
            <a-button type="primary" size="small"><router-link :to="{ name: 'AccessibilityMap' }">交通可达性</router-link></a-button>
        </div>
    </div>
</template>

<script>
const tool_options = [
    { label: '现状用地', value: 'land' },
    { label: '街道边界', value: 'street' },
    { label: '路网', value: 'road' },
];
export default {
    name:"Tool",
    components: {},
    props:{
        toolOption:{
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            tool_options,
        };
    },
    computed: {},
    watch: {},
    methods: {
    },
    created() {},
    mounted() {},
}
</script>
<style lang='less'>
    .map_tool{
        position: absolute;
        left: 5px;
        top: 5px;
        width: 110px;
        padding: 10px 10px;
        box-sizing: border-box;
        background-color: rgba(0,0,0,.5);
        box-shadow: 0px 0px 8px 0px rgba(188, 142, 94, 1);
        .ant-checkbox-wrapper{
            margin-top: 5px;
            font-size: 12px;
            color: #fff;
        }
        .ant-checkbox-wrapper:first-child{
            margin-top: 0;
        }
        .ant-btn-sm{
            font-size: 12px;
        }
    }
</style>