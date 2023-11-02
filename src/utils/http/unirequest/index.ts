import { TOKEN_KEY } from "@/enums/cacheEnum";

const BASE_URL = "http://localhost:8081";
const TIMEOUT = 10000;
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

/**
 * 封装request请求
 * @param api 请求地址
 * @param method 请求类型
 * @param data 请求参数
 * @param headers 请求头
 * @returns 
 */
export const request = <T>(api: string, method: Method, data?: any, header?: object) => {
    const url = BASE_URL + api;
    const token = uni.getStorageSync(TOKEN_KEY);
    if (token) {
        header = { ...header, "Authorization": `Bearer ${token}` }
    }
    //异步封装接口，使用Promise处理异步请求
    return new Promise<T>((resolve, reject) => {
        uni.request({
            url,
            method,
            data,
            header: header,
            timeout: TIMEOUT,
            dataType: 'json',
            success: (res) => {
                console.log('success');
                console.log(res);
                if (res.statusCode === 200) {
                    resolve(res.data as T);
                } else {
                    reject(res.data);
                }
            },
            fail: (err) => {
                reject(err);
            },
            complete: (res) => {
                console.log(res);
                // if (res.statusCode === 200) {
                //     if (res.data.errno === 0 || res.data.errno === 401) {
                //         uni.hideLoading()
                //     } else {
                //         utils.toast(res.data.msg)
                //     }
                // } else {
                //     utils.toast('服务器开小差了~')
                // }
            }
        })
    })
}