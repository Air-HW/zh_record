<!--
 * @Author: 张书瑞
 * @Date: 2023-05-28 20:16:20
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-11-12 22:04:12
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
    <u-tabs :list="dateList" current="0" @click="dateClikc"></u-tabs>
  </view>
  <view class="datePikc">
    <text class="charts_title">总{{ typeList[typeIndex] }}趋势</text>
    <qiun-data-charts type="line" :opts="LineOpts" :canvas2d="true" :chartData="LineData" />
  </view>
  <view class="ringPikc">
    <text class="charts_title">{{ typeList[typeIndex] }}分类占比</text>
    <qiun-data-charts type="ring" :canvas2d="true" :opts="PieOpts" :chartData="PieData" />
  </view>
  <view class="RankPick">
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
  <u-back-top :scroll-top="scrollTop" :icon-style="iconStyle" :custom-style="customStyle"></u-back-top>
</template>
<script setup lang="ts">
import { onPageScroll, onShow } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue';
import { WeeksInYear, getWeeksInYear } from '.';
import { GetStatisticsRankRequestData, StatisticsRankData } from '@/api/demo/model/StatisticsModel';
import { useUserStore } from '@/stores/modules/user';
import { getStatisticsRank, getStatisticsPie } from '@/api/demo/statistics';
import { formatDate } from '@/utils/helper';
const userStore = useUserStore();
let DefaultId = userStore.getDefaultId;
const typeList = ref(['支出', '收入']);
const dateCurList = ref(['周', '月', '年']);
const typeIndex = ref(0);
const DateCurIndex = ref(0);
const dateList = ref<WeeksInYear[]>([]);
const LineData = ref({});
const LineOpts = reactive({
  color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
  padding: [15, 10, 0, 15],
  dataLabel: false,
  dataPointShape: false,
  enableScroll: false,
  legend: {},
  xAxis: {
    disableGrid: true
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
});
const PieOpts = reactive({
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
});
const PieData = ref({});
const requestData = ref<GetStatisticsRankRequestData>({
  Id: DefaultId,
  StartTime: formatDate(new Date(2023, 1, 1)),
  EndTime: formatDate(new Date(2023, 12, 31)),
  Type: 1
});
const RankData = ref<StatisticsRankData[]>([]);
onShow(async () => {
  const pie = {
    series: [
      {
        data: []
      }
    ]
  };
  const reqRank = await getStatisticsRank(requestData.value);
  const reqPie = await getStatisticsPie(requestData.value);
  RankData.value = reqRank.data;
  pie.series[0].data = reqPie.data;
  PieData.value = pie;
  dateList.value = getWeeksInYear(2023);


  let line = {
    categories: ["2018", "2019", "2020", "2021", "2022", "2023"],
    series: [
      {
        name: "成交量A",
        data: [35, 8, 25, 37, 4, 20]
      },
      {
        name: "成交量B",
        data: [70, 40, 65, 100, 44, 68]
      },
      {
        name: "成交量C",
        data: [100, 80, 95, 150, 112, 132]
      }
    ]
  };
  LineData.value = line;
});
/** 分类切换 */
const sectionCurChange = async (index) => {
  const type = typeList.value[index] === "支出" ? 1 : 0;
  if (type !== requestData.value.Type) {
    const pie = {
      series: [
        {
          data: []
        }
      ]
    };
    requestData.value.Type = type;
    const res = await getStatisticsRank(requestData.value);
    const reqPie = await getStatisticsPie(requestData.value);
    pie.series[0].data = reqPie.data;
    PieData.value = pie;
    RankData.value = res.data;
    typeIndex.value = index;
  }
}
/** 查询日期类型切换 */
const sectionDateCurChange = (index) => {
  console.log(dateCurList.value[index])
  DateCurIndex.value = index;
}
const dateClikc = (data: WeeksInYear) => {
  console.log(data.index);
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
</script>
<style scoped lang="scss">
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