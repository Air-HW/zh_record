/*
 * @Author: 张书瑞
 * @Date: 2023-08-06 21:14:42
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-08-06 21:33:07
 * @FilePath: \zh_record\src\types\RequestEntity.ts
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */
/**
 * 支付\收入入参实体
 */
export type PayMent = {
  /**
   * 支付类型
   * 1: 支付
   * 2: 收入
   */
  Type: 1 | 2,
  /**
   * 支付金额
   */
  Money?: number;
  /**
   * 备注
   */
  Remark: string;
  /**
   * 选择日期
   */
  PayDate: string;
}