/*
 * @Author: 张书瑞
 * @Date: 2023-11-08 21:39:30
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-11-08 21:40:23
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
export type ChartDataResultModel = ApiResult<ChartData[]>;