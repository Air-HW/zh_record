/*
 * @Author: 张书瑞
 * @Date: 2023-10-29 22:55:47
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-10-29 22:58:49
 * @FilePath: \zh_record\src\api\demo\user.ts
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */

import axiosInstance from '@/utils/http/axios';
import { UserInfoResultModel } from './model/UserModel';

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
  const response = await axiosInstance.get<UserInfoResultModel>(Api.UserInfo);
  return response.data;
}

/**
 * 更新、编辑用户基本信息
 * @param WxUserId 微信用户Id
 * @param param 更新入参
 * @returns 
 */
export const putUserInfo = async (WxUserId: string, param: URLSearchParams) => {
  const response = await axiosInstance.put<UserInfoResultModel>(Api.PutUserInfo + "/" + WxUserId, param);
  return response.data;
}