<!--
 * @Author: 张书瑞
 * @Date: 2023-05-09 20:18:04
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-11-12 00:23:47
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
            <u-icon name="rmb" :bold="true" size="40rpx" color="white"></u-icon>
            <text>{{ TotalExpense }}</text>
          </view>
        </view>
        <view class="detail-card">
          <text class="detailtitle">本月收入(元)</text>
          <view class="moneydetail">
            <u-icon name="rmb" :bold="true" size="40rpx" color="white"></u-icon>
            <text>{{ TotalIncome }}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="chart" id="echarts">
      <qiun-data-charts type="rose" :canvas2d="true" will :opts="opts" :chartData="chartData"
        style="height: 100%; width: 100%" />
    </view>
    <view class="date">
      <view class="datetitle">
        <text :class="{ activeCur: latestActive }" :style="{
          fontSize: latestActive ? '45rpx' : '25rpx',
          opacity: latestActive ? 1 : 0.7,
        }" @click="latestClick">最新</text>
        <text :class="{ activeCur: byMonthActive }" :style="{
          fontSize: byMonthActive ? '45rpx' : '25rpx',
          opacity: byMonthActive ? 1 : 0.7,
        }" @click="byMonthActiveClick">按月份</text>
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
    <view v-for="(item, index) in recordDetailList" :key="index">
      <view class="paydetail">
        <view class="detailitem">
          <view class="detailitem-title">
            <view class="detailitem-title-date">
              <text>{{ item.MonthDay }}</text>
              <text>{{ item.WeekDay }}</text>
            </view>
            <view class="detailitem-title-money">
              <text>支出:</text>
              <u-icon name="rmb" :bold="true" size="20rpx"></u-icon>
              <text style="font-weight: bold">{{ item.Expense }}</text>
            </view>
            <view class="detailitem-title-money">
              <text>收入:</text>
              <u-icon name="rmb" :bold="true" size="20rpx"></u-icon>
              <text style="font-weight: bold">{{ item.Income }}</text>
            </view>
          </view>
          <view v-for="(data, dataindex) in item.RecordData" :key="dataindex">
            <view class="detailitem-pay">
              <view class="detailitem-pay-icon">
                <view class="detailitem-pay-iconbac">
                  <u-image width="70rpx" height="70rpx" :src="data.IncomeExpenseUrl" mode="aspectFill"></u-image>
                </view>
              </view>
              <view class="detailitem-pay-title">
                <u-cell size="large" :title="data.NickName" :border="false"
                  :value="data.Type == 0 ? `+${data.Amount}` : `-${data.Amount}`"
                  :label="data.IncomeExpenseName"></u-cell>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
  <view class="empty" v-if="!IsDataEmpty">
    <u-empty mode="data" />
  </view>
  <u-back-top :scroll-top="scrollTop" :icon-style="iconStyle" :custom-style="customStyle"></u-back-top>
</template>

<script lang="ts" setup>
import { GetRecordRequestData } from "@/api/demo/model/RecordModel";
import { getChartData, getRecord } from "@/api/demo/record";
import { useUserStore } from "@/stores/modules/user";
import { ShowToast } from "@/utils/toast";
import { onPageScroll, onShow } from "@dcloudio/uni-app";
import { ref, reactive } from "vue";
import { RecordDetailView, PieChartData, processRecordData } from ".";
const date = [
  {
    key: 1,
    dateCn: "一月",
    dateEn: "Jen",
  },
  {
    key: 2,
    dateCn: "二月",
    dateEn: "Feb",
  },
  {
    key: 3,
    dateCn: "三月",
    dateEn: "Mar",
  },
  {
    key: 4,
    dateCn: "四月",
    dateEn: "Apr",
  },
  {
    key: 5,
    dateCn: "五月",
    dateEn: "May",
  },
  {
    key: 6,
    dateCn: "六月",
    dateEn: "Jun",
  },
  {
    key: 7,
    dateCn: "七月",
    dateEn: "Jul",
  },
  {
    key: 8,
    dateCn: "八月",
    dateEn: "Aug",
  },
  {
    key: 9,
    dateCn: "九月",
    dateEn: "Sep",
  },
  {
    key: 10,
    dateCn: "十月",
    dateEn: "Oct",
  },
  {
    key: 11,
    dateCn: "十一月",
    dateEn: "Nov",
  },
  {
    key: 12,
    dateCn: "十二月",
    dateEn: "Dec",
  },
];
const title = ref("嗨, 小刘");
const subtitle = ref("Good morning!");
const icon = ref("../../static/icon/sun.png");
const latestActive = ref(true);
const byMonthActive = ref(false);
const nowMonth = new Date().getMonth() + 1;
const nowYear = new Date().getFullYear();
const cardCur = ref<number>(nowMonth);
const chartData = ref({});
const IsDataEmpty = ref<boolean>(false);
const IsChartDataEmpty = ref<boolean>(false);
const TotalIncome = ref<number>(0);
const TotalExpense = ref<number>(0);
const opts = reactive({
  color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
  padding: [5, 5, 5, 5],
  enableScroll: false,
  legend: {
    show: true,
    position: "left",
    lineHeight: 25
  },
  extra: {
    rose: {
      type: "radius",
      minRadius: 50,
      activeOpacity: 0.5,
      activeRadius: 10,
      offsetAngle: 0,
      labelWidth: 15,
      border: true,
      borderWidth: 2,
      borderColor: "#FFFFFF",
      linearType: "custom"
    }
  }
})
const scrollTop = ref(0);
const store = useUserStore();
const getReordParam = ref<GetRecordRequestData>({
  Id: null,
  Year: nowYear,
  Month: nowMonth
})
const recordDetailList = ref<RecordDetailView[]>([])

