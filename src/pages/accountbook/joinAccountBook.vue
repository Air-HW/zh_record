<template>
  <view class="container">
    <view class="card">
      <view class="card_content">
        <view>
          <u-row>
            <u-col span="12">
              <view class="header">
                header邀请你加入账单！
              </view>
            </u-col>
          </u-row>
        </view>
        <view>
          <u-row>
            <u-col span="12">
              <view class="body">
                body邀请你加入账单！
              </view>
            </u-col>
          </u-row>
        </view>
        <view class="card_content_foot">
          <u-row>
            <u-col span="5" offset="0.5">
              <u-button type="primary" icon="man-add" text="加入账单" @click="Join" shape="circle"></u-button>
            </u-col>
            <u-col span="5" offset="1">
              <u-button type="error" icon="man-delete" text="拒绝加入" @click="NotJoin" shape="circle"></u-button>
            </u-col>
          </u-row>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
const Join = () => {
  console.log("加入");
}
const NotJoin = () => {
  console.log("拒绝加入");
}
</script>
<style scoped lang="scss">
.container {
  margin-top: 100rpx;
  height: 100%;
  width: 100%;
}

.card {
  height: 500rpx;
  width: 700rpx;
  border: 2rpx dashed #ccc;
  border-radius: 30rpx;
  margin: auto;

  &_content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;

    &_foot {
      border: 1rpx solid red;
      margin-top: auto;
      margin-bottom: 20rpx;
    }

    .header {
      border: 1rpx solid red;
      text-align: center;
      height: 100rpx;
    }

    .body {
      border: 1rpx solid red;
      text-align: center;
      margin-top: 30rpx;
    }
  }
}
</style>