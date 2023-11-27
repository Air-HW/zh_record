/*
 * @Author: 张书瑞
 * @Date: 2023-10-29 15:37:29
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-11-26 22:57:00
 * @FilePath: \zh_record\src\api\demo\list.ts
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */
import axiosInstance from '@/utils/http/axios';
import { CustomIncomeExpenseTypeListResultModel, CustomRequestData, IncomeExpenseTypeResultModel } from './model/IncomeExpenseTypeModel';
import { ApiResult } from '../model/baseModel';
import { InsertOrUpdateRecordRequestData } from './model/RecordModel';
import { request } from '@/utils/http/unirequest';

enum Api {
  IncomeExpenseType = '/api/IncomeExpenseType',
  InsertAccountRecord = '/api/AccountRecord',
  CustomIncomeExpenseType = '/api/IncomeExpenseType/icon',
  InsertCustomIncomeExpenseType = '/api/IncomeExpenseType',
  UpdateAccountRecord = '/api/AccountRecord',
  DeleteAccountRecord = '/api/AccountRecord',
}

/**
 * 获取收入支出数据
 * @param params 
 * @returns 
 */
export const getIncomeExpenseType = async (params?: any) => {
  const response = await request<IncomeExpenseTypeResultModel>(Api.IncomeExpenseType, 'GET', params);
  return response;
}

/**
 * 新增账单明细
 * @param params 收支入参
 * @returns 
 */
export const insertAccountRecord = async (params: InsertOrUpdateRecordRequestData) => {
  const response = await request<ApiResult<boolean>>(Api.InsertAccountRecord, 'POST', params);
  return response;
}

/**
 * 修改账单明细
 * @param Id 明细Id
 * @param params 收支入参
 * @returns
 */
export const updateAccountRecord = async (Id: string, params: InsertOrUpdateRecordRequestData) => {
  const response = await request<ApiResult<boolean>>(`${Api.UpdateAccountRecord}/${Id}`, 'PUT', params);
  return response;
}

/**
 * 删除账单明细
 * @param Id 明细Id
 * @param params 收支入参
 * @returns
 */
export const deleteAccountRecord = async (Id: string) => {
  const response = await request<ApiResult<boolean>>(`${Api.DeleteAccountRecord}/${Id}`, 'DELETE');
  return response;
}

/**
 * 获取自定义收支类型
 * @param params 
 * @returns 
 */
export const getCustomIncomeExpenseType = async () => {
  const response = await request<CustomIncomeExpenseTypeListResultModel>(Api.CustomIncomeExpenseType, 'GET');
  return response;
}

/**
 * 新增用户自定义收支类型
 * @param params 自定义收支入参
 * @returns 
 */
export const insertCustomIncomeExpenseType = async (params: CustomRequestData) => {
  const response = await request<ApiResult<boolean>>(Api.InsertCustomIncomeExpenseType, 'POST', params);
  return response;
}