/*
 * @Author: 张书瑞
 * @Date: 2023-05-09 20:18:04
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-08-28 21:51:19
 * @FilePath: \zh_record\vite.config.js
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
  ],
  resolve: {
    alias: {
      '~@': path.resolve(__dirname, './src')
    }
  },
  transpileDependencies: ['uview-plus'],
  //自动注入scss全局变量
  css: {
    preprocessorOptions: {
      // 给 sass-loader 传递选项
      scss: {
        additionalData: `@import "~@/styles/_variables.scss";`
      }
    }
  }
})