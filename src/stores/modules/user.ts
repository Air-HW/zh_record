/*
 * @Author: 张书瑞
 * @Date: 2023-10-12 23:46:44
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-10-12 23:49:42
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
      return this.user;
    }
  },
  actions: {
    setUser(user: User): void {
      this.user = user;
    }
  }
});