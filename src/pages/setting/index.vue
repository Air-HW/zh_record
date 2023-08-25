<!--
 * @Author: 张书瑞
 * @Date: 2023-05-28 20:15:01
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-08-20 21:33:53
 * @FilePath: \zh_record\src\pages\setting\index.vue
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
-->
<template>
  <view class="grid-container">
    <u-grid :border="false" col="4">
      <u-grid-item v-for="(item, index) in list" :key="index" @click="handleClick(index)">
        <view class="griditem-icon" :class="{ 'griditem-title': index == selectedIndex && selectedIndex !== -1 }">
          <u-icon :name="item.url" :size="40"></u-icon>
        </view>
      </u-grid-item>
    </u-grid>
  </view>
  <u-popup mode="center" :show="popupShow" :round="10" @close="popupClose" :safeAreaInsetBottom="false">
    <view class="popup-container">
      <view class="popup-form">
        <u-form :model="formData" :rules="formRules" ref="uForms">
          <u-form-item label="分类" prop="Type" label-width="40px" class="form-item">
            <u-radio-group @change="radioChange" v-for="(item, index) in radiolist" v-model="radiovalue">
              <u-radio :key="index" :label="item.name" :name="item.type"></u-radio>
            </u-radio-group>
          </u-form-item>
          <u-form-item label="标题" prop="Title" label-width="40px" class="form-item">
            <u-input v-model="formData.Title" :borderBottom="true" placeholder="请输入标题" class="input"></u-input>
          </u-form-item>
        </u-form>
        <u-button shape="circle" type="primary" class="submit-btn" @click="submitForm">提交</u-button>
      </view>
    </view>
  </u-popup>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
const list = reactive([
  { url: "/src/static/image/pay/nodefault/KTV_white.png" },
  { url: "/src/static/image/pay/nodefault/奶茶_white.png" },
  { url: "/src/static/image/pay/nodefault/娱乐_white.png" },
  { url: "/src/static/image/pay/nodefault/学习_white.png" },
  { url: "/src/static/image/pay/nodefault/日用品_white.png" },
  { url: "/src/static/image/pay/nodefault/水果_white.png" },
  { url: "/src/static/image/pay/nodefault/游戏_white.png" },
  { url: "/src/static/image/pay/nodefault/爱心捐款_white.png" },
  { url: "/src/static/image/pay/nodefault/美容_white.png" },
  { url: "/src/static/image/pay/nodefault/蔬菜_white.png" }

]);
const selectedIndex = ref(-1);
const popupShow = ref(false);
const radiovalue = ref(1);
const radiolist = reactive([
  { name: '支出', type: 1 },
  { name: '收入', type: 2 }
]);
const formData = reactive({
  Type: radiovalue.value,
  Title: ""
});
//表单校验
const formRules = ref({
  Type: [
    {
      validator: (rule, value, callback) => {
        if (value < 1 || value > 2) {
          callback(new Error('请选择分类'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ],
  Title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    {
      pattern: /^.{0,2}$/,
      transform(value) {
        return String(value);
      },
      message: '最多保留两个长度'
    }
  ]
});
const uForms = ref();
const submitForm = async () => {
  uForms.value.validate().then(res => {
    console.log(formData);
    if (res) {
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
const handleClick = (index) => {
  selectedIndex.value = index;
  popupShow.value = true;
}
const popupClose = () => {
  popupShow.value = false;
  selectedIndex.value = -1;
}
const radioChange = (type) => {
  radiovalue.value = type;
  formData.Type = type;
}
</script>
<style scoped lang="scss">
@import "@/styles/_variables.scss";

.griditem-icon {
  margin-top: 15px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 60px;
  border-radius: 30px;
  background-color: $default-color;
}

.griditem-title {
  background-color: $selection-color;
}

.popup-container {
  height: 450rpx;
  width: 650rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  .popup-form {
    width: 95%;
  }
}
</style>