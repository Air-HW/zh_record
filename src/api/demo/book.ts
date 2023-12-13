/*
 * @Author: 张书瑞
 * @Date: 2023-11-04 15:28:53
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-12-13 20:46:27
 * @FilePath: \zh_record\src\api\demo\book.ts
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */
import { request } from "@/utils/http/unirequest";
import { BookResultModel, JoinAccountBookInputRequestData, UpdateBookRequestData } from "./model/BookModel";
import { ApiResult } from "../model/baseModel";

enum Api {
  GetBook = '/api/AccountBook',
  UpdateBook = '/api/AccountBook',
  GetAccountBookDefaultId = '/api/AccountBook/account-book-default',
  JoinAccountBook = '/api/AccountBook/join'
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
 * 获取默认的账本Id
 * @param params 
 * @returns 
 */
export const getBookDefaultId = async () => {
  const response = await request<ApiResult<string>>(Api.GetAccountBookDefaultId, 'GET');
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

/**
 * 更新账本信息
 * @param params 
 * @returns 
 */
export const joinAccountBook = async (data: JoinAccountBookInputRequestData) => {
  const response = await request<ApiResult<boolean>>(Api.JoinAccountBook, 'POST', data);
  return response;
}