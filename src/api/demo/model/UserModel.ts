/*
 * @Author: 张书瑞
 * @Date: 2023-10-29 22:57:36
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-10-31 22:49:30
 * @FilePath: \zh_record\src\api\demo\model\UserModel.ts
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */
import { ApiResult } from "@/api/model/baseModel";

/** 微信用户个人信息类型 */
export interface UserInfo {
  /** 微信用户Id */
  Id: string;
  /** 昵称 */
  NickName: string;
  /** 性别 */
  Sex: number;
  /** 电话号码 */
  Phone: string;
  OpenID: string;
  /** 微信头像地址 */
  HeadPortraitUrl: string;
  /** 邮箱 */
  Email: string;
  /** 出生日期 */
  BrithDay: Date;
}

export type UserInfoResultModel = ApiResult<UserInfo>;