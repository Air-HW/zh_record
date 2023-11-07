import { request } from "@/utils/http/unirequest";
import { GetRecordRequestData, RecordDetailResultModel } from "./model/RecordModel";

enum Api {
  GetRecord = '/api/AccountRecord'
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