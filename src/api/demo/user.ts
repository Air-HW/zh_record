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
import { ApiResult } from '../model/baseModel';
import { UserInfoResultModel } from './model/UserModel';

enum Api {
  UserInfo = '/api/WxUser/user-info'
}

/**
 * 获取收入支出数据
 * @param params 
 * @returns 
 */
export const getUserInfo = async () => {
  const response = await axiosInstance.get<UserInfoResultModel>(Api.UserInfo);
  return response.data;
}