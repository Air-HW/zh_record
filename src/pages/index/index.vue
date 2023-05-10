<!--
 * @Author: 张书瑞
 * @Date: 2023-05-09 20:18:04
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-05-09 23:57:11
 * @FilePath: \zh_record\src\pages\index\index.vue
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
-->
<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <u-button type="primary" loading loadingText="加载中"></u-button>
  </view>
  <u-tabbar :value="value1" @change="change1" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true">
    <u-tabbar-item name="首页" text="首页" icon="home"></u-tabbar-item>
    <u-tabbar-item name="放映厅" text="放映厅" icon="photo"></u-tabbar-item>
    <u-tabbar-item name="直播" text="直播" icon="play-right"></u-tabbar-item>
    <u-tabbar-item name="我的" text="我的" icon="account"></u-tabbar-item>
  </u-tabbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value1 = ref("首页")
async function change1(e) {
  value1.value = e;
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}
</style>
