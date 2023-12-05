/*
 * @Author: 张书瑞
 * @Date: 2023-10-29 22:57:36
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-12-03 21:51:47
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
  BrithDay: string;
}

/** 微信用户登录入参 */
export interface WxLogin {
  /** 登录凭证（code） */
  Code: string
}

/** 微信用户登录反参 */
export interface WxLoginRequestData {
  /** 接口请求token */
  token: string,
  /** 过期时间 */
  expires_in: string,
  /** token类型 */
  token_type: string
}

export type UserInfoResultModel = ApiResult<UserInfo>;
export type WxLoginRequestModel = ApiResult<WxLoginRequestData>;