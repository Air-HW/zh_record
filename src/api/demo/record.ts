/*
 * @Author: 张书瑞
 * @Date: 2023-11-05 20:43:38
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-11-08 21:41:02
 * @FilePath: \zh_record\src\api\demo\record.ts
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */
import { request } from "@/utils/http/unirequest";
import { GetRecordRequestData, RecordDetailResultModel } from "./model/RecordModel";
import { ChartDataResultModel } from "./model/StatisticsModel";

enum Api {
  GetRecord = '/api/AccountRecord',
  GetChart = '/api/Statistics/get-detail-chart'
}

/**
 * 获取指定账本明细
 * @param params 
 * @returns 
 */
export const getRecord = async (param: GetRecordRequestData) => {
  const response = await request<RecordDetailResultModel>(Api.GetRecord, 'GET', param);
  return response;
}

/**
 * 获取饼图数据
 * @param params 
 * @returns 
 */
export const getChartData = async (param: GetRecordRequestData) => {
  const response = await request<ChartDataResultModel>(Api.GetChart, 'GET', param);
  return response;
}