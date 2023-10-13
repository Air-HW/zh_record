import { TOKEN_KEY } from '@/enums/cacheEnum';
import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosError } from 'axios';

const BASE_URL = "https://localhost:8080/";
const TIMEOUT = 10000;

// 创建一个axios实例,配置请求
const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL, // 根据实际情况填写接口的基本URL
    timeout: TIMEOUT, // 设置请求超时时间（单位：毫秒）
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> => {
        // 在每个请求发送前，判断是否需要添加JWT请求头
        if (config.url !== '/login') {
            const token = localStorage.getItem(TOKEN_KEY); // 从localStorage获取JWT Token
            config.headers.Authorization = token ? `Bearer ${token}` : ''; // 添加JWT请求头
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // 对响应数据做点什么
        return response;
    },
    (error: AxiosError) => {
        // 处理响应错误
        if (error.response && error.response.status === 401) {
            alert('登录已过期，请重新登录');
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;