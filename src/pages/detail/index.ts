/*
 * @Author: 张书瑞
 * @Date: 2023-11-07 20:31:02
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-11-26 23:09:00
 * @FilePath: \zh_record\src\pages\detail\index.ts
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */

import { RecordDetail } from "@/api/demo/model/RecordModel";
import { ChartData } from "@/api/demo/model/StatisticsModel";
import { WeekDayCn } from "@/enums/WeekDayEnum";

/**
 * 收支数据列表渲染实体
 */
export interface RecordDetailView {
  /** XX月XX日 */
  MonthDay: string,
  /** 星期几 */
  WeekDay: string,
  /** 收入 */
  Income: string,
  /** 支出 */
  Expense: string,
  /** 收支返参实体 */
  RecordData: RecordDetail[]
}

/**
 * 提取数据处理逻辑为渲染列表数据
 * @param data 
 * @returns 
 */
export const processRecordData = (data: RecordDetail[]): RecordDetailView[] => {
  const MonthDayList = [...new Set(data.map(s => s.RecordTime))];
  return MonthDayList.map(key => {
    var date = new Date(key);
    const listdata = data.filter(s => s.RecordTime === key);
    const IncomeAmount = listdata.filter(s => s.Type === 0).reduce((amount, item) => amount + item.Amount, 0).toFixed(2);
    const ExpenseAmount = listdata.filter(s => s.Type === 1).reduce((amount, item) => amount + item.Amount, 0).toFixed(2);
    return {
      MonthDay: formattedDate(date),
      WeekDay: WeekDayCn[date.getDay()],
      Income: IncomeAmount,
      Expense: ExpenseAmount,
      RecordData: listdata
    };
  });
}

/** 月日格式化（xx月xx日） */
const formattedDate = (date: Date) => {
  const month = date.getMonth() + 1; // 月份从0开始，需要加1  
  const day = date.getDate();
  return `${month}月${day}日`;
};

/** 饼图返回格式 */
export const PieChartData = (charData: ChartData[]) => {
  let res = {
    series: [
      {
        data: []
      },
    ],
  };
  res.series[0].data = charData.map(s => {
    return {
      name: s.TypeName,
      value: s.Amount
    }
  })
  return res;
}