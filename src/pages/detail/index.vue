<!--
 * @Author: 张书瑞
 * @Date: 2023-05-09 20:18:04
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-06-04 22:39:36
 * @FilePath: \zh_record\src\pages\detail\index.vue
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
-->
<template>
  <view class="content">
    <view class="book">
      <view class="title">
        <view class="titletext-container">
          <text class="titletext">{{ title }}</text>
          <text class="subtitletext">{{ subtitle }}</text>
        </view>
        <image class="icon" :src="icon" />
      </view>
      <view class="detail">
        <view class="detail-card">
          <text class="detailtitle">当月支出(元)</text>
          <view class="moneydetail">
            <u-icon name="rmb" bold="true" size="10" color="white"></u-icon>
            <text>1000.00</text>
          </view>
        </view>
        <view class="detail-card">
          <text class="detailtitle">本月支出(元)</text>
          <view class="moneydetail">
            <u-icon name="rmb" bold="true" size="10" color="white"></u-icon>
            <text>1000.00</text>
          </view>
        </view>
      </view>
    </view>
    <view class="chart">
      hello
    </view>
    <view class="date">
      <view class="datetitle">
        <text :class="{ activeCur: latestActive }"
          :style="{ fontSize: latestActive ? '18px' : '15px', opacity: latestActive ? 1 : 0.5 }"
          @click="latestClick">最新</text>
        <text :class="{ activeCur: byMonthActive }"
          :style="{ fontSize: byMonthActive ? '18px' : '15px', opacity: byMonthActive ? 1 : 0.5 }"
          @click="byMonthActiveClick">按月份</text>
      </view>
      <view class="date-card" v-if="byMonthActive">
        <view class="wrapper">
          <template v-for="item in date" :key="item.key" @click="dateClick(item)">
            <view class="item">
              <view class="card">
                <span class="card-cn">{{ item.dateCn }}</span>
                <span class="card-en">{{ item.dateEn }}</span>
              </view>
            </view>
          </template>
        </view>
      </view>
    </view>
    <view class="paydetail">
      detail
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const date = [{
  key: 1, dateCn: '一月', dateEn: 'Jen'
},
{
  key: 2, dateCn: '二月', dateEn: 'Feb'
},
{
  key: 3, dateCn: '三月', dateEn: 'Mar'
},
{
  key: 4, dateCn: '四月', dateEn: 'Apr'
},
{
  key: 5, dateCn: '五月', dateEn: 'May'
},
{
  key: 6, dateCn: '六月', dateEn: 'Jun'
},
{
  key: 7, dateCn: '七月', dateEn: 'Jul'
},
{
  key: 8, dateCn: '八月', dateEn: 'Aug'
},
{
  key: 9, dateCn: '九月', dateEn: 'Sep'
},
{
  key: 10, dateCn: '十月', dateEn: 'Oct'
},
{
  key: 11, dateCn: '十一月', dateEn: 'Nov'
},
{
  key: 12, dateCn: '十二月', dateEn: 'Dec'
}];
const title = ref("嗨, 小刘");
const subtitle = ref("Good morning!");
const icon = ref("../../static/icon/sun.png");
const latestActive = ref(true);
const byMonthActive = ref(false);
const latestClick = () => {
  latestActive.value = true;
  byMonthActive.value = false;
}
const byMonthActiveClick = () => {
  latestActive.value = false;
  byMonthActive.value = true;
}
const dateClick = (index) => {
  console.log(index)
}
</script>

<style lang="scss" scoped>
.content {
  margin: 0;
  padding: 0;

  .book {
    margin: auto;
    height: 200px;
    border-bottom-left-radius: 20rpx;
    border-bottom-right-radius: 20rpx;
    background-color: #3c9cff;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 30rpx;

      .titletext-container {
        display: flex;
        flex-direction: column;
        margin-right: auto;

        .titletext {
          color: white;
        }

        .subtitletext {
          color: rgba(255, 255, 255, 0.7);
          opacity: 0.7;
        }
      }

      .icon {
        width: 80rpx;
        height: 80rpx;
      }
    }

    .detail {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 30rpx 100rpx;

      .detail-card {

        .detailtitle {
          color: rgba(255, 255, 255, 0.7);
          opacity: 0.7;
          font-size: 20rpx;
        }

        .moneydetail {
          font-size: 40rpx;
          color: white;
          top: -10rpx;
          display: flex;
          align-items: center;
        }
      }
    }
  }

  .chart {
    /* 添加阴影样式 */
    box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.1);
    margin: auto;
    height: 400rpx;
    border-radius: 20rpx;
    width: 85%;
    margin-top: -60rpx;
    margin-bottom: 50rpx;
    background-color: white;
  }

  .date {
    height: 150rpx;
    width: 100%;

    .datetitle {
      padding: 0 30rpx;

      text {
        margin-right: 20rpx;
      }
    }

    .activeCur {
      font-weight: bold;
    }

    .date-card {

      padding: 0 30rpx;

      .wrapper {
        width: 100%;
        white-space: nowrap;
        overflow-x: scroll;
        /* 在 iOS 设备上开启硬件加速，提高滚动流畅度 */
        -webkit-overflow-scrolling: touch;
      }

      .item {
        display: inline-block;
        vertical-align: top;
      }

      .card {
        margin-top: 10rpx;
        margin-right: 20rpx;
        height: 90rpx;
        width: 80rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #3c9cff;
        border-radius: 10rpx;

        .card-cn {
          font-size: 18rpx;
          font-weight: 800;
        }

        .card-en {
          font-size: 8rpx;
          color: white;
          opacity: 0.8;
        }
      }
    }
  }

  .paydetail {
    border: 1rpx solid red;
    height: 1200rpx;
  }
}
</style>
