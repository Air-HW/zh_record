<!--
 * @Author: 张书瑞
 * @Date: 2023-05-28 20:15:01
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-10-29 22:47:31
 * @FilePath: \zh_record\src\pages\setting\index.vue
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
-->
<template>
  <view class="grid-container">
    <u-grid :border="false" col="4">
      <u-grid-item v-for="(item, index) in state.list" :key="index" @click="handleClick(index)">
        <view class="griditem-icon" :class="{ 'griditem-title': index == selectedIndex && selectedIndex !== -1 }">
          <u-icon :name="item.ImageUrl" :size="40"></u-icon>
        </view>
      </u-grid-item>
    </u-grid>
  </view>
  <u-popup mode="center" :show="popupShow" :round="10" @close="popupClose" :safeAreaInsetBottom="false">
    <view class="popup-container">
      <view class="popup-form">
        <u-form :model="formData" :rules="formRules" ref="uForms">
          <u-form-item label="分类" prop="type" label-width="40px" class="form-item">
            <u-radio-group @change="radioChange" v-for="(item, index) in radiolist" v-model="radiovalue">
              <u-radio :key="index" :label="item.name" :name="item.type"></u-radio>
            </u-radio-group>
          </u-form-item>
          <u-form-item label="标题" prop="name" label-width="40px" class="form-item">
            <u-input v-model="formData.name" :borderBottom="true" placeholder="请输入标题" class="input"></u-input>
          </u-form-item>
        </u-form>
        <u-button shape="circle" type="primary" class="submit-btn" @click="submitForm">提交</u-button>
      </view>
    </view>
  </u-popup>
</template>
<script lang="ts" setup>
import { getCustomIncomeExpenseType, insertCustomIncomeExpenseType } from '@/api/demo/list';
import { CustomRequestData, CustomIncomeExpenseTypeList } from '@/api/demo/model/IncomeExpenseTypeModel';
import { useUserStore } from '@/stores/modules/user';
import { ShowToast } from '@/utils/toast';
import { ref, reactive, onMounted } from 'vue';

const userStore = useUserStore();
const DefaultId = userStore.getDefaultId;
const userinfo = userStore.getUser;
interface CustomIncomeExpenseType{
  list: CustomIncomeExpenseTypeList[]
}
const state = reactive<CustomIncomeExpenseType>({
  list: []
});
onMounted(async () => {
  var res = await getCustomIncomeExpenseType();
  state.list = res.data;
})
const selectedIndex = ref(-1);
const popupShow = ref(false);
const radiovalue = ref(1);
const radiolist = reactive([
  { name: '支出', type: 1 },
  { name: '收入', type: 0 }
]);
const formData = reactive<CustomRequestData>({
  accountBookId: DefaultId,
  wxUserId: userinfo?.Id,
  isSystemDefault: false,
  type: radiovalue.value,
  name: "",
  iconId: ""
});
//表单校验
const formRules = ref({
  type: [
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
  name: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    {
      pattern: /^.{0,4}$/,
      transform(value) {
        return String(value);
      },
      message: '最多保留四个长度'
    }
  ]
});
const uForms = ref();
const submitForm = async () => {
  uForms.value.validate().then(async res => {
    if (res) {
      console.log(formData);
      var data = await insertCustomIncomeExpenseType(formData);
      if (data.isSuccess) {
        radiovalue.value = 1;
        formData.name = "";
        formData.iconId = "";
        popupClose();
        ShowToast("提交成功", "success");
      } else {
        ShowToast(data.msg, "error");
      }
    }
  })
}
const handleClick = (index) => {
  selectedIndex.value = index;
  popupShow.value = true;
  formData.iconId = state.list[index].Id;
}
const popupClose = () => {
  popupShow.value = false;
  selectedIndex.value = -1;
  formData.iconId = "";
}
const radioChange = (type) => {
  radiovalue.value = type;
  formData.type = type;
}
</script>
<style scoped lang="scss">
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