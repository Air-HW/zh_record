/*
 * @Author: 张书瑞
 * @Date: 2023-10-29 22:55:47
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-12-13 22:52:27
 * @FilePath: \zh_record\src\api\demo\user.ts
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */
import { useUserStore } from '@/stores/modules/user';
import { UserInfoResultModel, WxLogin, WxLoginRequestModel } from './model/UserModel';
import { request } from '@/utils/http/unirequest';

enum Api {
  UserInfo = '/api/WxUser/user-info',
  PutUserInfo = '/api/WxUser',
  WxLogin = '/api/WxUser/wx-login',
  RefreshToken = '/api/WxUser/refresh-token'
}

const userStore = useUserStore();

/**
 * 微信用户登录
 * @param params 
 * @returns 
 */
export const wxLogin = async (data: WxLogin) => {
  const response = await request<WxLoginRequestModel>(Api.WxLogin, 'POST', data);
  userStore.setToken(response.data.token);
  userStore.setRefreshToken(response.data.refresh_token);
  return response;
}

/**
 * 获取用户基本信息
 * @param params 
 * @returns 
 */
export const getUserInfo = async () => {
  const response = await request<UserInfoResultModel>(Api.UserInfo, 'GET');
  return response;
}

/**
 * 更新、编辑用户基本信息
 * @param WxUserId 微信用户Id
 * @param data 更新入参
 * @returns
 */
export const updateUserInfo = async (WxUserId: string, data: any) => {
  const response = await request<UserInfoResultModel>(`${Api.PutUserInfo}/${WxUserId}`, 'POST', data);
  return response;
}

/**
 * 刷新请求token
 * @returns
 */
export const getRefreshToken = async () => {
  const response = await request<WxLoginRequestModel>(Api.RefreshToken, 'GET', null, { "_isRefreshToken": true });
  userStore.setToken(response.data.token);
  userStore.setRefreshToken(response.data.refresh_token);
  return response;
}
