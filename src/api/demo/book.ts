import { request } from "@/utils/http/unirequest";
import { BookResultModel, UpdateBookRequestData } from "./model/BookModel";

enum Api {
  GetBook = '/api/AccountBook',
  UpdateBook = '/api/AccountBook'
}

/**
 * 获取当前用户下所有的账本列表
 * @param params 
 * @returns 
 */
export const getBook = async () => {
  const response = await request<BookResultModel>(Api.GetBook, 'GET');
  return response;
}

/**
 * 更新账本信息
 * @param params 
 * @returns 
 */
export const updateBook = async (data: UpdateBookRequestData) => {
  const response = await request<BookResultModel>(`${Api.UpdateBook}/${data.Id}`, 'PUT', data);
  return response;
}