<template>
    <spen>第三方设置</spen>
    <div class="box">

        <el-form :model="form" label-width="120px">
            <div class="minbox">
                <p><a href="https://console.bce.baidu.com/ai/#/ai/speech/app/list">百度API</a></p>
                <el-form-item label="API Key">
                    <el-input :type="showPass1 ? 'text' : 'password'" v-model="form.baidu_api_key" :disabled="update">
                        <template #suffix>
                            <!-- <template -->
                            <el-icon class="el-input__icon">
                                <View v-if="showPass1" @click="showPass1 = !showPass1" />
                                <Hide v-else @click="showPass1 = !showPass1" />
                            </el-icon>
                        </template>
                    </el-input>

                </el-form-item>

                <el-form-item />
                <el-form-item label="Secret Key">
                    <el-input :type="showPass2 ? 'text' : 'password'" v-model="form.baidu_secret_key" :disabled="update">
                        <template #suffix>
                            <el-icon class="el-input__icon">
                                <View v-if="showPass2" @click="showPass2 = !showPass2" />
                                <Hide v-else @click="showPass2 = !showPass2" />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>


                <el-space fill>
                    <el-alert type="success" show-icon :closable="false">
                        <p>取值0-15，默认为5中语速</p>
                    </el-alert>
                    <el-form-item label="语速">
                        <el-input v-model="form.baidu_config.spd" :disabled="update" type="number"/>
                    </el-form-item>
                </el-space>

                <el-space fill>
                    <el-alert type="success" show-icon :closable="false">
                        <p>取值0-15，默认为5中语调</p>
                    </el-alert>
                    <el-form-item label="音调">
                        <el-input v-model="form.baidu_config.pit" :disabled="update" type="number"/>
                    </el-form-item>
                </el-space>

                <el-space fill>
                    <el-alert type="success" show-icon :closable="false">
                        <p>基础音库取值0-9，精品音库取值0-15，默认为5中音量（取值为0时为音量最小值，并非为无声）</p>
                    </el-alert>
                    <el-form-item label="音量">
                        <el-input v-model="form.baidu_config.vol" :disabled="update" type="number"/>
                    </el-form-item>
                </el-space>

                <el-space fill>
                    <el-alert type="success" show-icon :closable="false">
                        <p>(基础音库) 度小宇=1，度小美=0，度逍遥=3，度丫丫=4</p>
                    </el-alert>
                    <el-alert type="success" show-icon :closable="false">
                        <p>(精品音库) 度逍遥=5003，度小鹿=5118，度博文=106，度小童=110，度小萌=111，度米朵=103，度小娇=5</p>
                    </el-alert>
                    <el-form-item label="音库">
                        <el-input v-model="form.baidu_config.per" :disabled="update" type="number"/>
                    </el-form-item>
                </el-space>

            </div>
            <br>
            <div class="minbox">
                <p><a href="https://platform.openai.com/docs/introduction">ChatGPT配置</a></p>
                <el-form-item label="openAPI_KEY">
                    <el-input :type="showPass6 ? 'text' : 'password'" v-model="form.openAPI_KEY" :disabled="update">
                        <template #suffix>
                            <el-icon class="el-input__icon">
                                <View v-if="showPass6" @click="showPass6 = !showPass6" />
                                <Hide v-else @click="showPass6 = !showPass6" />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
            </div>
            <br>
            <div class="minbox">
                <p><a href="https://fastgpt.run/app/list">FastGPT配置</a></p>
                <el-form-item label="AppId">
                    <el-input :type="showPass3 ? 'text' : 'password'" v-model="form.fastgpt_appid" :disabled="update">
                        <template #suffix>
                            <el-icon class="el-input__icon">
                                <View v-if="showPass3" @click="showPass3 = !showPass3" />
                                <Hide v-else @click="showPass3 = !showPass3" />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="API KEY">
                    <el-input :type="showPass4 ? 'text' : 'password'" v-model="form.fastgpt_api_key" :disabled="update">
                        <template #suffix>
                            <el-icon class="el-input__icon">
                                <View v-if="showPass4" @click="showPass4 = !showPass4" />
                                <Hide v-else @click="showPass4 = !showPass4" />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
            </div>
            <br>
            <div class="minbox">
                <p><a href="https://api2d.com/profile">API2D</a></p>
                <el-form-item label="ForwardKey">
                    <el-input :type="showPass5 ? 'text' : 'password'" v-model="form.api2d_forward_key" :disabled="update">
                        <template #suffix>
                            <el-icon class="el-input__icon">
                                <View v-if="showPass5" @click="showPass5 = !showPass5" />
                                <Hide v-else @click="showPass5 = !showPass5" />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
            </div>
            <br />
            <div class="minbox">
                <p>Stable Diffusion</p>
                <div>
                    <el-form-item label="启动路径配置">
                        <el-input v-model="form.sd_url" :disabled="update">
                            <template #prepend>http://</template>
                            <template #append>/sdapi/v1/txt2img</template>
                        </el-input>
                    </el-form-item>
                </div>
                <el-form-item />
            </div>
            <br>
            <el-form-item>
                <el-button type="info" class="my_button" @click="update = false">修改</el-button>
                <el-button type="primary" class="my_button" @click="onSubmit(form)">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script lang="ts">
import { View, Hide } from "@element-plus/icons-vue";
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
                baidu_api_key: "",
                baidu_secret_key: "",
                fastgpt_appid: "",
                fastgpt_api_key: "",
                openAPI_KEY: "",
                api2d_forward_key: "",
                sd_url: "",
                baidu_config: {
                    video_type: "",
                    spd: 5,
                    pit: 5,
                    vol: 5,
                    per: 5003,
                }
            },
            update: true,
            showPass1: false,
            showPass2: false,
            showPass3: false,
            showPass4: false,
            showPass5: false,
            showPass6: false,
        }
    },
    mounted() {
        link(apiurl.config, 'get').then((success: any) => {
            this.form = success.data.data
        })
    },
    methods: {
        onSubmit(form: any) {
            link(apiurl.config, 'post', form).then((success: any) => {
                ElNotification({
                    title: '保存成功',
                    message: h('i', { style: 'color: red' }, success.data.message),
                    type: 'success',
                })

                this.form = success.data.data
            }).catch((err) => {
                ElNotification({
                    title: '错误',
                    message: err.data.message,
                    type: 'error',
                })
            })
        }
    },
    components: {
        Hide,
        View,
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