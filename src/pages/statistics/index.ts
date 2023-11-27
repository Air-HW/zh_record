/*
 * @Author: 张书瑞
 * @Date: 2023-11-12 13:40:29
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-11-27 23:02:43
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
  const currDate = new Date(date);
  const nowDate = new Date();
  //获取开始计算日期
  const StartComputeDate = currDate > nowDate ? nowDate :currDate;
  //获取结束计算日期
  const EndComputeDate = currDate > nowDate ? currDate :nowDate;
  let StartComputeMonth = StartComputeDate.getMonth();
  let StartComputeYear = StartComputeDate.getFullYear();
  let endDay = new Date(StartComputeYear, StartComputeMonth + 1, 0).getDate();
  while (StartComputeYear * 12 + StartComputeMonth <= EndComputeDate.getFullYear() * 12 + EndComputeDate.getMonth()) {
    weeksInYear.push({
      name: `${StartComputeYear}年${(StartComputeMonth + 1).toString().padStart(2, '0')}月`,
      startDay: `${StartComputeYear}-${(StartComputeMonth + 1).toString().padStart(2, '0')}-01`,
      endDay: `${StartComputeYear}-${(StartComputeMonth + 1).toString().padStart(2, '0')}-${endDay.toString().padStart(2, '0')}`
    });
    StartComputeMonth++;
    if (StartComputeMonth > 11) {
      StartComputeMonth = 0;
      StartComputeYear++;
    }
    endDay = new Date(StartComputeYear, StartComputeMonth + 1, 0).getDate();
  }
  return weeksInYear;
}

/**
 * 获取指定日期到当前时间的所有周期
 * @param date 指定日期
 * @returns 
 */
export function getWeeksInDate(date: string): WeeksInYear[] {
  const Weeks: WeeksInYear[] = [];
  const dateNow = new Date();
  const currDate = new Date(date);
  //最早的记录日期
  //注明：如果传入的日期大于当前日期，则最早的记录日期赋值为当前时间，反正赋值为传入的日期
  const StartRecordDate = currDate > dateNow ? dateNow : currDate;
  const StartRecordYear = StartRecordDate.getFullYear();
  let StartRecordDay = StartRecordDate.getDay();
  while (StartRecordDay !== 1) {
    StartRecordDate.setDate(StartRecordDate.getDate() - 1);
    StartRecordDay = StartRecordDate.getDay();
  }

  //获取开始计算日期
  const StartComputeData = new Date(StartRecordYear, 0, 1);
  let StartComputeDay = StartComputeData.getDay();
  while (StartComputeDay !== 1) {
    StartComputeData.setDate(StartComputeData.getDate() - 1);
    StartComputeDay = StartComputeData.getDay();
  }

  //获取结束计算日期
  //注明：如果传入的日期大于当前日期，则结束计算日期赋值为传入的日期，反正赋值为当前时间
  const EndComputeData = currDate > dateNow ? currDate : new Date();
  let EndComputeDay = EndComputeData.getDay();
  while (EndComputeDay !== 0) {
    EndComputeData.setDate(EndComputeData.getDate() + 1);
    EndComputeDay = EndComputeData.getDay();
  }

  let weekNumber = 0;
  let weekYear = StartComputeData.getFullYear();
  while (StartComputeData <= EndComputeData) {
    const year = StartComputeData.getFullYear();
    if (year !== weekYear) {
      weekYear = StartComputeData.getFullYear();
      weekNumber = 0;
    }
    weekNumber++;
    const EndDay = new Date(year, StartComputeData.getMonth(), StartComputeData.getDate() + 6);
    Weeks.push({
      name: `${weekYear}年第${weekNumber}周`,
      startDay: formatDate(StartComputeData),
      endDay: formatDate(EndDay)
    });
    StartComputeData.setDate(StartComputeData.getDate() + 7);
  }
  const ReturnWeeks = Weeks.filter(s => new Date(s.startDay) >= StartRecordDate);
  ReturnWeeks.map(s => {
    var startDay = new Date(`${s.startDay} 00:00:00`);
    var endDay = new Date(`${s.endDay} 23:59:59`);
    if (startDay <= dateNow && endDay >= dateNow) {
      s.name = '本周'
    }
    return s;
  })
  return ReturnWeeks;
}

/**
 * 获取指定日期到当前时间的所有年份
 * @param date 指定日期
 * @returns 
 */
export function getYearsInDate(date: string): WeeksInYear[] {

  const weeksInYear: WeeksInYear[] = [];
  const currDateYear = new Date(date).getFullYear();
  const nowDateYear = new Date().getFullYear();
  //获取开始计算年份
  const StartComputeYear = currDateYear <= nowDateYear ? currDateYear : nowDateYear;
  //获取结束计算年份
  const EndComputeYear = currDateYear <= nowDateYear ? nowDateYear : currDateYear;
  const DifYear = EndComputeYear - StartComputeYear;
  for (let index = 0; index <= DifYear; index++) {
    const year = StartComputeYear + index;
    weeksInYear.push({
      name: `${year}`,
      startDay: `${StartComputeYear}-01-01`,
      endDay: `${year}-12-31`
    });
  }
  return weeksInYear;
}