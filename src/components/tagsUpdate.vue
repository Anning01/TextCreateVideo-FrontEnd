<template>
    <el-dialog v-model="tags.dialogFormVisible" title="标签信息">
        <el-form :model="tags.tags_obj">
            <el-form-item label="书名" :label-width="formLabelWidth">
                <el-input v-model="tags.tags_obj.name" autocomplete="off" disabled="true" />
            </el-form-item>
            <el-form-item label="文本片段" :label-width="formLabelWidth">
                <el-input v-model="tags.tags_obj.content" autocomplete="off" />
            </el-form-item>

            <el-space fill>
                <el-alert type="warning" show-icon :closable="false">
                    <p>注意：【正向提示词】和【反向提示词】需要输入英文，多个提示词使用逗号隔开</p>
                </el-alert>
                <el-form-item label="正向提示词" :label-width="formLabelWidth">
                    <el-input v-model="tags.tags_obj.prompt" autocomplete="off" />
                </el-form-item>
            </el-space>



            <el-form-item label="反向提示词" :label-width="formLabelWidth">
                <el-input v-model="tags.tags_obj.negative" autocomplete="off" />
            </el-form-item>

        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="updateCancel">取消</el-button>
                <el-button type="primary" @click="updateCommit(tags.tags_obj)">
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
import { TTags } from '@/types/book'

const { tags } = useStore()


const formLabelWidth = '140px'
const updateCancel = () => {
    tags.dialogFormVisible = !tags.dialogFormVisible
    window.location.reload()
}
const updateCommit = (row: TTags) => {
    link(apiurl.book_prompt_tags + `/${row.id}`, "put", row).then((success: any) => {
        tags.dialogFormVisible = !tags.dialogFormVisible
    })
}



</script>

<style scoped></style>