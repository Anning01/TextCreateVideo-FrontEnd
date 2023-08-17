<template>
    <div>
        <el-select v-model="value" class="m-2" placeholder="Select" size="large" @change="FiltrationAttr(value)">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>

    <el-table @selection-change="handleSelectionChange" :data="sections.slice((currentPage - 1) * pageSize, currentPage * pageSize)" border style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="编号" width="55" />
        <el-table-column prop="name" label="书名" />
        <el-table-column prop="paragraph" show-overflow-tooltip="true" effect="light" label="片段" />
        <el-table-column prop="prompt" show-overflow-tooltip="true" label="正向提示词" />
        <el-table-column prop="negative" show-overflow-tooltip="true" label="反向提示词" />
        <el-table-column label="操作" width="100">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>
            </template>
        </el-table-column>

    </el-table>
    <el-button type="primary" @click="DeleteSelected">删除</el-button>
    <br>
    <el-pagination :current-page="currentPage" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="sections.length" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    <sectionUpdate />
    </div>
</template>

<script lang="ts" setup>
import apiurl from '@/api/url';
import link from '@/api/link';
import { onMounted, ref } from 'vue'
import sectionUpdate from '@/components/sectionUpdate.vue';
import useStore from '@/store'
import { ElNotification } from 'element-plus';


const { section } = useStore()
const currentPage = ref(1)
const pageSize = ref(10)
const sections = ref([])
const id_list = ref<number[]>([])
const value = ref()
const options = ref<{
    id: number,
    name: string
}[]>()

const handleSelectionChange = (selection: {
    id: number,
    paragraph: string,
    prompt: string,
    negative: string,
    name: string,
}[]) => {
    id_list.value = selection.map(obj => obj.id);
}

const downloadText = (row: any) => {
    console.log(row);
}
const downloadVideo = (row: any) => {
    console.log(row);
}
const handleSizeChange = (val: number) => {
    pageSize.value = val;
}
const handleCurrentChange = (val: number) => {
    currentPage.value = val;
}
const handleEdit = (row: any) => {
    section.dialogFormVisible = !section.dialogFormVisible
    section.scetion_obj = row
}
onMounted(()=>{
    link(apiurl.book_section, 'get').then((success: any) => {
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
    link(apiurl.book_section, 'delete', { "id_list": id_list.value }).then((success: any) => {
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
const FiltrationAttr = (value: number) => {
    link(apiurl.book_section, 'get', {}, { "book_id": value }).then((success: any) => {
        sections.value = success?.data;
    });
}
</script>

<style scoped></style>