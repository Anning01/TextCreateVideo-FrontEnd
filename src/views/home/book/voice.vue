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
            <el-table-column prop="index" label="音频顺序" />
            
            <el-table-column label="操作" width="100">
            
                <template #default="scope">
                    <el-button size="small" @click="downloadVoice(scope.row)">下载</el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-button type="primary" @click="downloadVoiceZip">下载</el-button>
        <br>
        <el-pagination :current-page="currentPage" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="sections.length" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    
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





const downloadVoiceZip = () => {
    if (id_list.value.length > 0) {
        link(apiurl.book_voice_download, 'post', { "id_list": id_list.value }).then((success: any) => {

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
const FiltrationAttr = (value: number) => {
    link(apiurl.book_voice, 'get', {}, { "book_id": value }).then((success: any) => {
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

    // dowbon.value = true
}
onMounted(() => {
    link(apiurl.book_voice, 'get').then((success: any) => {
        sections.value = success?.data;
    });
    link(apiurl.book_class, 'get').then((success: any) => {
        options.value = success?.data;

    });
})

</script>

<style scoped></style>