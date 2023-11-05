import { request } from "@/utils/http/unirequest";
import { GetRecordRequestData, RecordResultModel } from "./model/RecordModel";

enum Api {
  GetRecord = '/api/AccountRecord'
}

/**
 * 获取指定账本明细
 * @param params 
 * @returns 
 */
export const getRecord = async (param: GetRecordRequestData) => {
  const response = await request<RecordResultModel>(Api.GetRecord, 'GET', param);
  return response;
}