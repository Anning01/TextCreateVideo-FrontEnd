<template>
    <spen>参数配置</spen>
    <div class="box">


        <div class="minbox">
                <p>暂无</p>
            </div>
        <!-- <el-form :model="form" label-width="120px">
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
        </el-form> -->
    </div>
</template>
  
<script lang="ts">

export default {
    // data() 返回的属性将会成为响应式的状态
    // 并且暴露在 `this` 上
    data() {
        return {
            form: {
                sd_url: "",
            },
            update: true,
        }
    },
    mounted() {
    },
    methods: {
        onSubmit(form: any) {
            console.log(form);
            
        }
    },
}

// do not use same name with ref


// type TConfig = {
//     baidu_api_key: string,
//     baidu_secret_key: string,
//     fastgpt_appid: string,
//     fastgpt_api_key: string,
//     api2d_forward_key: string,
// }


// let form = reactive<TConfig>(
//     {
//         baidu_api_key: "",
//         baidu_secret_key: "",
//         fastgpt_appid: "",
//         fastgpt_api_key: "",
//         api2d_forward_key: "",
//     }
// )



// const update = ref(true)
// const showPass1 = ref(false)
// const showPass2 = ref(false)
// const showPass3 = ref(false)
// const showPass4 = ref(false)
// const showPass5 = ref(false)


// const onSubmit = () => {
//     console.log('submit!')
// }
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