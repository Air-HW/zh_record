/*
 * @Author: 张书瑞
 * @Date: 2023-10-29 22:44:15
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-10-29 22:52:56
 * @FilePath: \zh_record\src\api\demo\model\RecordModel.ts
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */

/** 收支请求入参类型 */
export interface RecordRequestData {
    /** 账本Id */
    accountBookId: string,
    /** 微信用户Id */
    wxUserId: string,
    /** 收支类型Id */
    typeId: string,
    /** 金额 */
    amount: Number,
    /** 备注 */
    remarks: string,
    /** 记录日期 */
    recordTime: string
  }