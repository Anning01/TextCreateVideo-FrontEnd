<template>
    <div>
        <el-select v-model="value" class="m-2" placeholder="Select" size="large" @change="FiltrationAttr(value)">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <el-table @selection-change="handleSelectionChange"
            :data="sections.slice((currentPage - 1) * pageSize, currentPage * pageSize)" border style="width: 100%">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="id" label="编号" width="55" />
            <el-table-column prop="name" show-overflow-tooltip="true" effect="light" label="书名" />
            <el-table-column prop="index" label="图片顺序" />
            <el-table-column label="图片">
                <template #default="scope">
                    <img style="max-width: 80px; max-height: 80px" class="table-thumb" :src="apiurl.base + scope.row.path"
                        @click="showPreview(apiurl.base + scope.row.path)">
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template #default="scope">
                    <el-button size="small" @click="downloadVoice(scope.row)">下载</el-button>
                    <el-button size="small" type="primary" @click="Redraw(scope.row)" :disabled="isButtonDisabled" v-text="buttonText" />
                </template>
            </el-table-column>

        </el-table>
        <el-button type="primary" @click="downloadVoiceZip">下载</el-button>
        <el-button type="danger" @click="DeleteSelected">删除</el-button>
        <br>
        <el-pagination :current-page="currentPage" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="sections.length" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        <el-dialog v-model="previewVisible">
            <img :src="previewUrl" style="width: 100%">
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import apiurl from '@/api/url';
import link from '@/api/link';
import { onMounted, ref } from 'vue'
import { ElNotification } from 'element-plus'


const value = ref()
const currentPage = ref(1)
const pageSize = ref(10)
const sections = ref([])
const id_list = ref<number[]>([])
const options = ref<{
    id: number,
    name: string
}[]>()
const previewVisible = ref()
const previewUrl = ref()
const isButtonDisabled = ref(false)
const buttonText = ref("重绘")

const showPreview = (url: string) => {
    previewUrl.value = url;
    previewVisible.value = true;
}
const downloadVoiceZip = () => {
    console.log(id_list.value);

    if (id_list.value.length > 0) {
        link(apiurl.book_pictures_download, 'post', { "id_list": id_list.value }).then((success: any) => {
            window.open(
                apiurl.base + success.data.url
            );
        });
    } else {
        ElNotification({
            title: '下载失败',
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
// 下载视频
const downloadVoice = (row: any) => {
    window.open(
        apiurl.base + row.path
    );
}

// 重绘图
const Redraw = (row: any) => {
    link(apiurl.pictures_redraw, 'get', {}, { "pictures_id": row.id }).then((success: any) => {
        if (success.data.code == 200) {
            ElNotification({
                title: "重绘成功",
                message: success.data.message,
                type: 'success',
            })
            buttonText.value = "重绘中"
            isButtonDisabled.value = !isButtonDisabled.value
        }else{
            ElNotification({
                title: '重绘失败',
                message: success.data.message,
                type: 'error',
            })
        }

    })
}

const FiltrationAttr = (value: number) => {
    link(apiurl.book_pictures, 'get', {}, { "book_id": value }).then((success: any) => {
        sections.value = success?.data;
    });
}
const handleSelectionChange = (selection: {
    id: number,
    book_id: number,
    idnex: number,
    name: string,
    path: string,
}[]) => {
    id_list.value = selection.map(obj => obj.id);
}
onMounted(() => {
    link(apiurl.book_pictures, 'get').then((success: any) => {
        sections.value = success?.data;
    });
    link(apiurl.book_class, 'get').then((success: any) => {
        options.value = success?.data;

    });
})

// 删除选中数据
const DeleteSelected = () => {

    if (id_list.value.length > 0) {
        const count = id_list.value.length
        link(apiurl.book_pictures, 'delete', { "id_list": id_list.value }).then((success: any) => {
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

</script>

<style scoped>
.table-thumb {
    width: 80px;
    height: 80px;
    object-fit: cover;

    transition: transform 0.3s;
}

.table-thumb:hover {
    transform: scale(1.2);
}
</style>