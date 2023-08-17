<template>
    <spen>Stable Diffusion配置</spen>
    <div class="box">
        <template v-for="item in data" :key="item.key">
            <el-form-item :label="item.description">
                <el-input v-if="item.type === 'str'" v-model="item.value" />
                <el-input v-else-if="item.type === 'int'" type="number" v-model="item.value" />
                <el-switch v-else-if="item.type === 'bool'" v-model="item.value" />

                <el-checkbox-group v-else-if="item.type === 'list'" v-model="item.value">
                    <el-checkbox v-for="i in item.value" :label="i" name="type" />
                </el-checkbox-group>

                <el-input
                type="textarea"
                :rows="8"
                placeholder="请输入JSON"
                v-else-if="item.type === 'dict'" v-model="item.value">
                </el-input>
            </el-form-item>

        </template>
        <br>
        <el-form-item>
            <el-button type="info" class="my_button" @click="Reset">重置</el-button>
            <el-button type="primary" class="my_button" @click="onSubmit(data)">保存</el-button>
        </el-form-item>
    </div>
</template>

<script lang="ts" setup>
import apiurl from '@/api/url';
import link from '@/api/link';
import { ElNotification } from 'element-plus'
import { onMounted, ref } from 'vue'

const data = ref()

type StableDiffusionConfigTypeList = {
    description: string,
    key: string,
    value: Type,
    type: string
}[]


type Type = string | number | boolean | Record<string, any> | any[]; // TS类型

const Reset = () => {
    link(apiurl.stable_diffusion, 'post').then((success: any)=>{
        if (success.data.code == 200){
            ElNotification({
            title: "重置成功",
            message: success.data.message,
            type: 'success',
        })
        window.location.reload()
        }else{
            ElNotification({
            title: "重置失败",
            message: success.data.message,
            type: 'error',
        })
        }
    })
}
const onSubmit = (form: any) => {
    link(apiurl.stable_diffusion, 'put', form).then((success: any)=>{
        if (success.data.code == 200){
            ElNotification({
            title: "修改成功",
            message: success.data.message,
            type: 'success',
        })
        data.value = success.data.data
        }else{
            ElNotification({
            title: "修改失败",
            message: success.data.message,
            type: 'error',
        })
        }
    })
}

onMounted(() => {
    link(apiurl.stable_diffusion, 'get').then((success: any) => {
        data.value = success.data.data as StableDiffusionConfigTypeList
    });
})


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


 p {
     text-align: center;
     margin-bottom: 10px;
     //  a{
     //     color: #000;
     //  }
 }
</style>