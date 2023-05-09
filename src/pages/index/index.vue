<template>
  <u-action-sheet :list="{list}"></u-action-sheet>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <u-button text="渐变色按钮" color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"></u-button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
const list = ref([{
  text: '点赞',
  color: 'blue',
  fontSize: 28
}, {
  text: '分享'
}, {
  text: '评论'
}])
const show = ref(true)
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

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
