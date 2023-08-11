<template>
    <spen>参数配置</spen>
    <div class="box">


        <div class="minbox">

            <el-form-item label="图片切换类型">
                <el-select v-model="form.video_type" :disabled="update">
                    <el-option label="默认样式" value="默认样式" />
                    <el-option label="向上移动" value="向上移动" />
                    <el-option label="渐入渐出" value="渐入渐出" />
                </el-select>
            </el-form-item>
        </div>

        <br>
        <el-form-item>
            <el-button type="info" class="my_button" @click="update = false">修改</el-button>
            <el-button type="primary" class="my_button" @click="onSubmit(form)">保存</el-button>
        </el-form-item>
    </div>
</template>
  
<script lang="ts">
import apiurl from '@/api/url';
import link from '@/api/link';
import { ElNotification } from 'element-plus'
import { h } from 'vue'
export default {
    // data() 返回的属性将会成为响应式的状态
    // 并且暴露在 `this` 上
    data() {
        return {
            form: {
                video_type: "",
            },
            update: true,
        }
    },
    mounted() {
        link(apiurl.config_system, 'get').then((success: any) => {
            this.form = success.data.data
        })
    },
    methods: {
        onSubmit(form: any) {
            link(apiurl.config_system, 'post', form).then((success: any) => {
                ElNotification({
                    title: '保存成功',
                    message: h('i', { style: 'color: red' }, success.data.message),
                    type: 'success',
                })
                this.form = success.data.data
            }).catch((err) => {
                ElNotification({
                    title: '错误',
                    message: err.message,
                    type: 'error',
                })
            })
        }
    },
}

</script>
<style lang="scss" scoped> .my_button {
     margin: 0 auto;
 }

 .el-form-item {
     margin-bottom: 18px;
 }

 spen {
     font-weight: bold;
     display: block;
     text-align: center;
     height: 30px;
     font-size: 24px;
     height: 50px;
 }

 .box {
     border-width: 2px;
     border-style: solid;
     border-color: antiquewhite;
     border-radius: 25px;
     padding-top: 10px;
     padding-left: 50px;
     padding-right: 50px;
     box-shadow: 8px 8px 4px grey;
     margin-left: 15%;
     margin-right: 15%;
 }

 .minbox {
     border-width: 2px;
     border-style: solid;
     border-color: antiquewhite;
     border-radius: 25px;
     padding: 20px 20px 0;
 }

 p {
     text-align: center;
     margin-bottom: 10px;
     //  a{
     //     color: #000;
     //  }
 }
</style>