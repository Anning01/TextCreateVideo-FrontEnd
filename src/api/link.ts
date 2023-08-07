import service from '../utils/servse'
// 封装请求
let link = (url: string, method: string, data?:{}, params?: {}) => {
    
    return new Promise((resolve, reject) => {
        service.request({
            url, method, data, params
        }).then((success: any) => {
            resolve(success)
        }).catch((err) => {
            reject(err)
        })
    })
}

export default link