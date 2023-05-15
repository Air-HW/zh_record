<!--
 * @Author: 张书瑞
 * @Date: 2023-05-10 21:42:42
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-05-10 21:43:02
 * @FilePath: \zh_record\src\pages\list\list.vue
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
-->
<template>
  <view>
    <!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
    <u--form labelPosition="left" :model="model1" :rules="rules" ref="form1">
      <u-form-item label="姓名" prop="userInfo.name" borderBottom ref="item1">
        <u--input border="none"></u--input>
      </u-form-item>
      <u-form-item
        label="性别"
        prop="userInfo.sex"
        borderBottom
        @click="showSex = true"
        ref="item1"
      >
        <u--input
          disabled
          disabledColor="#ffffff"
          placeholder="请选择性别"
          border="none"
        ></u--input>
        <template #right>
          <u-icon name="arrow-right"></u-icon>
        </template>
      </u-form-item>
    </u--form>
    <u-action-sheet
      :show="showSex"
      :actions="actions"
      title="请选择性别"
      description="如果选择保密会报错"
      @close="showSex = false"
      @select="sexSelect"
    >
    </u-action-sheet>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const showSex = ref(false);
const radio = ref("");
const switchVal = ref(false);
const model1 = ref({
  "userInfo.name": {
    type: "string",
    required: true,
    message: "请填写姓名",
    trigger: ["blur", "change"],
  },
  "userInfo.sex": {
    type: "string",
    max: 1,
    required: true,
    message: "请选择男或女",
    trigger: ["blur", "change"],
  },
});
const actions = ref([
  {
    name: "男",
  },
  {
    name: "女",
  },
  {
    name: "保密",
  },
]);
const rules = ref({
  "userInfo.name": {
    type: "string",
    required: true,
    message: "请填写姓名",
    trigger: ["blur", "change"],
  },
  "userInfo.sex": {
    type: "string",
    max: 1,
    required: true,
    message: "请选择男或女",
    trigger: ["blur", "change"],
  },
});

const sexSelect = function (e) {
  console.log(e.name);
};
</script>
