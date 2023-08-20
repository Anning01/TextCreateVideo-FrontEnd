<template>
    <spen>Stable Diffusion配置</spen>
    <div class="box">
        <template v-for="item in data" :key="item.key">
            <el-form-item>

                <el-space fill v-if="item.type === 'str'">
                    <el-alert type="warning" show-icon :closable="false">
                        <p>{{ item.description }}</p>
                    </el-alert>
                    <el-form-item :label="item.key">
                        <el-input v-model="item.value" />
                    </el-form-item>
                </el-space>

                <el-space fill v-else-if="item.type === 'int'" type="number">
                    <el-alert type="warning" show-icon :closable="false">
                        <p>{{ item.description }}</p>
                    </el-alert>
                    <el-form-item :label="item.key">
                        <el-input v-model="item.value" />
                    </el-form-item>
                </el-space>

                <el-space fill v-else-if="item.type === 'bool'">
                    <el-alert type="success" show-icon :closable="false">
                        <p>{{ item.description }}</p>
                    </el-alert>
                    <el-form-item :label="item.key">
                        <el-switch v-model="item.value" />
                    </el-form-item>
                </el-space>

                <el-space fill v-else-if="item.type === 'list'">
                    <el-alert type="success" show-icon :closable="false">
                        <p>{{ item.description }}</p>
                    </el-alert>
                    <el-form-item :label="item.key">
                        <el-checkbox-group v-model="item.value">
                            <el-checkbox v-for="i in item.value" :label="i" name="type" />
                        </el-checkbox-group>
                    </el-form-item>
                </el-space>

                <el-space fill v-else-if="item.type === 'dict'">
                    <el-alert type="success" show-icon :closable="false">
                        <p>{{ item.description }}</p>
                    </el-alert>
                    <el-form-item :label="item.key">
                        <el-input type="textarea" :rows="8" placeholder="请输入JSON" v-model="item.value">
                        </el-input>
                    </el-form-item>
                </el-space>

                <el-space fill v-else-if="item.type === 'selector'">
                    <el-alert type="success" show-icon :closable="false">
                        <p>{{ item.description }}</p>
                    </el-alert>
                    <el-select v-model="item.value" :value="item.value" class="m-2" placeholder="Select" size="large">
                        <el-option v-for="i in item.selector" :key="i.value" :label="'【' + i.value + '】' + i.name" :value="i.value" />
                    </el-select>
                </el-space>
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
import { log } from 'console';

const data = ref()

type StableDiffusionConfigTypeList = {
    description: string,
    key: string,
    value: Type,
    type: string
}[]


type Type = string | number | boolean | Record<string, any> | any[]; // TS类型

const Reset = () => {
    link(apiurl.stable_diffusion, 'post').then((success: any) => {
        if (success.data.code == 200) {
            ElNotification({
                title: "重置成功",
                message: success.data.message,
                type: 'success',
            })
            window.location.reload()
        } else {
            ElNotification({
                title: "重置失败",
                message: success.data.message,
                type: 'error',
            })
        }
    })
}
const onSubmit = (form: any) => {
    data.value.forEach((item: { type: string; value: string; }) => {
        if (item.type === 'dict') {
            item.value = JSON.parse(item.value)
        }
    })
    
    link(apiurl.stable_diffusion, 'put', form).then((success: any) => {
        if (success.data.code == 200) {
            ElNotification({
                title: "修改成功",
                message: success.data.message,
                type: 'success',
            })
            window.location.reload()
        } else {
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
        data.value.forEach((item: { type: string; value: string; }) => {
            if (item.type === 'dict') {
                item.value = JSON.stringify(item.value)
            }
        })
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