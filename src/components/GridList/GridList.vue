<!--
 * @Author: 张书瑞
 * @Date: 2023-06-11 22:50:42
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-07-11 00:51:05
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
    <view style="margin-top: 40px;">
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
  margin-top: 15px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 60px;
  border-radius: 30px;
  background-color: #b1d7ff;
}

.griditem-title {
  background-color: #3c9cff;
}
</style>