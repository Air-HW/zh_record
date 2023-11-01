/*
 * @Author: 张书瑞
 * @Date: 2023-05-09 20:18:04
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-10-13 00:37:25
 * @FilePath: \zh_record\src\main.js
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */

import uviewPlus from '@/uni_modules/uview-plus'
import { createSSRApp } from "vue";
import App from "./App.vue";
import dayjs from "dayjs"
import 'default-passive-events'
import pinia from '@/stores'
export function createApp () {
  const app = createSSRApp(App);
  app.use(pinia)
  app.use(dayjs)
  app.use(uviewPlus)
  return {
    app,
  };
}