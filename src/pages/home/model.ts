
/** 微信用户个人信息类型 */
export interface UserInfo {
  /** 微信用户Id */
  Id: string;
  /** 昵称 */
  NickName: string;
  /** 性别 */
  Sex: number;
  /** 电话好嘛 */
  Phone: string;
  OpenID: string;
  /** 微信头像地址 */
  HeadPortraitUrl: string;
  /** 邮箱 */
  Email: string;
  /** 出生日期 */
  BrithDay: Date;
}