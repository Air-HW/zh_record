<!--
 * @Author: 张书瑞
 * @Date: 2023-05-09 20:18:04
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-06-09 00:03:13
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
    <view class="chart" id="echarts">

    </view>
    <view class="date">
      <view class="datetitle">
        <text :class="{ activeCur: latestActive }"
          :style="{ fontSize: latestActive ? '36rpx' : '15rpx', opacity: latestActive ? 1 : 0.5 }"
          @click="latestClick">最新</text>
        <text :class="{ activeCur: byMonthActive }"
          :style="{ fontSize: byMonthActive ? '36rpx' : '15rpx', opacity: byMonthActive ? 1 : 0.5 }"
          @click="byMonthActiveClick">按月份</text>
      </view>
      <view class="date-card" v-if="byMonthActive">
        <view class="wrapper">
          <template v-for="item in date" :key="item.key">
            <view class="item">
              <view class="card" @click="dateClick(item)" :class="item.key == cardCur ? 'cardCur' : ''">
                <span class="card-cn">{{ item.dateCn }}</span>
                <span class="card-en">{{ item.dateEn }}</span>
              </view>
            </view>
          </template>
        </view>
      </view>
    </view>
    <view v-for="item in 3" :key="item">
      <view class="paydetail">
        <view class="detailitem">
          <view class="detailitem-title">
            <view class="detailitem-title-date">
              <text>12月31日</text>
              <text>星期日</text>
            </view>
            <view class="detailitem-title-money">
              <text>支出:</text><u-icon name="rmb" bold="true" size="10"></u-icon><text
                style="font-weight: bold;">10000</text>
            </view>
            <view class="detailitem-title-money">
              <text>收入:</text><u-icon name="rmb" bold="true" size="10"></u-icon><text
                style="font-weight: bold;">10000</text>
            </view>
          </view>
          <view class="detailitem-pay">
            <view class="detailitem-pay-icon">
              <view class="detailitem-pay-iconbac">
                <u-image width="70rpx" height="70rpx" src="~@/static/image/pay/default/交通_white.png"
                  mode="aspectFill"></u-image>
              </view>
            </view>
            <view class="detailitem-pay-title">
              <u-cell size="large" title="明天几点起" :border="false" value="-100.00" label="地铁"></u-cell>
            </view>
          </view>
          <view class="detailitem-pay">
            <view class="detailitem-pay-icon">
              <view class="detailitem-pay-iconbac">
                <u-image width="70rpx" height="70rpx" src="~@/static/image/pay/default/餐饮_white.png"
                  mode="aspectFill"></u-image>
              </view>
            </view>
            <view class="detailitem-pay-title">
              <u-cell size="large" title="明天几点起" :border="false" value="-10.00" label="餐饮"></u-cell>
            </view>
          </view>
          <view class="detailitem-pay">
            <view class="detailitem-pay-icon">
              <view class="detailitem-pay-iconbac">
                <u-image width="70rpx" height="70rpx" src="~@/static/image/pay/default/外卖_white.png"
                  mode="aspectFill"></u-image>
              </view>
            </view>
            <view class="detailitem-pay-title">
              <u-cell size="large" title="明天几点起" :border="false" value="-21.00" label="外卖"></u-cell>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, ref } from "vue";
import * as echarts from 'echarts';
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
const cardCur = ref(1)
onBeforeMount(async () => {
  const now = new Date().getMonth() + 1;
  cardCur.value = now
})
onMounted(async () => {
  type EChartsOption = echarts.EChartsOption;
  var chartDom = document.getElementById('echarts');
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;
  option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center',
      selectedMode: true
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['45%', '80%'],
        startAngle: 180,
        label: {
          show: true,
          fontSize: 12,
          formatter: "{b}: {c}"
        },
        data: [
          { value: 100, name: '购物' },
          { value: 7.5, name: '早餐' },
          { value: 15, name: '晚餐' },
          { value: 20, name: '午餐' },
          { value: 11.4, name: '交通' },
          {
            value: 100 + 7.5 + 15 + 20 + 11.4,
            itemStyle: {
              color: 'none',
              decal: {
                symbol: 'none'
              }
            },
            label: {
              show: false
            }
          }
        ]
      }
    ]
  };
  option && myChart.setOption(option);
})
const latestClick = () => {
  latestActive.value = true;
  byMonthActive.value = false;
}
const byMonthActiveClick = () => {
  latestActive.value = false;
  byMonthActive.value = true;
}
const dateClick = (item: any) => {
  cardCur.value = item.key;
}
</script>

<style lang="scss" scoped>
.content {
  margin: 0;
  padding: 0;

  .book {
    margin: auto;
    height: 400rpx;
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
          // top: -10rpx;
          display: flex;
          align-items: center;
        }
      }
    }
  }

  .chart {
    /* 添加阴影样式 */
    box-shadow: 0rpx 8rpx 10rpx rgba(0, 0, 0, 0.1);
    margin: auto;
    height: 400rpx;
    border-radius: 20rpx;
    width: 85%;
    margin-top: -60rpx;
    margin-bottom: 50rpx;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .date {
    width: 100%;
    margin-bottom: 30rpx;

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

        .card {
          margin-top: 10rpx;
          margin-right: 20rpx;
          height: 90rpx;
          width: 80rpx;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #b1d7ff;
          border-radius: 10rpx;

          .card-cn {
            font-size: 18rpx;
            font-weight: 800;
            opacity: 0.8;
          }

          .card-en {
            font-size: 8rpx;
            color: white;
            opacity: 0.8;
          }
        }

        .cardCur {
          background-color: #3c9cff;
        }
      }
    }
  }

  .paydetail {
    width: 100%;

    .detailitem {
      width: 92%;
      margin: auto;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
      border-radius: 20rpx;
      background-color: white;
      margin-bottom: 50rpx;

      .detailitem-title {
        width: 100%;
        height: 80rpx;
        line-height: 80rpx;
        display: flex;

        .detailitem-title-date {
          flex: 1;
          font-size: 16rpx;
          display: flex;

          text {
            opacity: 0.6;
          }
        }

        .detailitem-title-date text:first-child {
          margin-left: 30rpx;
          margin-right: 10rpx;
        }

        .detailitem-title-money {
          flex: 1;
          font-size: 10rpx;
          display: flex;
          align-items: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          justify-content: center;
        }

        .detailitem-title-money text:first-child {
          opacity: 0.6;
        }
      }

      .detailitem-pay {
        height: 120rpx;
        display: flex;

        .detailitem-pay-icon {
          height: 100%;
          flex: 1;

          .detailitem-pay-iconbac {
            margin: auto;
            width: 100rpx;
            height: 100rpx;
            margin-top: 10rpx;
            border-radius: 20rpx;
            float: right;
            background-color: #9eceff;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        .detailitem-pay-title {
          height: 100%;
          flex: 4.4;
        }
      }
    }
  }
}
</style>
