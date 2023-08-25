<!--
 * @Author: 张书瑞
 * @Date: 2023-05-10 21:42:42
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-08-20 15:00:12
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
    <GridList :list="list" @click="handleClick" :listIndex="selectedIndex" />
  </view>
  <view v-if="curNow == 1">
    <GridList :list="listIncome" @click="handleClick" :listIndex="selectedIndex" />
  </view>
  <u-popup :show="showPopup" :safeAreaInsetBottom="false" :round="10" mode="bottom" @close="closePopup">
    <view class="formStyle">
      <u-form :rules="rules" :model="model" class="form" ref="uForms">
        <u-scroll-list>
          <view class="scroll-list" style="flex-direction: row;">
            <view class="scroll-list_goods-item" v-for="(item, index) in scrollList" @click="scrollHandleClick(index)"
              :key="index">
              <view class="scroll-list_goods-item_body"
                :class="{ 'selected_image': index == selectedIndex && selectedIndex !== -1 }">
                <image class="scroll-list_goods-item_body_image" :src="item.url"></image>
              </view>
              <text class="scroll-list_goods-item_text">{{ item.title }}</text>
            </view>
          </view>
        </u-scroll-list>
        <u-form-item label="金额" prop="Money" label-width="80px" class="form-item">
          <u-input v-model="model.Money" :borderBottom="true" placeholder="请输入金额" class="input"></u-input>
          <template #right>
            <u-datetime-picker :show="DataShow" v-model="SelectDate" @confirm="confirmData" @cancel="closeData"
              mode="date"></u-datetime-picker>
            <u-button type="primary" size="small" @click="ShowDataPikc">{{ model.PayDate }}</u-button>
          </template>
        </u-form-item>
        <u-form-item label="备注" prop="Remark" label-width="80px" class="form-item">
          <u-textarea v-model="model.Remark" placeholder="请输入备注"></u-textarea>
        </u-form-item>
        <u-button :customStyle="btnStyle" shape="circle" type="primary" @click="submitForm"
          class="submit-btn">提交</u-button>
        <u-button :customStyle="btnStyle" shape="circle" type="error" @click="clearForm" class="clear-btn">重置</u-button>
      </u-form>
    </view>
  </u-popup>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import GridList from "../../components/GridList/GridList.vue"
import { TimeStampFormatDate } from '../../common/helper'
import { PayMent } from '../../types/RequestEntity'
const curList = reactive(['支出', '收入']);
const curNow = ref(0)
const sectionChange = (index) => {
  curNow.value = index;
}
const list = reactive([{
  type: "01",
  title: "餐饮",
  url: "/src/static/image/pay/default/餐饮_white.png"
}, {
  type: "01",
  title: "交通",
  url: "/src/static/image/pay/default/交通_white.png"
}, {
  type: "01",
  title: "旅游",
  url: "/src/static/image/pay/default/旅游_white.png"
}, {
  type: "01",
  title: "宠物",
  url: "/src/static/image/pay/default/宠物_white.png"
}, {
  type: "01",
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  type: "01",
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  type: "01",
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  type: "01",
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  type: "01",
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  type: "01",
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  type: "01",
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  type: "01",
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  type: "01",
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  type: "01",
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  type: "01",
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  type: "01",
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  type: "01",
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  type: "01",
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  type: "01",
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  type: "01",
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  type: "01",
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  type: "01",
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  type: "01",
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  type: "01",
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}, {
  type: "01",
  title: "外卖",
  url: "/src/static/image/pay/default/外卖_white.png"
}]);
const listIncome = reactive([{
  type: "02",
  title: "工资",
  url: "/src/static/image/income/工资_white.png"
}, {
  type: "02",
  title: "兼职",
  url: "/src/static/image/income/兼职_white.png"
}, {
  type: "02",
  title: "礼金",
  url: "/src/static/image/income/礼金_white.png"
}, {
  type: "02",
  title: "理财",
  url: "/src/static/image/income/理财记录_white.png"
}, {
  type: "02",
  title: "其他",
  url: "/src/static/image/income/其他_white.png"
}]);
const showPopup = ref(false);
const selectedIndex = ref(-1);
const SelectDate = ref(TimeStampFormatDate(Date.now()));
let scrollList = reactive(null);
const handleClick = async (index) => {
  if (curNow.value == 0) {
    scrollList = list;
  } else {
    scrollList = listIncome;
  }
  selectedIndex.value = index;
  showPopup.value = true;
}
const scrollHandleClick = async (index) => {
  selectedIndex.value = index;
}
//关闭弹出层
const closePopup = () => {
  selectedIndex.value = -1;
  showPopup.value = false;
}

//入参实体
const model = reactive<PayMent>({
  Type: 1,
  Money: null,
  Remark: '',
  PayDate: SelectDate.value
});
//表单校验
const rules = ref({
  Money: [
    { required: true, message: '请输入金额', trigger: 'blur' },
    {
      pattern: /^\d+(\.\d{1,2})?$/,
      transform(value) {
        return String(value);
      },
      message: '最多保留两位小数'
    }
  ]
});

const uForms = ref();
//提交表单
const submitForm = async () => {
  uForms.value.validate().then(res => {
    if (res) {
      console.log(model);
      uni.showToast({
        title: "提交成功",
        duration: 2000,
        icon: "none"
      });
    }
  }).catch(err => {
    uni.showToast({
      title: "校验失败",
      duration: 2000,
      icon: "none"
    });
  })
}
//表单重置
const clearForm = async () => {
  for (const key in model) {
    if (Object.hasOwnProperty.call(model, key)) {
      if (key == "PayDate") {
        SelectDate.value = TimeStampFormatDate(Date.now());
        model[key] = SelectDate.value;
        continue;
      }
      model[key] = '';
    }
  }
}
const btnStyle = reactive({
  marginBottom: '20rpx'
});
const DataShow = ref(false);
//打开日期选择器
const ShowDataPikc = () => {
  DataShow.value = true;
}
//确认选择时间
const confirmData = (e) => {
  const FormatDate = TimeStampFormatDate(e.value);
  DataShow.value = false;
  model.PayDate = FormatDate;
};
//关闭日期选择器
const closeData = () => {
  DataShow.value = false;
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.formStyle {
  margin: 15px 15px;
  // border: 1px solid red;
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
      // text-align: center;
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
