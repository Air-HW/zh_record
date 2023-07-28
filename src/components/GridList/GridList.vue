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
  <u-popup :show="show" :safeAreaInsetBottom="false" :round="10" mode="bottom" @close="close">
    <view class="formStyle">
      <u-form :model="model.formData" @submit="submitForm" class="form">
        <u-form-item label="姓名" label-width="80px" class="form-item">
          <u-input v-model="model.formData.name" placeholder="请输入姓名" class="input"></u-input>
        </u-form-item>
        <u-form-item label="邮箱" label-width="80px" class="form-item">
          <u-input v-model="model.formData.email" :borderBottom="true" placeholder="请输入邮箱" class="input"></u-input>
          <template #right>
            <u-button type="primary" size="small">选择日期</u-button>
          </template>
        </u-form-item>
        <u-button :customStyle="btnStyle" shape="circle" type="primary" @click="submitForm"
          class="submit-btn">提交</u-button>
        <u-button :customStyle="btnStyle" shape="circle" type="error" @click="claarForm" class="clear-btn">清除</u-button>
      </u-form>
    </view>
  </u-popup>
</template>
<script setup lang="ts">
import { defineProps, reactive, ref } from 'vue';
interface GridListItem {
  title: string;
  url: string;
};
defineProps({
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

const model = reactive({
  formData: {
    name: '',
    email: '',
  }
});

const submitForm = async () => {
  console.log(model.formData.name)
  console.log(model.formData.email)
}

const claarForm = async () => {
  for (const key in model.formData) {
    if (Object.hasOwnProperty.call(model.formData, key)) {
      model.formData[key] = '';
    }
  }
}
const btnStyle = reactive({
  marginBottom: '10px'
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

.formStyle {
  margin: 15px 15px;
  border: 1px solid red;
}</style>