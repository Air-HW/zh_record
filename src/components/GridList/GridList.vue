<!--
 * @Author: 张书瑞
 * @Date: 2023-06-11 22:50:42
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-06-13 22:20:02
 * @FilePath: \zh_record\src\components\GridList\GridList.vue
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
-->
<template>
  <u-grid :border="false" col="4">
    <u-grid-item v-for="(item, index) in list" :key="index" @click="handleClick(index)">
      <view class="griditem-icon" :class="{ 'griditem-title': index == listIndex }">
        <u-icon :name="item.url" :size="40"></u-icon>
      </view>
      <text class="grid-text">{{ item.title }}</text>
    </u-grid-item>
  </u-grid>
  <u-popup :show="show" :round="10" :closeable="true" mode="bottom" @close="close">
    <view style="margin-top: 80rpx;">
      <u-input shape="circle" prefixIcon="rmb" border="surround" v-model="model1.userInfo.name"></u-input>
    </view>
  </u-popup>
</template>
<script setup lang="ts">
import { defineProps, reactive, ref } from 'vue';
interface GridListItem {
  title: string;
  url: string;
};
const props = defineProps({
  list: {
    type: Array as () => GridListItem[],
    required: true,
  }
});
let listIndex = ref(-1)
const handleClick = (index: number) => {
  listIndex.value = index;
  show.value = true;
};
const show = ref(false)
//关闭弹出层
const close = () => {
  show.value = false;
  listIndex.value = -1;
}

const model1 = reactive({
  userInfo: {
    name: 'uview-plus UI',
    sex: '',
  },
});

</script>
<style scoped lang="scss">
.griditem-icon {
  margin-top: 30rpx;
  margin-bottom: 10rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120rpx;
  width: 120rpx;
  border-radius: 60rpx;
  background-color: #b1d7ff;
}

.griditem-title {
  background-color: #3c9cff;
}
</style>