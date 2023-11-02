/*
 * @Author: 张书瑞
 * @Date: 2023-10-29 22:55:47
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-11-01 23:53:28
 * @FilePath: \zh_record\src\api\demo\user.ts
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */

import axiosInstance from '@/utils/http/axios';
import { UserInfoResultModel } from './model/UserModel';
import { request } from '@/utils/http/unirequest';

enum Api {
  UserInfo = '/api/WxUser/user-info',
  PutUserInfo = '/api/WxUser'
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

//#region 弃用
/**
 * 更新、编辑用户基本信息
 * @param WxUserId 微信用户Id
 * @param data 更新入参
 * @returns
 */
export const updateUserInfo = async (WxUserId: string, data: any) => {
  const response = await request<UserInfoResultModel>(Api.PutUserInfo + "/" + WxUserId, 'POST', data, { "Content-Type": "application/x-www-form-urlencoded" });
  return response;
}
//#endregion
