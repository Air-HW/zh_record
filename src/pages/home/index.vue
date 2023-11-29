<!--
 * @Author: 张书瑞
 * @Date: 2023-05-10 21:40:01
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-11-29 00:47:42
 * @FilePath: \zh_record\src\pages\home\index.vue
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
-->
<template>
  <view class="bgMain">

  </view>
  <view class="avatar">
    <view class="avatar_header">
      <u-avatar class="uavatar" :src="userData.HeadPortraitUrl" size="160rpx" @click="login">
      </u-avatar>
    </view>
    <view class="avatar_body">
      <u-cell-group>
        <u-cell title="个人信息" @click="userinfoCilck" isLink>
          <template #icon>
            <u-icon size="26" color="#3c9cff" name="account-fill"></u-icon>
          </template>
        </u-cell>
        <u-cell title="我的账本" @click="accountbookCilck" isLink>
          <template #icon>
            <u-icon size="26" color="#3c9cff" name="list-dot"></u-icon>
          </template>
        </u-cell>
        <u-cell title="账单导出" isLink>
          <template #icon>
            <u-icon size="26" color="#3c9cff" name="share-square"></u-icon>
          </template>
        </u-cell>
        <u-cell title="我的签到" isLink>
          <template #icon>
            <u-icon size="26" color="#3c9cff" name="checkbox-mark"></u-icon>
          </template>
        </u-cell>
        <u-cell title="分享朋友" :clickable="false">
          <template #icon>
            <u-icon size="26" color="#3c9cff" name="moments"></u-icon>
          </template>
        </u-cell>
        <u-cell title="大爷，赏个铜板呗！" :clickable="false" @click="PayCodeOpen">
          <template #icon>
            <u-icon size="26" color="#3c9cff" name="red-packet"></u-icon>
          </template>
        </u-cell>
      </u-cell-group>
    </view>
    <u-popup :show="PayCodeShow" mode="center" @close="PayCodeClose">
      <view class="paycode">
        <image :src="PayCode" style="width: 100%; height: 100%; object-fit: cover;"></image>
      </view>
    </u-popup>
  </view>
</template>
<script setup lang="ts">
import { getUserInfo } from '@/api/demo/user';
import { useUserStore } from '@/stores/modules/user';
import { ref } from 'vue';
import { UserInfo } from '@/api/demo/model/UserModel';
import { onShow } from '@dcloudio/uni-app';
import { LoginProviderEnum } from '@/enums/loginProviderEnum';
const userStore = useUserStore();
const userData = ref<UserInfo>({
  Id: null,
  NickName: null,
  Sex: 0,
  Phone: null,
  OpenID: null,
  HeadPortraitUrl: null,
  Email: null,
  BrithDay: null
})
onShow(async () => {
  if (userData.value.Id === null) {
    const res = await getUserInfo();
    if (res.isSuccess) {
      userStore.setUser(res.data);
      userData.value = res.data;
    }
  } else {
    userData.value = { ...userStore.getUser };
  }
})
const login = () => {
  //#region 登录
  uni.login({
    provider: LoginProviderEnum.微信,
    success: (res) => {
      console.log('微信登录成功', res.code)
    },
    fail: (res) => {
      console.log('微信登录失败', res)
    }
  });
  uni.getUserProfile({
    provider: LoginProviderEnum.微信,
    desc: "授权登录",
    success: (info) => {
      console.log(info.userInfo);
    },
    fail: (infoerror) => {
      console.log('getUserProfile', infoerror)
    }
  })
  //#endregion
}
const PayCode = ref("../../static/home/PayCode.jpg");
const PayCodeShow = ref(false);
const PayCodeOpen = () => {
  PayCodeShow.value = true;
}
const PayCodeClose = () => {
  PayCodeShow.value = false;
}
const accountbookCilck = () => {
  uni.navigateTo({
    url: "/pages/accountbook/accountbook"
  });
}
const userinfoCilck = () => {
  uni.navigateTo({
    url: "/pages/userinfo/userinfo"
  });
}
</script>
<style scoped lang="scss">
.bgMain {
  position: relative;
  height: 300rpx;
  // background-image: url("../../static/home/bj.jpg");
  background-image: linear-gradient(to right, #3ab3ff, #ddffdd);
  background-size: cover;
  background-position: center center;
  border-bottom-left-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
}

.bgMain::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.5); // 设置透明度和颜色值
  backdrop-filter: blur(4rpx); // 添加模糊效果，可以根据需要调整模糊程度
  border-bottom-left-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
}

.avatar {
  margin: auto;
  display: flex;
  flex-direction: column;
  margin-top: -90rpx;

  &_header {
    border: 1rpx solid red;
    z-index: 1;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    width: 160rpx;
    height: 160rpx;
    margin: auto;
    border-radius: 50%;
    border: 12rpx #ffff solid;
  }

  &_body {
    margin: auto;
    width: 95%;
    border-radius: 20rpx;
    box-shadow: 0rpx 0rpx 40rpx rgba(0, 0, 0, 0.1);
  }
}

.paycode {
  width: 600rpx;
  height: 600rpx;
}
</style>