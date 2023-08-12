<template>
    <el-dialog v-model="section.dialogFormVisible" title="文本信息">
        <el-form :model="section.scetion_obj">
            <el-form-item label="书名" :label-width="formLabelWidth">
                <el-input v-model="section.scetion_obj.name" autocomplete="off" disabled="true" />
            </el-form-item>
            <el-form-item label="文本片段" :label-width="formLabelWidth">
                <el-input v-model="section.scetion_obj.paragraph" autocomplete="off" disabled="true" />
            </el-form-item>
            <el-form-item label="正向提示词" :label-width="formLabelWidth">
                <el-input v-model="section.scetion_obj.prompt" autocomplete="off" />
            </el-form-item>
            <el-form-item label="反向提示词" :label-width="formLabelWidth">
                <el-input v-model="section.scetion_obj.negative" autocomplete="off" />
            </el-form-item>

        </el-form>


        <template #footer>
            <span class="dialog-footer">
                <el-button @click="updateCancel">取消</el-button>
                <el-button type="primary" @click="updateCommit(section.scetion_obj)">
                    修改
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import apiurl from '@/api/url';
import link from '@/api/link';
import useStore from '../store'
import { TScetion } from '@/types/book'

const { section } = useStore()


const formLabelWidth = '140px'
const updateCancel = () => {
    section.dialogFormVisible = !section.dialogFormVisible
    window.location.reload()
}
const updateCommit = (row: TScetion) => {
    console.log(row);
    
    link(apiurl.book_section + `/${row.id}`, "put", row).then((success: any) => {
        section.dialogFormVisible = !section.dialogFormVisible
    })
}



</script>

<style scoped></style>