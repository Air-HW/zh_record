<!--
 * @Author: 张书瑞
 * @Date: 2023-05-09 20:18:04
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-05-10 21:48:32
 * @FilePath: \zh_record\src\pages\index\index.vue
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
-->
<template>
  <view class="content">
    <view class="logo"> Hello World 小张便旅! </view>
    <u-rate :count="count" v-model="value"></u-rate>
    <u-calendar
      :show="show"
      mode="single"
      @confirm="confirm"
      @close="show = false"
    ></u-calendar>
    <u-button type="primary" @click="show = true">打开</u-button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const show = ref(false);
const count = ref(5);
const value = ref(3);
const confirm = function (e) {
  show.value = false;
  console.log(e[0]);
  console.log(show);
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 350rpx;
  width: 350rpx;
  margin-top: 350rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}
</style>
