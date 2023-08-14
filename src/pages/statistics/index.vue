<!--
 * @Author: 张书瑞
 * @Date: 2023-05-28 20:16:20
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-08-13 20:35:54
 * @FilePath: \zh_record\src\pages\statistics\index.vue
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
-->
<template>
  <view class="titlePick">
    <view class="titlePick_cur">
      <u-subsection :list="curList" mode="subsection" :current="curIndex" @change="sectionCurChange"></u-subsection>
    </view>
    <view class="titlePick_date">
      <u-subsection :list="dateCurList" mode="subsection" :current="DateCurIndex"
        @change="sectionDateCurChange"></u-subsection>
    </view>
  </view>
  <view>
    <u-tabs :list="dateList" current="5"></u-tabs>
  </view>
  <view class="datePikc">
    <text class="charts_title">总支出趋势</text>
    <qiun-data-charts type="line" :opts="LineOpts" :canvas2d="true" :chartData="LineChartData" />
  </view>
  <view class="ringPikc">
    <text class="charts_title">支出分类占比</text>
    <qiun-data-charts type="ring" :canvas2d="true" :opts="PieOpts" :chartData="PieChartData" />
  </view>
  <view class="RankPick">
    <text class="charts_title">支出排行榜</text>
    <view class="RankPick_item">
      <view class="RankPick_item_img">
        <image class="RankPick_item_img_style" src="../../static//image/pay/default/交通_white.png"></image>
      </view>
      <view class="RankPick_item_title">
        <view class="RankPick_item_title_one">
          <text>交通</text>
          <text style="float: right;">1000.00</text>
        </view>
        <view class="RankPick_item_title_two">
          <u-line-progress active-color="#3c9cff" :percentage="75"></u-line-progress>
        </view>
      </view>
    </view>
    <view class="RankPick_item">
      <view class="RankPick_item_img">
        <image class="RankPick_item_img_style" src="../../static//image/pay/default/交通_white.png"></image>
      </view>
      <view class="RankPick_item_title">
        <view class="RankPick_item_title_one">
          <text>餐饮</text>
          <text style="float: right;">100.00</text>
        </view>
        <view class="RankPick_item_title_two">
          <u-line-progress active-color="#3c9cff" :percentage="25"></u-line-progress>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue';
const curList = reactive(['支出', '收入']);
const dateCurList = reactive(['周', '月', '年']);
const curIndex = ref(0);
const DateCurIndex = ref(0);
const sectionCurChange = (index) => {
  curIndex.value = index;
}
const sectionDateCurChange = (index) => {
  console.log(curList[index])
  DateCurIndex.value = index;
}
const dateList = reactive([{
  name: '关注',
}, {
  name: '推荐',
}, {
  name: '电影'
}, {
  name: '科技'
}, {
  name: '音乐'
}, {
  name: '美食'
}, {
  name: '文化'
}, {
  name: '财经'
}, {
  name: '手工'
}]);
const LineChartData = ref({});
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
const PieChartData = ref({});
onBeforeMount(async () => {
  let LineData = {
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
  LineChartData.value = LineData;
  let PieData = {
    series: [
      {
        data: [{ "name": "一班", "value": 50 }, { "name": "二班", "value": 30 }, { "name": "三班", "value": 20 }, { "name": "四班", "value": 18 }, { "name": "五班", "value": 8 }]
      }
    ]
  };
  PieChartData.value = PieData;
});
</script>
<style scoped lang="scss">
@import "@/styles/_variables.scss";

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

.charts_title {
  margin-left: 30rpx;
  font-size: 20rpx;
  opacity: 0.7;
}
</style>