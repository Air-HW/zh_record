/*
 * @Author: 张书瑞
 * @Date: 2023-11-02 18:35:57
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-11-28 22:09:37
 * @FilePath: \zh_record\src\utils\http\unirequest\index.ts
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */
import { TOKEN_KEY } from "@/enums/cacheEnum";
import { ShowToast } from "@/utils/toast";

export const BASE_URL = "https://localhost:7234";
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
  uni.showLoading({
    title: "请求中...",
    mask: true
  });
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
        uni.hideLoading();
        if (res.statusCode === 200) {
          resolve(res.data as T);
        } else if (res.statusCode === 401) {
          ShowToast("身份过期，请重新登录", "error");
          reject(res.data);
        } else {
          reject(res.data);
        }
      },
      fail: (err) => {
        uni.hideLoading();
        ShowToast("请求失败", "error");
        reject(err);
      }
    })
  })
}