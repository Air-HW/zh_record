<!--
 * @Author: 张书瑞
 * @Date: 2023-05-10 21:42:42
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-06-12 22:07:22
 * @FilePath: \zh_record\src\pages\list\index.vue
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
-->
<template>
  <view class="u-demo-block__content">
    <u-subsection :list="curList" mode="subsection" :current="curNow" @change="sectionChange"></u-subsection>
  </view>
  <view v-if="curNow == 0">
    <GridList :list="list" />
  </view>
  <view v-if="curNow == 1">
    <GridList :list="listIncome" />
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import GridList from "../../components/GridList/GridList.vue"
const curList = reactive(['支出', '收入']);
const curNow = ref(0)
const sectionChange = (index) => {
  curNow.value = index;
}
const list = reactive([{
  title: "餐饮",
  url: "/src/static/image/pay/default/餐饮_white.png"
}, {
  title: "交通",
  url: "/src/static/image/pay/default/交通_white.png"
}, {
  title: "旅游",
  url: "/src/static/image/pay/default/旅游_white.png"
}, {
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}]);
const listIncome = reactive([{
  title: "工资",
  url: "/src/static/image/income/工资_white.png"
}, {
  title: "兼职",
  url: "/src/static/image/income/兼职_white.png"
}, {
  title: "礼金",
  url: "/src/static/image/income/礼金_white.png"
}, {
  title: "理财",
  url: "/src/static/image/income/理财记录_white.png"
}, {
  title: "其他",
  url: "/src/static/image/income/其他_white.png"
}]);
</script>

<style lang="scss" scoped></style>
