/*
 * @Author: 张书瑞
 * @Date: 2023-10-29 15:37:29
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-10-29 22:04:41
 * @FilePath: \zh_record\src\api\demo\list.ts
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */
import axiosInstance from '@/utils/http/axios';
import { CustomIncomeExpenseTypeListResultModel, IncomeExpenseTypeResultModel } from './model/IncomeExpenseTypeModel';
import { ApiResult } from '../model/baseModel';

enum Api {
  IncomeExpenseType = '/api/IncomeExpenseType',
  InsertAccountRecord = '/api/AccountRecord',
  CustomIncomeExpenseType = '/api/IncomeExpenseType/icon',
  InsetCustomIncomeExpenseType = '/api/IncomeExpenseType',
}

/**
 * 获取收入支出数据
 * @param params 
 * @returns 
 */
export const getIncomeExpenseType = async (params?: any) => {
  const response = await axiosInstance.get<IncomeExpenseTypeResultModel>(Api.IncomeExpenseType, { params });
  return response.data;
}

/**
 * 新增账单明细
 * @param params 
 * @returns 
 */
export const insertAccountRecord = async (params: any) => {
  const response = await axiosInstance.post<ApiResult<boolean>>(Api.InsertAccountRecord, params);
  return response.data;
}

/**
 * 获取自定义收支类型
 * @param params 
 * @returns 
 */
export const getCustomIncomeExpenseType = async () => {
  const response = await axiosInstance.get<CustomIncomeExpenseTypeListResultModel>(Api.CustomIncomeExpenseType);
  return response.data;
}

/**
 * 新增账单明细
 * @param params 
 * @returns 
 */
export const insertCustomIncomeExpenseType = async (params: any) => {
  const response = await axiosInstance.post<ApiResult<boolean>>(Api.InsetCustomIncomeExpenseType, params);
  return response.data;
}