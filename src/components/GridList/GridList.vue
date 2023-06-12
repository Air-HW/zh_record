<!--
 * @Author: 张书瑞
 * @Date: 2023-06-11 22:50:42
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-06-12 22:32:55
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
      <u-form labelPosition="left" :model="model1" :rules="rules" ref="form1">
        <u-form-item label="姓名" prop="userInfo.name" :borderBottom="true" ref="item1">
          <u-input shape="circle" border="surround" v-model="model1.userInfo.name"></u-input>
        </u-form-item>
        <u-form-item label="性别" prop="userInfo.sex" borderBottom @click="showSex = true;" ref="item1">
          <u-input shape="circle" v-model="model1.userInfo.sex" disabled disabledColor="#ffffff" placeholder="请选择性别"
            border="surround"></u-input>
          <template #right>
            <u-icon name="arrow-right"></u-icon>
          </template>
        </u-form-item>
      </u-form>
      <u-action-sheet :show="showSex" :actions="actions" title="请选择性别" description="如果选择保密会报错" @close="showSex = false"
        @select="sexSelect">
      </u-action-sheet>
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

const showSex = ref(false)
const model1 = reactive({
  userInfo: {
    name: 'uview-plus UI',
    sex: '',
  },
});
const actions = reactive([{
  name: '男',
},
{
  name: '女',
},
{
  name: '保密',
},
]);
const rules = reactive({
  'userInfo.name': {
    type: 'string',
    required: true,
    message: '请填写姓名',
    trigger: ['blur', 'change']
  },
  'userInfo.sex': {
    type: 'string',
    max: 1,
    required: true,
    message: '请选择男或女',
    trigger: ['blur', 'change']
  }
});
const sexSelect = (e) => {
  model1.userInfo.sex = e.name
  console.log(e)
}

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