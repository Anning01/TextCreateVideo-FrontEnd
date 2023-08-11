<template>
    <div>
    <el-table :data="sections.slice((currentPage - 1) * pageSize, currentPage * pageSize)" border style="width: 100%">
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


const { section } = useStore()
const currentPage = ref(1)
const pageSize = ref(10)
const sections = ref([])

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
}) 

</script>

<style scoped></style>