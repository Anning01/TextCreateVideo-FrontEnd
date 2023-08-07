<template>
    <el-upload ref="uploadRef" :limit=limit :on-change="changeFile" :auto-upload="false" accept=".txt">
        <template #trigger>
            <el-button type="primary">选择文件</el-button>
        </template>

        <el-button class="ml-3" type="success" @click="submitUpload">
            上传到服务器
        </el-button>

        <template #tip>
            <div class="el-upload__tip">
                只允许上传txt文件
            </div>
        </template>
    </el-upload>

    <el-table :data="home.book_list.slice((currentPage - 1) * pageSize, currentPage * pageSize)" border style="width: 100%">
        <el-table-column prop="id" label="编号" />
        <el-table-column prop="name" label="书名" />
        <el-table-column prop="create_dt" label="创建时间" />
        <el-table-column label="操作">
            <template #default="scope">
                <el-button size="small" type="primary" @click="downloadText(scope.row)">下载</el-button>
            </template>
        </el-table-column>
        <el-table-column label="视频">
            <template #default="scope">
                <el-button size="small" type="success" @click="createVideo(scope.row)"
                    v-if="scope.row.status == 'default'">生成视频</el-button>
                <!-- <el-button size="small" type="success" @click="createVideo(scope.row)" v-if="scope.row.status == 'default'">生成视频</el-button> -->
                <el-button size="small" type="warning" v-else-if="scope.row.status == 'underway'" disabled>进行中</el-button>
                <el-button size="small" type="danger" v-else-if="scope.row.status == 'failure'"
                    @click="failureReason(scope.row)">失败原因</el-button>
                <el-button size="small" type="primary" @click="downloadVideo(scope.row)" v-else>下载</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="failureDialogVisible" title="失败原因" width="30%" draggable>
        <span>{{ failureInfo }}</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="failureDialogVisible = false">关闭</el-button>
                <el-button type="primary" @click="regenerate">
                    重新生成
                </el-button>
            </span>
        </template>
    </el-dialog>
    <br>
    <el-pagination :current-page="currentPage" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="home.book_list.length" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import useStore from '../../../store'
import apiurl from '@/api/url';
import link from '@/api/link';
import { h } from 'vue'
import { ElNotification } from 'element-plus'


const limit = ref(1)
const file = ref()
const currentPage = ref(1)
const pageSize = ref(10)
const rows = ref(null)
const failureDialogVisible = ref(false)
const failureInfo = ref("")
const changeFile = (uploadFile: any) => {
    file.value = uploadFile;
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val
}

// 失败原因
const failureReason = (row: any) => {
    rows.value = row

    failureDialogVisible.value = !failureDialogVisible.value
    failureInfo.value = row.fail_info
}

// 获取书数据列表
const submitUpload = () => {
    let formData = new FormData();
    formData.append("file", file.value.raw);
    link(apiurl.book_list, 'post', formData).then((success: any) => {
        ElNotification({
            title: '上传成功',
            message: success.data.message,
            type: 'success',
        })
        window.location.reload()
    }).catch((err) => {
        ElNotification({
            title: '上传失败',
            message: err.data.message,
            type: 'error',
        })
    })
}

// 生成视频
const createVideo = (row: any) => {
    link(apiurl.create_video + row.id, 'get').then((success: any) => {

        if (success.data.code === 200) {
            ElNotification({
                title: '创建成功',
                message: h('i', { style: 'color: teal' }, success.data.message),
            })
        } else {
            ElNotification({
                title: '创建失败',
                message: h('i', { style: 'color: red' }, success.data.message),
            })
        }
        home.get_book_list()

    }).catch((err) => {
        ElNotification({
            title: '创建失败',
            message: h('i', { style: 'color: red' }, err.message),
        })
    })

}

// 重新生成
const regenerate = () => {

    failureDialogVisible.value = !failureDialogVisible.value
    createVideo(rows.value)
    rows.value = null
}

// 下载视频
const downloadVideo = (row: any) => {
    window.open(
        apiurl.base + row.video_path
    );
}


// 下载书
const downloadText = (row: any) => {
    window.open(
        apiurl.base + row.path
    );
}

const { home } = useStore()
onMounted(() => {
    home.get_book_list()
})


</script>

<style scoped></style>