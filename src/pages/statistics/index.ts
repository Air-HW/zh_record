/*
 * @Author: 张书瑞
 * @Date: 2023-11-12 13:40:29
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-11-20 21:29:20
 * @FilePath: \zh_record\src\pages\statistics\index.ts
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */
import { formatDate } from "@/utils/helper";

/** 周期渲染实体 */
export interface WeeksInYear {
  /** 第几周 */
  name: string,
  /** 开始时间 */
  startDay: string,
  /** 结束时间 */
  endDay: string,
  /** 数据下标 */
  index?: number
}

/**
 * 获取指定年份的所有周期
 * @param year 年
 * @returns 
 */
export function getWeeksInYear(year: number): WeeksInYear[] {
  const weeks: WeeksInYear[] = [];
  const startDate = new Date(`${year}-01-01`); // 当年的新的一天
  let firstWeekDay = startDate.getDay(); // 1月1日是周几
  while (firstWeekDay !== 1) {
    startDate.setDate(startDate.getDate() + 1);
    firstWeekDay = startDate.getDay();
  }
  const weeksInYear = Math.ceil(365 / 7);
  for (let i = 0; i < weeksInYear; i++) {
    const FristDay = new Date(year, 0, startDate.getDate() + (i * 7));
    const EndDay = new Date(year, 0, startDate.getDate() + (7 * (i + 1) - 1));
    const FristDayStr = formatDate(FristDay);
    if (FristDayStr.slice(0, 4) != year.toString()) break;
    const EndDayStr = formatDate(EndDay);
    const week = <WeeksInYear>({
      name: `第${i + 1}周`,
      startDay: FristDayStr,
      endDay: EndDayStr,
      index: i
    });
    weeks.push(week);
  }
  return weeks;
}

/**
 * 获取指定日期到当前时间的所有月份
 * @param date 指定日期
 * @returns 
 */
export function getMonthInDate(date: string): WeeksInYear[] {
  const weeksInYear: WeeksInYear[] = [];
  const startDate = new Date(date);
  const currentDate = new Date();
  let currentMonth = startDate.getMonth();
  let currentYear = startDate.getFullYear();
  let endDay = new Date(currentYear, currentMonth + 1, 0).getDate();
  while (currentYear * 12 + currentMonth <= currentDate.getFullYear() * 12 + currentDate.getMonth()) {
    weeksInYear.push({
      name: `${currentYear}年${(currentMonth + 1).toString().padStart(2, '0')}月`,
      startDay: `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-01`,
      endDay: `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${endDay.toString().padStart(2, '0')}`
    });
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    endDay = new Date(currentYear, currentMonth + 1, 0).getDate();
  }
  return weeksInYear;
}

/**
 * 获取指定日期到当前时间的所有周期
 * @param date 指定日期
 * @returns 
 */
export function getWeeksInDate(date: string): WeeksInYear[] {
  const weeksInYear: WeeksInYear[] = [];
  const startDate = new Date(date);
  const currentDate = new Date();
  let currentMonth = startDate.getMonth();
  let currentYear = startDate.getFullYear();
  let endDay = new Date(currentYear, currentMonth + 1, 0).getDate();
  while (currentYear * 12 + currentMonth <= currentDate.getFullYear() * 12 + currentDate.getMonth()) {
    weeksInYear.push({
      name: `${currentYear}年${(currentMonth + 1).toString().padStart(2, '0')}月`,
      startDay: `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-01`,
      endDay: `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${endDay.toString().padStart(2, '0')}`
    });
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    endDay = new Date(currentYear, currentMonth + 1, 0).getDate();
  }
  return weeksInYear;
}