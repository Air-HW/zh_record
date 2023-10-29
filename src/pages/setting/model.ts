/*
 * @Author: 张书瑞
 * @Date: 2023-10-29 22:44:15
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-10-29 22:47:01
 * @FilePath: \zh_record\src\pages\setting\model.ts
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */


/** 自定义收支类型入参 */
export interface CustomData {
  /** 账本Id */
  accountBookId: string,
  /** 微信用户Id */
  wxUserId: string,
  /** 是否为系统默认 */
  isSystemDefault: boolean,
  /** 收支类型 */
  type: Number,
  /** 名称 */
  name: string,
  /** 图标Id */
  iconId: string
}