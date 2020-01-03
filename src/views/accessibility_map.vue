<template>
   <div>
       <div>
           <a-form :form="form" @submit="handleSubmit">
                <a-form-item label="医疗" :label-col="form_item_col.label_col" :wrapper-col="form_item_col.wrapper_col">
                    <a-checkbox-group :options="medical_data">
                        <span style="color: red" slot="label" slot-scope="{value}">{{value}}</span>
                    </a-checkbox-group>
                </a-form-item>
                <a-form-item label="教育" :label-col="form_item_col.label_col" :wrapper-col="form_item_col.wrapper_col">
                    <a-checkbox-group :options="education_data">
                        <span style="color: red" slot="label" slot-scope="{value}">{{value}}</span>
                    </a-checkbox-group>
                </a-form-item>
                <a-form-item label="交通" :label-col="form_item_col.label_col" :wrapper-col="form_item_col.wrapper_col">
                    <a-checkbox-group :options="traffic_data">
                        <span style="color: red" slot="label" slot-scope="{value}">{{value}}</span>
                    </a-checkbox-group>
                </a-form-item>
                <a-form-item label="便民" :label-col="form_item_col.label_col" :wrapper-col="form_item_col.wrapper_col">
                    <a-checkbox-group :options="handy_service_data">
                        <span style="color: red" slot="label" slot-scope="{value}">{{value}}</span>
                    </a-checkbox-group>
                </a-form-item>
                <a-form-item label="安全" :label-col="form_item_col.label_col" :wrapper-col="form_item_col.wrapper_col">
                    <a-checkbox-group :options="safety_data">
                        <span style="color: red" slot="label" slot-scope="{value}">{{value}}</span>
                    </a-checkbox-group>
                </a-form-item>
                <a-form-item label="东西城区" :label-col="form_item_col.label_col" :wrapper-col="form_item_col.wrapper_col">
                    <a-checkbox-group :options="cultural_resources_data">
                        <span style="color: red" slot="label" slot-scope="{value}">{{value}}</span>
                    </a-checkbox-group>
                </a-form-item>
                <a-form-item label="出行时间" :label-col="form_item_col.label_col" :wrapper-col="form_item_col.wrapper_col">
                    <a-checkbox-group :options="travel_time_data">
                        <span style="color: red" slot="label" slot-scope="{value}">{{value}}</span>
                    </a-checkbox-group>
                </a-form-item>
                <a-form-item label="出行方式" :label-col="form_item_col.label_col" :wrapper-col="form_item_col.wrapper_col">
                    <a-checkbox-group :options="trip_mode_data">
                        <span style="color: red" slot="label" slot-scope="{value}">{{value}}</span>
                    </a-checkbox-group>
                </a-form-item>
                <a-form-item :wrapper-col="{ span: form_item_col.wrapper_col.span, offset: (24 - form_item_col.wrapper_col.span) }">
                    <a-button type="primary" html-type="submit">确定</a-button>
                    <a-button :style="{ marginLeft: '20px' }" @click="handleReset">重置</a-button>
                </a-form-item>
            </a-form>
       </div>
   </div>
</template>

<script>
export default {
    data(){
        return{
            form_item_col:{
                label_col: { span: 4},
                wrapper_col: { span: 20},
            },
            medical_data:["大型医院", "医院", "诊所"],
            education_data:["幼儿园", "小学", "中学"],
            traffic_data:["地铁站", "公交站", "停车场"],
            handy_service_data:["超市", "商场", "便利店"],
            safety_data:["公园", "广场", "消防站"],
            cultural_resources_data:["文化资源"],
            travel_time_data:["10", "15"],
            trip_mode_data:["步行"],
            form: this.$form.createForm(this, { name: 'accessibility_map' }),
        }
    },
    methods:{
        handleSubmit(e) {
            e.preventDefault();
        },
         handleReset() {
            this.form.resetFields();
        },
    }
}

</script>
<style scoped>
</style>