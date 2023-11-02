/*
 * @Author: 张书瑞
 * @Date: 2023-10-15 14:27:38
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-11-02 01:27:37
 * @FilePath: \zh_record\src\utils\http\axios\index.ts
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */
import { TOKEN_KEY } from '@/enums/cacheEnum';
import { ShowToast } from '@/utils/toast';
import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosError, AxiosAdapter } from 'axios';
import mpAdapter from 'axios-miniprogram-adapter';

export const BASE_URL = "http://localhost:8081/";
const TIMEOUT = 10000;

// 配置 Axios 使用适配器
axios.defaults.adapter = mpAdapter as AxiosAdapter;

// 创建一个axios实例,配置请求
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> => {
    const token = uni.getStorageSync(TOKEN_KEY);
    config.headers.Authorization = token ? `Bearer ${token}` : '';
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
    if (error.message.includes("Network Error")) {
      ShowToast("网络异常", "error");
    } else if (error.response && error.response.status === 401) {
      ShowToast("请登录", "error");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;