/*
 * @Author: 张书瑞
 * @Date: 2023-11-12 16:34:16
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-12-06 00:49:39
 * @FilePath: \zh_record\src\api\demo\statistics.ts
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */
import { request } from "@/utils/http/unirequest";
import { GetStatisticsRankRequestData, PostStatisticsLineRequestData, StatisticsLineResultModel, StatisticsPieResultModel, StatisticsRankResultModel } from "./model/StatisticsModel";
import { ApiResult } from "../model/baseModel";

enum Api {
  PostStatisticsRank = '/api/Statistics/statistics-rank',
  PostStatisticsPie = '/api/Statistics/statistics-pie',
  PostStatisticsLine = '/api/Statistics/statistics-line',
  BookEarliest = '/api/AccountBook/book-earliest'
}

/**
 * 获取饼图数据
 * @param params 
 * @returns 
 */
export const postStatisticsRank = async (param: GetStatisticsRankRequestData) => {
  const response = await request<StatisticsRankResultModel>(Api.PostStatisticsRank, 'POST', param);
  return response;
}

/**
 * 获取饼图数据
 * @param params 
 * @returns 
 */
export const postStatisticsPie = async (param: GetStatisticsRankRequestData) => {
  const response = await request<StatisticsPieResultModel>(Api.PostStatisticsPie, 'POST', param);
  return response;
}

/**
 * 获取折线图数据
 * @param params 
 * @returns 
 */
export const postStatisticsLine = async (param: PostStatisticsLineRequestData) => {
  const response = await request<StatisticsLineResultModel>(Api.PostStatisticsLine, 'POST', param);
  return response;
}

/**
 * 获取账本最早记录时间
 * @param params 账本Id
 * @returns 
 */
export const getBookEarliest = async (Id: string) => {
  const response = await request<ApiResult<string>>(`${Api.BookEarliest}/${Id}`, 'GET');
  return response;
}