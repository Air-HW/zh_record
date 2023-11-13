/*
 * @Author: 张书瑞
 * @Date: 2023-11-12 16:34:16
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-11-12 21:19:51
 * @FilePath: \zh_record\src\api\demo\statistics.ts
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */
import { request } from "@/utils/http/unirequest";
import { GetStatisticsRankRequestData, StatisticsPieResultModel, StatisticsRankResultModel } from "./model/StatisticsModel";

enum Api {
  GetStatisticsRank = '/api/Statistics/get-statistics-rank',
  GetStatisticsPie = '/api/Statistics/get-statistics-pie'
}

/**
 * 获取饼图数据
 * @param params 
 * @returns 
 */
export const getStatisticsRank = async (param: GetStatisticsRankRequestData) => {
  const response = await request<StatisticsRankResultModel>(Api.GetStatisticsRank, 'GET', param);
  return response;
}

/**
 * 获取饼图数据
 * @param params 
 * @returns 
 */
export const getStatisticsPie = async (param: GetStatisticsRankRequestData) => {
  const response = await request<StatisticsPieResultModel>(Api.GetStatisticsPie, 'GET', param);
  return response;
}