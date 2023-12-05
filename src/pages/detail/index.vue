<!--
 * @Author: 张书瑞
 * @Date: 2023-05-09 20:18:04
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-12-05 20:15:51
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
      <view v-if="!IsChartDataEmpty">
        <u-empty mode="data" />
      </view>
      <view v-if="IsChartDataEmpty" style="height: 100%; width: 100%">
        <qiun-data-charts type="rose" :canvas2d="true" will :opts="opts" :chartData="chartData"
          style="height: 100%; width: 100%" />
      </view>
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
        <scroll-view class="wrapper" scroll-x="true" :scroll-left="scrollLeft" scroll-with-animation>
          <view v-for="item in date" :key="item.key" class="item" :class="[`item--${item.key}`]">
            <view class="card" @click="dateClick(item)" :class="item.key == cardCur ? 'cardCur' : ''">
              <span class="card-cn">{{ item.dateCn }}</span>
              <span class="card-en">{{ item.dateEn }}</span>
            </view>
          </view>
        </scroll-view>
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
            <view class="detailitem-pay" @click="clikcRecordItem(data)">
              <view class="detailitem-pay-icon">
                <view class="detailitem-pay-iconbac">
                  <u-image width="70rpx" height="70rpx" :src="data.IncomeExpenseUrl" mode="aspectFill"></u-image>
                </view>
              </view>
              <view class="detailitem-pay-title">
                <u-cell size="large" :title="data.NickName" :border="false"
                  :value="data.Type == 0 ? `+${data.Amount}` : `-${data.Amount}`" :label="data.IncomeExpenseName"
                  @click="clikcRecordItem(data)"></u-cell>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
  <u-popup :show="showPopup" :safeAreaInsetBottom="false" :round="10" mode="bottom" @close="closePopup">
    <view class="formStyle">
      <u-form :rules="rules" :model="model" class="form" ref="uForms">
        <u-scroll-list>
          <view class="scroll-list" style="flex-direction: row;">
            <view class="scroll-list_goods-item" v-for="(item, index) in scrollList" @click="scrollHandleClick(index)"
              :key="index">
              <view class="scroll-list_goods-item_body" :class="{ 'selected_image': item.Id === model.TypeId }">
                <image class="scroll-list_goods-item_body_image" :src="item.ImageUrl"></image>
              </view>
              <text class="scroll-list_goods-item_text">{{ item.Name }}</text>
            </view>
          </view>
        </u-scroll-list>
        <u-form-item label="金额" prop="Amount" label-width="80px" class="form-item">
          <u-input v-model="model.Amount" :borderBottom="true" placeholder="请输入金额" class="input"></u-input>
          <template #right>
            <u-datetime-picker :show="DataShow" v-model="SelectDate" @confirm="confirmData" @cancel="closeData"
              mode="date"></u-datetime-picker>
            <u-button type="primary" size="small" @click="ShowDataPikc">{{ model.RecordTime }}</u-button>
          </template>
        </u-form-item>
        <u-form-item label="备注" prop="Remarks" label-width="80px" class="form-item">
          <u-textarea v-model="model.Remarks" placeholde r="请输入备注"></u-textarea>
        </u-form-item>
        <u-button :customStyle="btnStyle" shape="circle" type="primary" @click="submitForm"
          class="submit-btn">提交</u-button>
        <u-button :customStyle="btnStyle" shape="circle" type="error" @click="deleteData" class="clear-btn">删除</u-button>
      </u-form>
    </view>
  </u-popup>
  <view class="empty" v-if="!IsDataEmpty">
    <u-empty mode="data" />
  </view>
  <u-back-top :scroll-top="scrollTop" :icon-style="iconStyle" :custom-style="customStyle"></u-back-top>
</template>

