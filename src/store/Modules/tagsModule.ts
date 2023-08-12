import { TTags } from '@/types/book'
import { defineStore } from 'pinia'


export default defineStore('tagsModule', {
    // 推荐使用 完整类型推断的箭头函数
    state() {
        return {
            dialogFormVisible: false,
            tags_obj: {} as TTags,
        }
    },
})

