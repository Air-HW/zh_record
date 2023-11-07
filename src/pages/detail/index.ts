/*
 * @Author: 张书瑞
 * @Date: 2023-11-07 20:31:02
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-11-07 23:18:05
 * @FilePath: \zh_record\src\pages\detail\index.ts
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */

import { RecordDetail } from "@/api/demo/model/RecordModel";

/**
 * 收支数据列表渲染实体
 */
export interface RecordDetailView {
  MonthDay: string,
  /** 收入 */
  Income: number,
  /** 支出 */
  Expense: number,
  /** 收支返参实体 */
  RecordData: RecordDetail[]
}

// 提取数据处理逻辑为一个独立的函数
export const processRecordData = (data: RecordDetail[]): RecordDetailView[] => {
  const recordDetailList = [];
  const MonthDayList = [...new Set(data.map(s => s.RecordTime))];
  MonthDayList.forEach(key => {
    const listdata = data.filter(s => s.RecordTime === key);
    const IncomeAmount = listdata.filter(s => s.Type === 0).reduce((amount, item) => amount + item.Amount, 0) / 100;
    const ExpenseAmount = listdata.filter(s => s.Type === 1).reduce((amount, item) => amount + item.Amount, 0) / 100;
    const recordDetail = {
      MonthDay: key,
      Income: IncomeAmount,
      Expense: ExpenseAmount,
      RecordData: listdata
    };
    recordDetailList.push(recordDetail);
  });
  return recordDetailList;
}