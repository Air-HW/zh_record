<!--
 * @Author: 张书瑞
 * @Date: 2023-05-28 20:16:20
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-11-26 23:44:39
 * @FilePath: \zh_record\src\pages\statistics\index.vue
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
-->
<template>
  <view class="titlePick">
    <view class="titlePick_cur">
      <u-subsection :list="typeList" mode="subsection" :current="typeIndex" @change="sectionCurChange"></u-subsection>
    </view>
    <view class="titlePick_date">
      <u-subsection :list="dateCurList" mode="subsection" :current="DateCurIndex"
        @change="sectionDateCurChange"></u-subsection>
    </view>
  </view>
  <view>
    <u-tabs :list="dateList" :current="DataIndex" @click="dateClikc"></u-tabs>
  </view>
  <view class="datePikc">
    <text class="charts_title">总{{ typeList[typeIndex] }}趋势</text>
    <qiun-data-charts type="line" :opts="LineOpts" :canvas2d="true" :chartData="LineData" :ontouch="true" />
  </view>
  <view class="ringPikc" v-if="!IsDataEmpty">
    <text class="charts_title">{{ typeList[typeIndex] }}分类占比</text>
    <qiun-data-charts type="ring" :canvas2d="true" :opts="PieOpts" :chartData="PieData" />
  </view>
  <view class="RankPick" v-if="!IsDataEmpty">
    <text class="charts_title">{{ typeList[typeIndex] }}排行榜</text>
    <view v-for="(item, index) in  RankData " :key="index">
      <view class="RankPick_item">
        <view class="RankPick_item_img">
          <image class="RankPick_item_img_style" :src="item.IncomeExpenseUrl"></image>
        </view>
        <view class="RankPick_item_title">
          <view class="RankPick_item_title_one">
            <text>{{ item.IncomeExpenseName }}</text>
            <text style="float: right;">{{ item.Amount }}</text>
          </view>
          <view class="RankPick_item_title_two">
            <u-line-progress active-color="#3c9cff" :percentage="item.Rang"></u-line-progress>
          </view>
        </view>
      </view>
    </view>
  </view>
  <view class="empty" v-if="IsDataEmpty">
    <u-empty mode="data" />
  </view>
  <u-back-top :scroll-top="scrollTop" :icon-style="iconStyle" :custom-style="customStyle"></u-back-top>