<script lang="ts" setup>
import { GetRecordRequestData, InsertOrUpdateRecordRequestData, RecordDetail } from "@/api/demo/model/RecordModel";
import { getChartData, getRecord } from "@/api/demo/record";
import { useUserStore } from "@/stores/modules/user";
import { ShowToast } from "@/utils/toast";
import { onPageScroll, onShow } from "@dcloudio/uni-app";
import { ref, reactive } from "vue";
import { RecordDetailView, PieChartData, processRecordData } from ".";
import { deleteAccountRecord, getIncomeExpenseType, updateAccountRecord } from "@/api/demo/list";
import { IncomeExpenseTypeList } from "@/api/demo/model/IncomeExpenseTypeModel";
import { TimeStampFormatDate, formatDate } from "@/utils/helper";
const date = ref([
  {
    key: 1,
    dateCn: "一月",
    dateEn: "Jen",
    rect: null
  },
  {
    key: 2,
    dateCn: "二月",
    dateEn: "Feb",
    rect: null
  },
  {
    key: 3,
    dateCn: "三月",
    dateEn: "Mar",
    rect: null
  },
  {
    key: 4,
    dateCn: "四月",
    dateEn: "Apr",
    rect: null
  },
  {
    key: 5,
    dateCn: "五月",
    dateEn: "May",
    rect: null
  },
  {
    key: 6,
    dateCn: "六月",
    dateEn: "Jun",
    rect: null
  },
  {
    key: 7,
    dateCn: "七月",
    dateEn: "Jul",
    rect: null
  },
  {
    key: 8,
    dateCn: "八月",
    dateEn: "Aug",
    rect: null
  },
  {
    key: 9,
    dateCn: "九月",
    dateEn: "Sep",
    rect: null
  },
  {
    key: 10,
    dateCn: "十月",
    dateEn: "Oct",
    rect: null
  },
  {
    key: 11,
    dateCn: "十一月",
    dateEn: "Nov",
    rect: null
  },
  {
    key: 12,
    dateCn: "十二月",
    dateEn: "Dec",
    rect: null
  },
]);
const title = ref("嗨");
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
const TotalIncome = ref<any>(0);
const TotalExpense = ref<any>(0);
const store = useUserStore();
const scrollTop = ref(0);
const opts = {
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
}
const getReordParam = ref<GetRecordRequestData>({
  Id: null,
  Year: nowYear,
  Month: nowMonth
})
const recordDetailList = ref<RecordDetailView[]>([])
const scrollLeft = ref<number>(0);

//#region 弹出层相关代码
const recordId = ref<string>('');
const showPopup = ref(false);
const scrollList = ref<IncomeExpenseTypeList[]>([]);
const DefaultId = store.getDefaultId;
const SelectDate = ref("");
const DataShow = ref(false);
const scrollHandleClick = async (index) => {
  model.value.TypeId = scrollList.value[index].Id;
}
//关闭弹出层
const closePopup = () => {
  showPopup.value = false;
}
//入参实体
const model = ref<InsertOrUpdateRecordRequestData>({
  AccountBookId: DefaultId,
  WxUserId: null,
  TypeId: null,
  Amount: null,
  Remarks: null,
  RecordTime: null
});
//表单校验
const rules = ref({
  Amount: [
    // { required: true, message: '请输入金额', trigger: 'blur' },
    {
      pattern: /^([1-9]\d*(\.\d{1,2})?|0\.\d{1,2})$/,
      transform(value) {
        return String(value);
      },
      message: '请输入大于0的金额,并且最多保留两位小数'
    }
  ]
});
const uForms = ref();
//提交表单
const submitForm = async () => {
  uForms.value.validate().then(async (res) => {
    if (res) {
      var data = await updateAccountRecord(recordId.value, model.value);
      if (data.isSuccess) {
        ShowToast("编辑成功", "success");
        showPopup.value = false;
        RefreshData();
      }
      else {
        ShowToast(data.msg, "error");
      }
    }
  }).catch(() => {
  })
}
//删除
const deleteData = async () => {
  var res = await deleteAccountRecord(recordId.value);
  if (res.isSuccess) {
    ShowToast("删除成功", "success");
    showPopup.value = false;
    RefreshData();
  }
  else {
    ShowToast(res.msg, "error");
  }
}
//打开日期选择器
const ShowDataPikc = () => {
  DataShow.value = true;
}
//确认选择时间
const confirmData = (e) => {
  const FormatDate = TimeStampFormatDate(e.value);
  DataShow.value = false;
  model.value.RecordTime = FormatDate;
};
//关闭日期选择器
const closeData = () => {
  DataShow.value = false;
};
const btnStyle = reactive({
  marginBottom: '20rpx'
});
//#endregion

