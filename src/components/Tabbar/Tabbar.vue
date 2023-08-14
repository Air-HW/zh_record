<!--
 * @Author: 张书瑞
 * @Date: 2023-08-15 00:04:04
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-08-15 00:05:55
 * @FilePath: \zh_record\src\components\Tabbar\Tabbar.vue
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
-->
<template>
  <u-tabbar :value="value1" @change="change1" :fixed="false" :placeholder="false" :safeAreaInsetBottom="false">
    <u-tabbar-item text="首页" icon="home" @click="click1"></u-tabbar-item>
    <u-tabbar-item text="放映厅" icon="photo" @click="click1"></u-tabbar-item>
    <u-tabbar-item text="直播" icon="play-right" @click="click1"></u-tabbar-item>
    <u-tabbar-item text="我的" icon="account" @click="click1"></u-tabbar-item>
  </u-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref("");
const click1 = (e) => {
  console.log('click1', e);
}
const change1 = (e) => {
  console.log('change1', e);
}
</script>