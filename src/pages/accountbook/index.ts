
/** 用户关联的所有的账本信息集合 */
export interface BookList {
  /** 账本Id */
  Id: string,
  /** 微信用户Id */
  WxUserId: string,
  /** 账本名称 */
  Title: string,
  /** 是否为默认账本 */
  IsDefault: Boolean,
  /** 是否点击了编辑Icon */
  IsEdit: Boolean,
  /** 微信用户头像组 */
  HeadPortraitUrlList: string[]
}