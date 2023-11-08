/*
 * @Author: 张书瑞
 * @Date: 2023-10-29 22:44:15
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-11-07 23:20:03
 * @FilePath: \zh_record\src\api\demo\model\RecordModel.ts
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */

import { ApiResult } from "@/api/model/baseModel";

/** 新增收支明细入参实体 */
export interface InsertRecordRequestData {
  /** 账本Id */
  AccountBookId: string,
  /** 微信用户Id */
  WxUserId: string,
  /** 收支类型Id */
  TypeId: string,
  /** 金额 */
  Amount: number,
  /** 备注 */
  Remarks: string,
  /** 记录日期 */
  RecordTime: string
}
/** 收支请求入参实体 */
export interface GetRecordRequestData {
  /** 账本Id */
  Id: string,
  /** 微信用户Id */
  WxUserId: string,
  /** 收支类型Id */
  TypeId?: string,
  /** 年 */
  Year: number,
  /** 月 */
  Month: number,
  /** 金额 */
  Amount?: number,
  /** 备注 */
  Remarks?: string
}
/** 收支返参实体 */
export interface RecordDetail {
  /** 明细Id */
  Id: string,
  /** 微信用户Id */
  WxUserId: string,
  /** 账本Id */
  AccountBookId: string,
  /** 收支类型Id */
  TypeId: string,
  /** 微信用户昵称 */
  NickName: string,
  /** 金额 */
  Amount: number,
  /** 记账日期 */
  RecordTime: Date,
  /** 备注 */
  Remarks: string,
  /** 收入 or 支出(0 or 1) */
  Type: number,
  /** 图标标题 */
  IncomeExpenseName: string,
  /** 图标Url */
  IncomeExpenseUrl: number,
  /** 创建时间 */
  CreationTime: Date
}
export type RecordDetailResultModel = ApiResult<RecordDetail[]>;