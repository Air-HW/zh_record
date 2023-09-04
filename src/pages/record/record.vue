<!--
 * @Author: 张书瑞
 * @Date: 2023-08-20 18:13:26
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-09-03 22:40:58
 * @FilePath: \zh_record\src\pages\record\record.vue
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
-->
<template>
  <view class="container">
    <view class="container_record">
      <view class="container_record_frist">
        <view class="container_record_frist_left">
          <text style="font-size: 40rpx;" v-if="show">{{ record }}</text>
          <input @input="onKeyInput" focus :value="record" class="inputStyple" v-if="!show" />
          <u-icon name="edit-pen" color="#2979ff" v-if="show" size="50rpx" @click="edit"></u-icon>
          <u-icon name="checkmark" color="#2979ff" v-if="!show" size="50rpx" @click="save"></u-icon>
        </view>
        <view class="container_record_frist_right">
          <u-avatar-group max-count="3" :urls="urls" size="70rpx" gap="0.5"></u-avatar-group>
        </view>
      </view>
      <view class="container_record_two">
        <u-button type="primary" shape="circle" :customStyle="customStyle" text="分享"></u-button>
        <u-button type="primary" shape="circle" :plain="plainyBtn" :customStyle="customStyle" text="默认"></u-button>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
const record = ref("我的账本");
const urls = reactive([
  'https://cdn.uviewui.com/uview/album/1.jpg',
  'https://cdn.uviewui.com/uview/album/2.jpg',
  'https://cdn.uviewui.com/uview/album/3.jpg'
]);
const customStyle = reactive({
  width: '200rpx',
  fontSize: "100rpx"
});
const show = ref(true);
const plainyBtn = ref(true);
const edit = () => {
  show.value = false;
}
const save = () => {
  show.value = true;
}
const onKeyInput = (event) => {
  record.value = event.detail.value
}
</script>
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &_record {
    border-radius: 20rpx;
    margin-top: 40rpx;
    width: 650rpx;
    height: 300rpx;
    box-shadow: 0rpx 0rpx 40rpx rgba(0, 0, 0, 0.3);

    &_frist {
      height: 150rpx;
      display: flex;
      border-bottom: 1rpx rgb(200, 200, 200) solid;

      &_left {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 2;
      }

      &_right {
        display: flex;
        align-items: center;
        flex: 1;
      }
    }

    &_two {
      height: 150rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.inputStyple {
  font-size: 40rpx;
  width: 170rpx;
}
</style>