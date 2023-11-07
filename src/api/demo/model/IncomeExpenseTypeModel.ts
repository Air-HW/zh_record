/*
 * @Author: 张书瑞
 * @Date: 2023-10-29 15:43:40
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-11-07 22:39:39
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
  Type: number,
  Name: string,
  WXUserId: string,
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

/** 自定义收支类型入参 */
export interface CustomRequestData {
  /** 账本Id */
  accountBookId: string,
  /** 微信用户Id */
  wxUserId: string,
  /** 是否为系统默认 */
  isSystemDefault: boolean,
  /** 收支类型 */
  type: number,
  /** 名称 */
  name: string,
  /** 图标Id */
  iconId: string
}

export type IncomeExpenseTypeResultModel = ApiResult<IncomeExpenseTypeList[]>;
export type CustomIncomeExpenseTypeListResultModel = ApiResult<CustomIncomeExpenseTypeList[]>;
