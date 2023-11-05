/*
 * @Author: 张书瑞
 * @Date: 2023-10-29 22:44:15
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-11-05 21:56:52
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
  Amount: Number,
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
  TypeId: string,
  /** 金额 */
  Amount: Number,
  /** 备注 */
  Remarks: string
}