onShow(() => {
  const now = new Date();
  const currentHour = now.getHours();
  const subtitleEn = currentHour >= 0 && currentHour < 11 ? 'Good morning!' :
    currentHour >= 11 && currentHour <= 13 ? 'Good afternoon!' :
      currentHour >= 14 && currentHour <= 17 ? 'Good afternoon!' :
        currentHour >= 18 && currentHour <= 23 ? 'Good evening!' : 'Good morning!';
  subtitle.value = subtitleEn;
  const userinfo = store.getUser;
  title.value = `嗨，${userinfo.NickName}`;
  getReordParam.value.Id = store.getDefaultId;
  RefreshData();
})

const latestClick = () => {
  if (cardCur.value != nowMonth && getReordParam.value.Month != nowMonth) {
    cardCur.value = nowMonth;
    getReordParam.value.Month = nowMonth;
    RefreshData();
  }
  latestActive.value = true;
  byMonthActive.value = false;
};

const dateClick = (item: any) => {
  if (cardCur.value != item.key && getReordParam.value.Month != item.key) {
    cardCur.value = item.key;
    getReordParam.value.Month = item.key;
    RefreshData();
  }
};

/** 数据刷新 */
const RefreshData = async () => {
  const req = await getRecord(getReordParam.value);
  const charData = await getChartData(getReordParam.value);
  if (req.isSuccess) {
    IsChartDataEmpty.value = charData.data.length > 0;
    IsDataEmpty.value = req.data.length > 0;
    recordDetailList.value = processRecordData(req.data);
    TotalIncome.value = req.data.filter(s => s.Type === 0).reduce((amount, item) => amount + item.Amount, 0);
    TotalExpense.value = req.data.filter(s => s.Type === 1).reduce((amount, item) => amount + item.Amount, 0);
    chartData.value = PieChartData(charData.data);
  } else {
    ShowToast(req.msg, "error");
  }
}

const byMonthActiveClick = () => {
  latestActive.value = false;
  byMonthActive.value = true;
};

const customStyle = reactive({
  backgroundColor: '#3c9cff'
});

const iconStyle = reactive({
  color: '#fff',
  fontSize: '36rpx'
});

onPageScroll((e) => {
  scrollTop.value = e.scrollTop;
})
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
    background-color: $selection-color;

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
          font-size: 35rpx;
        }

        .subtitletext {
          font-size: 30rpx;
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
          font-size: 24rpx;
        }

        .moneydetail {
          font-size: 40rpx;
          color: white;
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
    margin-bottom: 24rpx;

    .datetitle {
      padding: 0 24rpx;

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
          background-color: $default-color;
          border-radius: 10rpx;

          .card-cn {
            font-size: 20rpx;
            // font-weight: 800;
            opacity: 0.8;
          }

          .card-en {
            font-size: 20rpx;
            color: white;
            opacity: 0.8;
          }
        }

        .cardCur {
          background-color: $selection-color;
        }
      }
    }
  }

  .paydetail {
    width: 100%;

    .detailitem {
      width: 92%;
      margin: auto;
      box-shadow: 0rpx 0rpx 40rpx rgba(0, 0, 0, 0.1);
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
          font-size: 25rpx;
          display: flex;

          text {
            opacity: 0.8;
          }
        }

        .detailitem-title-date text:first-child {
          margin-left: 16rpx;
          margin-right: 6rpx;
        }

        .detailitem-title-money {
          flex: 1;
          font-size: 24rpx;
          display: flex;
          align-items: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          justify-content: center;
        }

        .detailitem-title-money text:first-child {
          opacity: 0.8;
        }
      }

      .detailitem-pay {
        height: 130rpx;
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
            background-color: $default-color;
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

.empty {
  height: 400rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
