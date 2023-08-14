<!--
 * @Author: 张书瑞
 * @Date: 2023-06-11 22:50:42
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-08-14 23:33:10
 * @FilePath: \zh_record\src\components\GridList\GridList.vue
 * @Description: 收入、支出宫格组件
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
-->
<template>
  <u-grid :border="false" col="4">
    <u-grid-item v-for="(item, index) in list" :key="index" @click="handleClick(index)">
      <view class="griditem-icon" :class="{ 'griditem-title': index == selectedIndex && selectedIndex !== -1 }">
        <u-icon :name="item.url" :size="40"></u-icon>
      </view>
      <text class="grid-text">{{ item.title }}</text>
    </u-grid-item>
  </u-grid>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { GridListItem } from '../GridList/props'
const props = defineProps({
  list: {
    type: Array as () => GridListItem[],
    required: true,
  },
  listIndex: {
    type: Number,
    default: -1,
    required: true,
  },
});
const emits = defineEmits(['click']);
const selectedIndex = ref<Number>(props.listIndex);
const handleClick = (index: Number) => {
  emits('click', index);
  selectedIndex.value = index;
};
watch(
  () => props.listIndex,
  (newValue, oldValue) => {
    // 在 props.listIndex 变化时执行的操作
    console.log('props.listIndex 变化了', newValue, oldValue);
    selectedIndex.value = newValue;
  }
);
</script>
<style scoped lang="scss">
@import "@/styles/_variables.scss";

.griditem-icon {
  margin-top: 15px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 60px;
  border-radius: 30px;
  background-color: $default-color;
}

.griditem-title {
  background-color: $selection-color;
}

.formStyle {
  margin: 15px 15px;
  border: 1px solid red;
}
</style>