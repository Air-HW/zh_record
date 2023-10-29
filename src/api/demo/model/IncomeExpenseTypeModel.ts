/*
 * @Author: 张书瑞
 * @Date: 2023-10-29 15:43:40
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-10-29 16:43:24
 * @FilePath: \zh_record\src\api\demo\model\IncomeExpenseTypeModel.ts
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */

import { ApiResult } from "@/api/model/baseModel";

/**
 * 收入、支出数据接收实体
 */
export interface IncomeExpenseTypeList {
  Id: string,
  Type: Number,
  Name: string,
  WXUserId: Number | null | undefined,
  IsSystemDefault: boolean,
  ImageUrl: string
}

/**
 * 自定义收支类型
 */
export interface CustomIncomeExpenseTypeList {
  Id: string,
  ImageUrl: string,
  IsCustom: boolean
}

export type IncomeExpenseTypeResultModel = ApiResult<IncomeExpenseTypeList[]>;
export type CustomIncomeExpenseTypeListResultModel = ApiResult<CustomIncomeExpenseTypeList[]>;
