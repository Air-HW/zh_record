/*
 * @Author: 张书瑞
 * @Date: 2023-10-12 23:46:44
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-10-13 00:47:30
 * @FilePath: \zh_record\src\stores\modules\user.ts
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
 */
import { defineStore } from 'pinia'
interface User {
  nickName: string;
  sex: number;
}
export const useUserStore = defineStore('user', {
  state: (): { user: User | null } => ({
    user: null
  }),
  getters: {
    getUser(): User | null {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        return JSON.parse(userStr) as User;
      }
      return this.user;
    }
  },
  actions: {
    setUser(user: User): void {
      // 将用户信息写入到本地存储中
      localStorage.setItem('user', JSON.stringify(user));
      this.user = user;
    }
  }
});