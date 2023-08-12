<template>
    <div>
        <el-select v-model="value" class="m-2" placeholder="Select" size="large" @change="FiltrationAttr(value)">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <el-button type="primary" class="addButton" @click="handleAdd">新增</el-button>

        <el-table @selection-change="handleSelectionChange"
            :data="sections.slice((currentPage - 1) * pageSize, currentPage * pageSize)" border style="width: 100%">
            <!-- 工具栏 -->

            <el-table-column type="selection" width="55" />
            <el-table-column prop="id" label="编号" width="55" />
            <el-table-column prop="name" show-overflow-tooltip="true" effect="light" label="书名" />
            <el-table-column prop="content" show-overflow-tooltip="true" label="人物或者场景词" />
            <el-table-column prop="prompt" show-overflow-tooltip="true" label="正向提示词" />
            <el-table-column prop="negative" show-overflow-tooltip="true" label="反向提示词" />
            <el-table-column label="操作" width="100">
                <template #default="scope">
                    <el-button size="small" @click="UpdateWindow(scope.row)">修改</el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-button type="primary" @click="DeleteSelected">删除</el-button>
        <br>
        <el-pagination :current-page="currentPage" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="sections.length" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        <el-dialog v-model="previewVisible">
            <img :src="previewUrl" style="width: 100%">
        </el-dialog>

        <el-drawer ref="drawerRef" v-model="drawer" direction="btt" :before-close="handleClose" size="55%">
            <div class="demo-drawer__content">
                <el-form :model="form">
                    <el-form-item label="请选择所属书籍" required>
                        <el-select v-model="form.book_id" placeholder="请选择所属书籍">
                            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="人物或者场景词" required>
                        <el-input v-model="form.content" autocomplete="off" />
                    </el-form-item>

                    <el-space fill >
                        <el-alert type="warning" show-icon :closable="false">
                            <p>注意：【正向提示词】和【反向提示词】需要输入英文，多个提示词使用逗号隔开</p>
                        </el-alert>
                        <el-form-item label="正向提示词">
                            <el-input v-model="form.prompt" autocomplete="off" />
                        </el-form-item>
                    </el-space>


                    <el-form-item label="反向提示词">
                        <el-input v-model="form.negative" autocomplete="off" />
                    </el-form-item>


                </el-form>
                <div class="demo-drawer__footer">
                    <el-button @click="cancelForm">取消</el-button>
                    <el-button type="primary" :loading="loading" @click="onClick(form)">{{
                        loading ? '提交中 ...' : '提交'
                    }}</el-button>
                </div>
            </div>
        </el-drawer>
        <tagsUpdate />
    </div>
</template>

<script lang="ts" setup>
import apiurl from '@/api/url';
import link from '@/api/link';
import { onMounted, reactive, ref } from 'vue'
import { ElMessageBox, ElNotification } from 'element-plus'
import { ElDrawer } from 'element-plus'
import tagsUpdate from '@/components/tagsUpdate.vue';
import useStore from '@/store'
import { TTags } from '@/types/book'

const { tags } = useStore()
const dialog = ref(false)
const loading = ref(false)

const value = ref()
const currentPage = ref(1)
const pageSize = ref(10)
const sections = ref([])
const id_list = ref<number[]>([])
const options = ref<{
    id: number,
    name: string
}[]>()
let timer: any
const drawerRef = ref<InstanceType<typeof ElDrawer>>()

const onClick = (form: any) => {

    if (form.book_id === null) {
        ElNotification({
            title: '保存失败',
            message: "请选择书籍",
            type: 'error',
        })
    } else if (form.content === null) {
        ElNotification({
            title: '保存失败',
            message: "人物或者场景词不能为空",
            type: 'error',
        })
    } else if (form.prompt === null || form.negative === null) {
        ElNotification({
            title: '保存失败',
            message: "正向提示词或者反向提示词不能全空",
            type: 'error',
        })
    } else {
        console.log(form);
        link(apiurl.book_prompt_tags, 'post', form).then((success: any) => {
            ElNotification({
                title: '保存成功',
                message: success.data.message,
                type: 'success',
            })
            timer = setTimeout(() => {
                // done()
                // 动画关闭需要一定的时间
                setTimeout(() => {
                }, 400)
            }, 2000)
        })
        drawerRef.value!.close()
        window.location.reload()
    }
}


const handleClose = (done: any) => {
    if (loading.value) {
        return
    }
    ElMessageBox.confirm('是否提交数据')
        .then(() => {
            onClick(form)
            loading.value = true
            timer = setTimeout(() => {
                // 动画关闭需要一定的时间
                setTimeout(() => {
                    loading.value = false
                }, 400)
            }, 2000)
        })
        .catch(() => {
            drawerRef.value!.close()
        })
}

const cancelForm = () => {
    loading.value = false
    dialog.value = false
    drawerRef.value!.close()
    clearTimeout(timer)
}


const previewVisible = ref()
const previewUrl = ref()
const drawer = ref(false)

const form = reactive({
    content: '',
    prompt: '',
    negative: '',
    book_id: null,
})


const handleAdd = () => {
    drawer.value = true
}
// 删除选中数据
const DeleteSelected = () => {

    if (id_list.value.length > 0) {
        const count = id_list.value.length
        link(apiurl.book_prompt_tags, 'delete', { "id_list": id_list.value }).then((success: any) => {
            ElNotification({
                title: success.data.message,
                message: `成功删除了${count}条数据`,
                type: 'success',
            })
            window.location.reload()
        });
    } else {
        ElNotification({
            title: '删除失败',
            message: "未选中任何数据",
            type: 'error',
        })
    }
}
const handleSizeChange = (val: number) => {
    pageSize.value = val;
}
const handleCurrentChange = (val: number) => {
    currentPage.value = val;
}

// 打开修改窗口
const UpdateWindow = (row: TTags) => {
    tags.dialogFormVisible = !tags.dialogFormVisible
    tags.tags_obj = row
}

const FiltrationAttr = (value: number) => {
    link(apiurl.book_prompt_tags, 'get', {}, { "book_id": value }).then((success: any) => {
        sections.value = success?.data;
    });
}

const handleSelectionChange = (selection: {
    id: number,
    book_id: number,
    name: string,
    content: string,
    prompt: string,
    negative: string,
}[]) => {
    id_list.value = selection.map(obj => obj.id);
}

onMounted(() => {
    link(apiurl.book_prompt_tags, 'get').then((success: any) => {
        sections.value = success?.data;
    });
    link(apiurl.book_class, 'get').then((success: any) => {
        options.value = success?.data;
    });
})

</script>

<style scoped>
.addButton {
    position: absolute;
    right: 26px;
}
</style>