<!--
 * @Author: 张书瑞
 * @Date: 2023-05-10 21:42:42
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-05-15 22:45:05
 * @FilePath: \zh_record\src\pages\list\list.vue
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
-->
<template>
  <view>
    <!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
    <u-form labelPosition="left" :model="form" :rules="rules" ref="uForms">
      <u-form-item label="姓名" prop="name" borderBottom="true">
        <u-input :border="border" v-model="form.name"></u-input>
      </u-form-item>
      <u-form-item label="性别" prop="sex" borderBottom="true" @click="showSex = true">
        <u-input disabled disabledColor="#ffffff" v-model="form.sex" placeholder="请选择性别" :border="border"></u-input>
        <template #right>
          <u-icon name="arrow-right"></u-icon>
        </template>
      </u-form-item>
    </u-form>
    <u-button type="primary" @click="submit">提交</u-button>
    <u-action-sheet :show="showSex" :actions="actions" title="请选择性别" description="如果选择保密会报错" @close="showSex = false"
      @select="sexSelect">
    </u-action-sheet>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const border = ref('none');
const showSex = ref(false);
//定义一个用户性别的泛型

const form = ref({
  name: '',
  sex: ''
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
  name: [{
    type: "string",
    required: true,
    message: "请填写姓名",
    trigger: ["blur", "change"],
  },
  {
    min: 6,
    max: 8,
    message: '长度在6-8个字符之间',
    trigger: ["blur", "change"]
  }],
  sex: {
    type: "string",
    max: 1,
    required: true,
    message: "请选择男或女",
    trigger: ["blur", "change"],
  },
});

const sexSelect = (e) => {
  form.value.sex = e.name;
};
const uForms = ref();
const submit = () => {
  console.log();
  uForms.value.validate().then(res => {
    if (res) {
      console.log(form.value);
    }
    console.log(res);
  }).catch(err => {
    console.log(err);
  })

}
</script>