/** 数据刷新 */
const RefreshData = async () => {
  const req = await getRecord(getReordParam.value);
  const charData = await getChartData(getReordParam.value);
  if (req.isSuccess) {
    IsChartDataEmpty.value = charData.data.length > 0;
    IsDataEmpty.value = req.data.length > 0;
    recordDetailList.value = processRecordData(req.data);
    TotalIncome.value = req.data.filter(s => s.Type === 0).reduce((amount, item) => amount + item.Amount, 0).toFixed(2);;
    TotalExpense.value = req.data.filter(s => s.Type === 1).reduce((amount, item) => amount + item.Amount, 0).toFixed(2);;
    const pieData = PieChartData(charData.data);
    chartData.value = pieData;
    IsChartDataEmpty.value = pieData.series[0].data.length > 0;
  } else {
    ShowToast(req.msg, "error");
  }
}

const uGetRect = (selector: string, all?: 'selectAll' | 'select'): any => {
  return new Promise((resolve) => {
    uni.createSelectorQuery()
      .in(this)[all ? 'selectAll' : 'select'](selector)
      .boundingClientRect((rect) => {
        if (all && Array.isArray(rect) && rect.length) {
          resolve(rect)
        }
        if (!all && rect) {
          resolve(rect)
        }
      }).exec()
  })
}

const init = () => {
  setTimeout(async () => {
    const tabRect = date.value[cardCur.value - 1];
    const wrapper = await uGetRect('.wrapper');
    await date.value.map(async x => {
      const itemIndex = await uGetRect(`.item--${x.key}`, 'selectAll');
      x.rect = itemIndex[0];
    });
    const offsetLeft = date.value.slice(0, cardCur.value - 1)
      .reduce((total, cur) => {
        return total + cur.rect.width + 7.5
      }, 0);
    let scrollLeft1 = offsetLeft - (wrapper.width - tabRect.rect.width) / 2;
    scrollLeft1 = Math.min(scrollLeft1, wrapper.width - tabRect.rect.width);
    scrollLeft.value = Math.max(0, scrollLeft1);
  })
}

onShow(() => {
  const now = new Date();
  const currentHour = now.getHours();
  const subtitleEn = currentHour >= 0 && currentHour < 11 ? 'Good morning!' :
    currentHour >= 11 && currentHour <= 13 ? 'Good afternoon!' :
      currentHour >= 14 && currentHour <= 17 ? 'Good afternoon!' :
        currentHour >= 18 && currentHour <= 23 ? 'Good evening!' : 'Good morning!';
  subtitle.value = subtitleEn;
  const userinfo = store.getUser;
  if (userinfo) {
    title.value = `嗨，${userinfo.NickName}`;
    getReordParam.value.Id = store.getDefaultId;
  }
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
    init();
    cardCur.value = item.key;
    getReordParam.value.Month = item.key;
    RefreshData();
  }
};

const clikcRecordItem = async (item: RecordDetail) => {
  model.value.AccountBookId = item.AccountBookId;
  model.value.Amount = item.Amount;
  model.value.RecordTime = formatDate(new Date(item.RecordTime));
  model.value.Remarks = item.Remarks;
  model.value.TypeId = item.TypeId;
  model.value.WxUserId = item.WxUserId;
  var res = await getIncomeExpenseType({
    AccountBookId: DefaultId
  });
  scrollList.value = res.data.filter(item => item.Type === item.Type);
  SelectDate.value = formatDate(new Date(item.RecordTime));
  showPopup.value = true;
  recordId.value = item.Id;
};

const byMonthActiveClick = () => {
  init();
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
});
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
        display: flex;
        width: 100%;
        white-space: nowrap;
        overflow: scroll;
        /* 在 iOS 设备上开启硬件加速，提高滚动流畅度 */
        -webkit-overflow-scrolling: touch;
      }

      .item {
        margin-top: 10rpx;
        margin-right: 15rpx;
        display: inline-block;
        vertical-align: top;

        .card {
          height: 90rpx;
          width: 80rpx;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: $default-color;
          border-radius: 10rpx;

          .card-cn {
            font-size: 22rpx;
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

.formStyle {
  margin: 15px 15px;
}

.scroll-list {
  @include flex(column);
  display: flex;
  align-items: center;


  &_goods-item {
    margin-right: 40rpx;
    display: flex;
    align-items: center;
    flex-direction: column;

    &_body {
      width: 80rpx;
      height: 80rpx;
      border-radius: 40rpx;
      background-color: $default-color;
      display: flex;
      align-items: center;
      justify-content: center;

      &_image {
        width: 60rpx;
        height: 60rpx;
      }

    }

    &_text {
      font-size: 24rpx;
      margin-top: 10rpx;
      text-align: center;
    }
  }
}

.selected_image {
  background-color: $selection-color;
}
</style>
