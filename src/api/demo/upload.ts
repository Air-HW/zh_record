/*
 * @Author: 张书瑞
 * @Date: 2023-12-05 22:02:42
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-12-05 23:40:13
 * @FilePath: \zh_record\src\api\demo\upload.ts
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */

import { useUserStore } from "@/stores/modules/user";
import { BASE_URL } from "@/utils/http/unirequest";
import { ApiResult } from "../model/baseModel";

enum Api {
  SingleUpload = '/api/Upload/single-upload'
}
/**
 * 图片上传
 * @param filePath 
 * @returns 返回图片网络路径
 */
export const SingleUpload = async (filePath: any): Promise<string> => {
  const userStore = useUserStore();
  const url = `${BASE_URL}${Api.SingleUpload}`;
  const header = {
    "Authorization": `Bearer ${userStore.getToken}`
  };
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url,
      filePath,
      name: 'file',
      header,
      success: (res) => {
        if (res.statusCode == 200) {
          const data = JSON.parse(res.data) as ApiResult<string>;
          resolve(data.data);
        } else {
          reject(res);
        }
      },
      fail: (err) => {
        reject(err.errMsg);
      }
    });
  });
}
