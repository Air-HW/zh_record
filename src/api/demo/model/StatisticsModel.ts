/*
 * @Author: 张书瑞
 * @Date: 2023-11-08 21:39:30
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-11-16 23:35:12
 * @FilePath: \zh_record\src\api\demo\model\StatisticsModel.ts
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */

import { ApiResult } from "@/api/model/baseModel";

/** 明细页面饼图反参 */
export interface ChartData {
  /** 收支类型名称 */
  TypeId: string,
  /** 收支类型Id */
  TypeName: string,
  /** 总金额 */
  Amount: number
}

/** 统计页面饼图反参 */
export interface StatisticsPieData {
  /** 收支类型名称 */
  name: string,
  /** 图标标题 */
  value: number
}

/** 统计页面排行榜反参 */
export interface StatisticsRankData {
  /** 收支类型名称 */
  TypeId: string,
  /** 图标标题 */
  IncomeExpenseName: string,
  /** 图标Url */
  IncomeExpenseUrl: string,
  /** 总金额 */
  Amount: number,
  /** 分类占比 */
  Rang: number
}

/** 统计页面数据入参实体 */
export interface GetStatisticsRankRequestData {
  /** 账本Id */
  Id: string,
  /** 统计开始时间 */
  StartTime: string,
  /** 统计结束时间 */
  EndTime: string,
  /** 收入 or 支出(0 or 1) */
  Type: number
}

/** 统计页面折线图数据入参实体 */
export interface PostStatisticsLineRequestData {
  /** 账本Id */
  Id: string,
  /** 折线图X轴显示的类型（日 or 年） */
  DateType: '日' | '年',
  /** 统计开始时间 */
  StartTime?: string,
  /** 统计结束时间 */
  EndTime?: string,
  /** DateType为年时，此参数当作按年查询 */
  Year: number
}

/** 统计页面排行榜反参 */
export interface StatisticsLineData {
  /** 折线图X轴坐标数据 */
  categories: [],
  /** 折线图数据 */
  series: []
}

export type ChartDataResultModel = ApiResult<ChartData[]>;
export type StatisticsRankResultModel = ApiResult<StatisticsRankData[]>;
export type StatisticsPieResultModel = ApiResult<StatisticsPieData[]>;
export type StatisticsLineResultModel = ApiResult<StatisticsLineData[]>;