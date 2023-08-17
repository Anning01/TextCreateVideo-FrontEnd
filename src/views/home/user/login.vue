<template>
    <div class="login">
        <div class="login-con">
            <ul class="menu-tab">
                <li v-for="item in MenuData" :class="{ current: item.current }" :key="item.type" @click="clickMunt(item)">
                    {{ item.txt }}
                </li>
            </ul>

            <!-- 表单部分 -->
            <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" class="demo-ruleForm">
                <el-form-item prop="username">
                    <label>账号</label>
                    <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="password">
                    <label>密码</label>
                    <el-input v-model="ruleForm.password" type="password" autocomplete="off" minlength="6" maxlength="15" />
                </el-form-item>
                <el-form-item>
                    <el-button :disabled="btnbool" type="primary" class="login-btn block" @click="submitForm(ruleFormRef)">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>


        </div>
    </div>
</template>


<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
import { MenuDataType } from '@/types/book';
import axios from 'axios';

const MenuData = reactive([
    { txt: "登录", current: true, type: "login" },
])

let model = ref("login")

let btnbool = ref(true)

// 路由跳转
let router = useRouter()

let clickMunt = (item: MenuDataType) => {
    MenuData.forEach((elemt) => { elemt.current = false })
    item.current = true
    model.value = item.type
}

// element plus 代码部分
const ruleFormRef = ref<FormInstance>()


const checkUsername = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('用户名不能为空'))
    } else {
        callback()
    }
}

const validatePass = (rule: any, value: any, callback: any) => {
    if (!value || value === '') {
        callback(new Error('密码不能为空'))
    } else {
        callback()
    }
}

const ruleForm = reactive({
    username: '',
    password: '',
})

watch(ruleForm, (newvalue, oldvalue) => {
    if (newvalue.username && newvalue.password) {
        btnbool.value = false
    }
})


const rules = reactive<FormRules<typeof ruleForm>>({
    password: [{ validator: validatePass, trigger: 'blur' }],
    username: [{ validator: checkUsername, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            axios.post('http://8.134.91.58/api/token/', ruleForm).then((ok: any) => {
                localStorage.setItem('token', `Bearer {ok.data.access}`)
                router.push('/book')
            }).catch((err) => {
                ElNotification({
                    title: "登录失败",
                    message: "账号或密码错误",
                    type: 'error',
                })
            })

        } else {
            return false
        }
    })
}

</script>

<style lang="scss">
.login {
    background-color: #1e1edb;
    height: 100%;
}

html,
body,
#app {
    height: 100%;
}

.menu-tab {
    text-align: center;

    li {
        display: inline-block;
        width: 88px;
        line-height: 36px;
        font-size: 14px;
        color: #fff;
        border-radius: 2px;
        cursor: pointer;
    }

    .current {
        background-color: rgb(255, 255, 255, 0.5);
    }
}

.demo-ruleForm {
    width: 30%;
    margin: 50px auto;

    label {
        display: block;
        margin-bottom: 3px;
        font-size: 14px;
        color: #fff;
    }

    .block {
        width: 100%;
        display: block;
    }

    .login-btn {
        margin-top: 20px;
    }
}
</style>