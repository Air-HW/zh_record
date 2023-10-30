/*
 * @Author: 张书瑞
 * @Date: 2023-10-12 23:46:44
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-10-29 23:17:35
 * @FilePath: \zh_record\src\stores\modules\user.ts
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */
import { UserInfo } from '@/api/demo/model/UserModel';
import { Default, TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum';
import { defineStore } from 'pinia'
interface UserState {
  userInfo: UserInfo | null | undefined;
  token: string;
  defaultId: string;
}

export const useUserStore = defineStore({
  id: 'wx-user',
  state: (): UserState => ({
    userInfo: null,
    token: null,
    defaultId: null
  }),
  getters: {
    getUser(): UserInfo | null {
      if (this.userInfo) {
        return this.userInfo;
      }
      const userinfo = uni.getStorageSync(USER_INFO_KEY);
      if (userinfo) {
        return JSON.parse(userinfo);
      }
      return null;
    },
    getToken(): string | undefined {
      return this.token || uni.getStorageSync(TOKEN_KEY);
    },
    getDefaultId(): string | undefined {
      return this.defaultId || uni.getStorageSync(Default);
    }
  },
  actions: {
    setUser(info: UserInfo): void {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      // 将用户信息写入到本地存储中
      uni.setStorage({
        key: USER_INFO_KEY,
        data: JSON.stringify(info)
      });
    },
    setToken(token: string): void {
      this.token = token ? token : '';
      uni.setStorage({
        key: TOKEN_KEY,
        data: token
      });
    }
  }
});