import { TScetion } from '@/types/book'
import { defineStore } from 'pinia'


export default defineStore('sectionModule', {
    // 推荐使用 完整类型推断的箭头函数
    state() {
        return {
            dialogFormVisible: false,
            id: 0,
            scetion_obj: {} as TScetion,
        }
    },
})

