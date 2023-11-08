/*
 * @Author: 张书瑞
 * @Date: 2023-11-07 20:31:02
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-11-08 23:40:30
 * @FilePath: \zh_record\src\pages\detail\index.ts
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */

import { RecordDetail } from "@/api/demo/model/RecordModel";
import { ChartData } from "@/api/demo/model/StatisticsModel";
import { WeekDayZn } from "@/enums/WeekDayEnum";

/**
 * 收支数据列表渲染实体
 */
export interface RecordDetailView {
  /** XX月XX日 */
  MonthDay: string,
  /** 星期几 */
  WeekDay: string,
  /** 收入 */
  Income: number,
  /** 支出 */
  Expense: number,
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
    const IncomeAmount = listdata.filter(s => s.Type === 0).reduce((amount, item) => amount + item.Amount, 0);
    const ExpenseAmount = listdata.filter(s => s.Type === 1).reduce((amount, item) => amount + item.Amount, 0);
    return {
      MonthDay: formattedDate(date),
      WeekDay: WeekDayZn[date.getDay()],
      Income: IncomeAmount,
      Expense: ExpenseAmount,
      RecordData: listdata
    };
  });
}

const formattedDate = (date: Date) => {
  const month = date.getMonth() + 1; // 月份从0开始，需要加1  
  const day = date.getDate();
  return `${month}月${day}日`;
};

export const processChartData = (charData: ChartData[]) => {
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