</template>
<script setup lang="ts">
import { onPageScroll, onShow } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue';
import { WeeksInYear, getMonthInDate, getWeeksInDate, getWeeksInYear, getYearsInDate } from '.';
import { GetStatisticsRankRequestData, PostStatisticsLineRequestData, StatisticsRankData } from '@/api/demo/model/StatisticsModel';
import { useUserStore } from '@/stores/modules/user';
import { postStatisticsRank, postStatisticsPie, postStatisticsLine, getBookEarliest } from '@/api/demo/statistics';
const userStore = useUserStore();
let DefaultId = userStore.getDefaultId;
const nowYear = ref<number>(new Date().getFullYear());
const typeList = ref(['支出', '收入']);
const typeIndex = ref(0);
const dateCurList = ref(['周', '月', '年']);
const DateCurIndex = ref(0);
const dateList = ref<WeeksInYear[]>([]);
const DataIndex = ref<number>(0);
const LineData = ref({});
const PieData = ref({});
const RankData = ref<StatisticsRankData[]>([]);
const IsDataEmpty = ref<boolean>(false);
let BookEarliestTimeStr: string;
const LineOpts = {
  color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
  padding: [15, 10, 0, 15],
  enableScroll: true,
  legend: {},
  xAxis: {
    disableGrid: true,
    scrollShow: true,
    itemCount: 10
  },
  yAxis: {
    gridType: "dash",
    dashLength: 2
  },
  extra: {
    line: {
      type: "curve",
      width: 2,
      activeType: "hollow",
      linearType: "custom",
    }
  }
};
const PieOpts = {
  rotate: false,
  rotateLock: false,
  color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
  padding: [5, 5, 5, 5],
  dataLabel: true,
  enableScroll: false,
  legend: {
    show: true,
    position: "right",
    lineHeight: 25
  },
  title: null,
  subtitle: null,
  extra: {
    ring: {
      ringWidth: 0,
      activeOpacity: 0.5,
      activeRadius: 20,
      offsetAngle: 0,
      labelWidth: 15,
      border: true,
      borderWidth: 3,
      borderColor: "#FFFFFF",
      linearType: "custom"
    }
  }
};
const requestRankData = ref<GetStatisticsRankRequestData>({
  Id: DefaultId,
  StartTime: null,
  EndTime: null,
  Type: 1
});
const requestLineData = ref<PostStatisticsLineRequestData>({
  Id: DefaultId,
  DateType: null,
  Year: 0
});
onShow(async () => {
  // var time: any = await getBookEarliest(DefaultId);
  // BookEarliestTimeStr = time.data;
  typeIndex.value = 0;
  DateCurIndex.value = 0;
  dateList.value = getWeeksInDate('2023-11-02');
  console.log(dateList.value);

  // var now = new Date();
  // dateList.value.filter(s => {
  //   var startDay = new Date(`${s.startDay} 00:00:00`); // 给定的 fristDay
  //   var endDay = new Date(`${s.endDay} 23:59:59`); // 给定的 endDay
  //   if (startDay <= now && endDay >= now) {
  //     DataIndex.value = s.index
  //     requestRankData.value.StartTime = s.startDay;
  //     requestRankData.value.EndTime = s.endDay;
  //     requestLineData.value.StartTime = s.startDay;
  //     requestLineData.value.EndTime = s.endDay;
  //   }
  // })
  // requestLineData.value.DateType = '日';
  // await RefreshData();
});
/** 分类切换 */
const sectionCurChange = async (index) => {
  const type = typeList.value[index] === "支出" ? 1 : 0;
  if (type !== requestRankData.value.Type) {
    requestRankData.value.Type = type;
    requestLineData.value.DateType = dateCurList.value[DateCurIndex.value] === "年" ? '年' : '日';
    typeIndex.value = index;
    await RefreshData();
  }
}
/** 查询日期类型切换 */
const sectionDateCurChange = async (index) => {
  DateCurIndex.value = index;
  var name = dateCurList.value[index];
  var now = new Date();
  if (name === '周') {
    dateList.value = getWeeksInYear(nowYear.value);
    dateList.value.filter(s => {
      var startDay = new Date(`${s.startDay}`); // 给定的 fristDay
      var endDay = new Date(`${s.endDay}`); // 给定的 endDay
      if (startDay <= now && endDay >= now) {
        DataIndex.value = s.index
        requestLineData.value.DateType = '日';
        requestLineData.value.StartTime = s.startDay;
        requestLineData.value.EndTime = s.endDay;
        requestRankData.value.StartTime = s.startDay;
        requestRankData.value.EndTime = s.endDay;
      }
    })
  } else if (name === '月') {
    var nowDate = new Date();
    dateList.value = getMonthInDate(BookEarliestTimeStr);
    var monthIndex = dateList.value.findIndex(s => {
      const startDate = new Date(s.startDay);
      const endDate = new Date(s.endDay);
      return startDate <= nowDate && endDate >= nowDate;
    });
    DataIndex.value = monthIndex;
    requestLineData.value.DateType = '日';
    requestLineData.value.StartTime = dateList.value[monthIndex].startDay;
    requestLineData.value.EndTime = dateList.value[monthIndex].endDay;
    requestRankData.value.StartTime = dateList.value[monthIndex].startDay;
    requestRankData.value.EndTime = dateList.value[monthIndex].endDay;
  } else if (name === '年') {
    dateList.value = getYearsInDate(BookEarliestTimeStr);
    var YearIndex = dateList.value.findIndex(s => s.name === nowYear.value.toString());
    DataIndex.value = YearIndex;
    requestLineData.value.DateType = '年';
    requestLineData.value.Year = parseInt(dateList.value[YearIndex].name);
  }
  await RefreshData();
}
const dateClikc = async (data: WeeksInYear) => {
  var dateType = dateCurList.value[DateCurIndex.value];
  if (dateType === '周' || dateType === '月') {
    requestLineData.value.DateType = '日';
    requestLineData.value.StartTime = data.startDay;
    requestLineData.value.EndTime = data.endDay;
    requestRankData.value.StartTime = data.startDay;
    requestRankData.value.EndTime = data.endDay;
  } else if (dateType === '年') {
    requestLineData.value.DateType = '年';
    requestLineData.value.Year = parseInt(data.name);
  }
  await RefreshData();
}
const scrollTop = ref(0);
const iconStyle = reactive({
  color: '#fff',
  fontSize: '36rpx'
});
const customStyle = reactive({
  backgroundColor: '#3c9cff'
});
onPageScroll((e) => {
  scrollTop.value = e.scrollTop;
})

const RefreshData = async () => {
  const reqLine = await postStatisticsLine(requestLineData.value);
  LineData.value = reqLine.data;
  const pie = {
    series: [
      {
        data: []
      }
    ]
  };
  const reqRank = await postStatisticsRank(requestRankData.value);
  const reqPie = await postStatisticsPie(requestRankData.value);
  if (reqRank.data.length <= 0) {
    IsDataEmpty.value = true;
  } else {
    IsDataEmpty.value = false;
  }
  RankData.value = reqRank.data;
  pie.series[0].data = reqPie.data;
  PieData.value = pie;
}
</script>
<style scoped lang="scss">
.empty {
  height: 400rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.titlePick {
  height: 100rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &_cur {
    width: 300rpx;
    margin: 20rpx;
  }

  &_date {
    width: 500rpx;
    margin: 20rpx;
  }
}

.datePikc {
  margin-top: 20rpx;
  height: 440rpx;
}

.ringPikc {
  margin-top: 20rpx;
  height: 440rpx;
}

.charts_title {
  margin-left: 30rpx;
  font-size: 20rpx;
  opacity: 0.7;
}

.RankPick {
  margin-top: 20rpx;

  &_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    height: 160rpx;
    margin: auto;

    &_img {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 120rpx;
      height: 120rpx;
      border-radius: 60rpx;
      background-color: $selection-color;

      &_style {
        width: 80rpx;
        height: 80rpx;
      }
    }

    &_title {
      width: 540rpx;
      height: 120rpx;

      &_one {
        margin-bottom: 20rpx;
        margin-top: 20rpx;
      }
    }
  }
}
</style>