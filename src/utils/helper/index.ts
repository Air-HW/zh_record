/*
 * @Author: 张书瑞
 * @Date: 2023-07-30 22:17:48
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-11-19 20:32:23
 * @FilePath: \zh_record\src\utils\helper\index.ts
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */

/**
 * 获取传入时间指定的格式
 * @param date 当前时间
 * @returns 返回"XXXX-XX-XX"格式
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
/**
 * 时间戳转化为年月日
 * @param date 当前时间
 * @returns 返回"XXXX-XX-XX"格式
 */
export function TimeStampFormatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}