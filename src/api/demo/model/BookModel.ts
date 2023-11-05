import { ApiResult } from "@/api/model/baseModel";


/** 用户关联的所有的账本信息集合 */
export interface BookModel {
  /** 账本Id */
  Id: string,
  /** 账本拥有者微信用户Id */
  WxUserId: string,
  /** 账本名称 */
  Title: string,
  /** 是否为默认账本 */
  IsDefault: Boolean,
  /** 关联账本的全部用户信息 */
  WxUserInfo: BookUser[]
}

/** 关联账本的全部用户信息 */
interface BookUser {
  /** 微信用户Id */
  WxUserId: string,
  /** 用户昵称 */
  NickName: string,
  /** 用户头像 */
  HeadPortraitUrl: string
}

/** 更新账本信息 */
export interface UpdateBookRequestData {
  /** 账本Id */
  Id: string,
  /** 账本名称 */
  Titile: string
}

export type BookResultModel = ApiResult<BookModel[]>;