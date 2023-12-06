/*
 * @Author: 张书瑞
 * @Date: 2023-11-02 18:35:57
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-12-06 23:50:24
 * @FilePath: \zh_record\src\utils\http\unirequest\index.ts
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */
import { WxLogin } from "@/api/demo/model/UserModel";
import { getRefreshToken, wxLogin } from "@/api/demo/user";
import { TOKEN_KEY } from "@/enums/cacheEnum";
import { LoginProviderEnum } from "@/enums/loginProviderEnum";
import { useUserStore } from "@/stores/modules/user";
import { ShowToast } from "@/utils/toast";

export const BASE_URL = "https://localhost:7234";
const TIMEOUT = 10000;
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
const userStore = useUserStore();

/**
 * 封装request请求
 * @param api 请求地址
 * @param method 请求类型
 * @param data 请求参数
 * @param headers 请求头
 * @param isRefresh 是否为刷新请求
 * @returns 
 */
export const request = <T>(api: string, method: Method, data?: any, header?: object) => {
  uni.showLoading({
    title: "请求中...",
    mask: true
  });
  const url = BASE_URL + api;
  const token = userStore.getToken;
  const refresh_token = userStore.getRefreshToken;
  if (token) {
    header = { ...header, "Authorization": `Bearer ${token}`, "refresh_token": `Bearer ${refresh_token}` }
  }
  //是否为刷新token的请求头
  const { _isRefreshToken } = { ...header };
  if (_isRefreshToken) {
    header = { ...header, "Authorization": `Bearer ${refresh_token}` }
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
      success: async (res) => {
        uni.hideLoading();
        if (res.statusCode === 200) {
          resolve(res.data as T);
        } else if (res.statusCode === 401 && !_isRefreshToken) {
          if (userStore.getToken) {
            try {
              const refToken = await getRefreshToken();
              if (refToken.data.token) {
                header = { ...header, "Authorization": `Bearer ${refToken.data.token}`, "refresh_token": `Bearer ${refToken.data.refresh_token}` }
                // 发起新的请求
                const newData = await new Promise<T>((resolve, reject) => {
                  uni.request({
                    url,
                    method,
                    data,
                    header,
                    timeout: TIMEOUT,
                    dataType: 'json',
                    success: (res) => {
                      resolve(res.data as T);
                    },
                    fail: (err) => {
                      reject(err);
                    }
                  });
                });
                resolve(newData);
              } else {
                uni.clearStorageSync();
                ShowToast("请重新登录", "error");
                reject(res.data);
              }
            } catch (err) {
              uni.clearStorageSync();
              ShowToast("请重新登录", "error");
              reject(err);
            }
          } else {
            uni.clearStorageSync();
            ShowToast("请登录", "error");
            reject(res.data);
          }
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