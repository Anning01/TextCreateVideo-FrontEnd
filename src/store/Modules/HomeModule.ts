import { defineStore } from 'pinia'
import link from '@/api/link'
import apiurl from '@/api/url'


export default defineStore('HomeModule', {
    // 推荐使用 完整类型推断的箭头函数
    state() {
        return {
            // 所有这些属性都将自动推断其类型
            navBool: false,
            dialogFormVisible: false,
            book_list: [],
        }
    },
    actions: {
        SET_NAC_BOOL() {
            this.navBool = !this.navBool
        },
        get_book_list() {
            link(apiurl.book_list, 'get').then(
                (success: any) => {
                    this.book_list = success.data.data
                }
            ).catch((err: any) => {
                console.log(err);
            })
        }
    }

})

