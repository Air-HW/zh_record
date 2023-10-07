<!--
 * @Author: 张书瑞
 * @Date: 2023-08-20 18:26:09
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-09-28 20:37:45
 * @FilePath: \zh_record\src\pages\userinfo\userinfo.vue
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
-->
<template>
  <view class="container">
    <view class="container_one">
      <view class="container_one_header">
        <u-avatar class="uavatar" :src="avatar" size="200rpx"></u-avatar>
        <view class="container_one_th">
          <u-icon @click="avatarClick" color="#000" name="photo-fill" size="20"></u-icon>
        </view>
      </view>
    </view>
    <view class="container_two">
      <view class="container_two_recordTitle">
        个人信息
      </view>
      <view class="container_content">
        <view class="container_content_body">
          <text class="container_content_body_title">昵称</text>
          <view class="container_content_body_content">
            <u-input :borderBottom="true" placeholder="昵称" class="input"></u-input>
          </view>
        </view>
        <view class="container_content_body">
          <text class="container_content_body_title">联系电话</text>
          <view class="container_content_body_content">
            <u-input :borderBottom="true" placeholder="联系电话" class="input"></u-input>
          </view>
        </view>
        <view class="container_content_body">
          <text class="container_content_body_title">出生日期</text>
          <view class="container_content_body_content">
            <u-input :borderBottom="true" placeholder="出生日期" class="input"></u-input>
          </view>
        </view>
        <view class="container_content_body">
          <text class="container_content_body_title">性别</text>
          <view class="container_content_body_content">
            <u-input :borderBottom="true" placeholder="性别" class="input"></u-input>
          </view>
        </view>
        <view class="container_content_bottom">
          <u-button shape="circle" type="info" :customStyle="customStyle" class="submit-btn" @click="cancel">取消</u-button>
          <u-button shape="circle" type="primary" :customStyle="customStyle" class="clear-btn">保存</u-button>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
const customStyle = reactive({
  width: '250rpx',
});
const avatar = ref("../../static/home/avatar.jpg");
const avatarClick = () => {
  console.log("头像");
}
const cancel = () => {
  uni.switchTab({
    url: '/pages/home/index'
  });
}
</script>
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  margin: 0px;
}

.container_one {
  border-bottom-left-radius: 30rpx;
  border-bottom-right-radius: 30rpx;
  background-image: linear-gradient(to right, #cbebff, #ddffdd);
  width: 100%;
  height: 300rpx;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &_header {
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &_body {
    margin: auto;
    width: 95%;
    border-radius: 20rpx;
    box-shadow: 0rpx 0rpx 40rpx rgba(0, 0, 0, 0.1);
  }

  &_th {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(214, 213, 255);
    width: 60rpx;
    height: 60rpx;
    border-radius: 30rpx;
    margin-top: 110rpx;
    margin-left: -50rpx;
    z-index: 999;
  }
}

.container_two {
  width: 100%;

  &_recordTitle {
    margin: 20rpx;
    font-size: 40rpx;
  }

  .container_content {
    width: 95%;
    border: 2rpx dashed #ccc;
    border-radius: 30rpx;
    margin: auto;

    &_bottom {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .container_content_body {
      width: 90%;
      margin: auto;
      margin-top: 40rpx;

      &_title {
        font-size: 30rpx;
      }

      &_content {
        margin-top: 20rpx;
      }
    }

    .container_content_bottom {
      margin-top: 20rpx;
      margin-bottom: 20rpx;
    }
  }

}
</style>