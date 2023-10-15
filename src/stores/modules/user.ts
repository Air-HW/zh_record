/*
 * @Author: 张书瑞
 * @Date: 2023-10-12 23:46:44
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-10-15 15:53:49
 * @FilePath: \zh_record\src\stores\modules\user.ts
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */
import { TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum';
import { defineStore } from 'pinia'
interface UserInfo {
  nickName: string;
  sex: number;
  lastUpdateTime: number;
}
interface UserState {
  userInfo: UserInfo | null | undefined;
  token?: string;
  lastUpdateTime: number;
}

export const useUserStore = defineStore({
  id: 'wx-user',
  state: (): UserState => ({
    userInfo: null,
    token: null,
    lastUpdateTime: 0
  }),
  getters: {
    getUser(): UserInfo | null {
      return this.userInfo || localStorage.getItem(USER_INFO_KEY) || {};
    },
    getToken(): string | undefined {
      return this.token || localStorage.getItem(TOKEN_KEY);
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
      // localStorage.setItem(USER_INFO_KEY, JSON.stringify(info));
    },
    setToken(token: string): void {
      this.token = token ? token : '';
      uni.setStorage({
        key: TOKEN_KEY,
        data: token
      });
      // localStorage.setItem(TOKEN_KEY, token);
    }
  }
});