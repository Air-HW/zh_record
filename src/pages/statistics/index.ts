/*
 * @Author: 张书瑞
 * @Date: 2023-11-12 13:40:29
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-11-26 23:39:59
 * @FilePath: \zh_record\src\pages\statistics\index.ts
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */
import { get } from "@/api";
import { formatDate } from "@/utils/helper";

/** 周期渲染实体 */
export interface WeeksInYear {
  /** 标题显示值 */
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
  console.log(weeksInYear);
  return weeksInYear;
}

/**
 * 获取指定日期到当前时间的所有周期
 * @param date 指定日期
 * @returns 
 */
export function getWeeksInDate(date: string): WeeksInYear[] {
  const Weeks: WeeksInYear[] = [];
  //最早的记录日期
  const StartRecordDate = new Date(date);
  let StartRecordYear = StartRecordDate.getFullYear();
  let StartRecordDay = StartRecordDate.getDay();
  //获取传入的时间的开始计算日期 例如：2023-05-02则开始计算日期为2023-01-01
  const StartComputeData = new Date(StartRecordDate.getFullYear(), 1, 1);
  //获取结束计算日期
  const EndComputeData = new Date();
  while (StartRecordDay !== 1) {
    StartRecordDate.setDate(StartRecordDate.getDate() - 1);
    StartRecordDay = StartRecordDate.getDay();
  }
  console.log(`${StartRecordDate.getFullYear()}-${StartRecordDate.getMonth() + 1}-${StartRecordDate.getDate()}`);
  console.log(StartRecordDate.getTime());
  const sss = new Date(StartRecordDate.getTime() + 6 * 24 * 60 * 60 * 1000);
  console.log(`${sss.getFullYear()}-${sss.getMonth() + 1}-${sss.getDate()}`);
  console.log(sss.getTime());




  // const startDate = new Date(date);
  // const startYear = new Date(startDate.getFullYear(),1,1);
  // const EndDate = new Date();
  // let day = startDate.getDay();
  // while (day !== 1) {
  //   startDate.setDate(startDate.getDate() - 1);
  //   day = startDate.getDay();
  // }
  // // 将时间戳转换为天数差异
  // var diffTime = Math.abs(EndDate.getTime() - startDate.getTime());
  // var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  // // 计算总周数
  // var totalWeeks = Math.ceil(diffDays / 7);
  // for (let i = 0; i < totalWeeks; i++) {
  //   const year = startDate.getFullYear();
  //   const FristDay = new Date(year, 0, startDate.getDate() + (i * 7));
  //   const EndDay = new Date(year, 0, startDate.getDate() + (7 * (i + 1) - 1));
  //   const FristDayStr = formatDate(FristDay);
  //   if (FristDayStr.slice(0, 4) != year.toString()) break;
  //   const EndDayStr = formatDate(EndDay);
  //   const week = <WeeksInYear>({
  //     name: `${FristDay.getFullYear()}年第${i + 1}周`,
  //     startDay: FristDayStr,
  //     endDay: EndDayStr,
  //     index: i
  //   });
  //   weeks.push(week);
  // }
  // console.log(weeks);
  return Weeks;
}

/**
 * 获取指定日期到当前时间的所有年份
 * @param date 指定日期
 * @returns 
 */
export function getYearsInDate(date: string): WeeksInYear[] {
  const weeksInYear: WeeksInYear[] = [];
  const now = new Date();
  const startDate = new Date(date);
  //最早年份
  const EarliestYear = startDate.getFullYear();
  //最新年份
  const LastYear = now.getFullYear();
  const DifYear = LastYear - EarliestYear;
  for (let index = 0; index <= DifYear; index++) {
    const year = LastYear + index;
    weeksInYear.push({
      name: `${year}`,
      startDay: `${LastYear}-01-01`,
      endDay: `${year}-12-31`
    });
  }
  return weeksInYear;
}