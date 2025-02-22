<!--
 * @Author: 张书瑞
 * @Date: 2023-05-10 21:42:42
 * @LastEditors: 张书瑞
 * @LastEditTime: 2024-01-05 09:00:28
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
    <GridList :list="state.list" @click="handleClick" :listIndex="selectedIndex" />
  </view>
  <view v-if="curNow == 1">
    <GridList :list="state.listIncome" @click="handleClick" :listIndex="selectedIndex" />
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
                <image class="scroll-list_goods-item_body_image" :src="item.ImageUrl"></image>
              </view>
              <text class="scroll-list_goods-item_text">{{ item.Name }}</text>
            </view>
          </view>
        </u-scroll-list>
        <u-form-item label="金额" prop="Amount" label-width="80px" class="form-item">
          <u-input v-model="model.Amount" :borderBottom="true" placeholder="请输入金额" class="input"></u-input>
          <template #right>
            <u-datetime-picker ref="datetimePickerRef" :show="DataShow" v-model="SelectDate" @confirm="confirmData"
              @cancel="closeData" @close="closeData" mode="date" :closeOnClickOverlay="true"></u-datetime-picker>
            <u-button type="primary" size="small" @click="ShowDataPikc">{{ model.RecordTime }}</u-button>
          </template>
        </u-form-item>
        <u-form-item label="备注" prop="Remarks" label-width="80px" class="form-item">
          <u-textarea v-model="model.Remarks" placeholder="请输入备注"></u-textarea>
        </u-form-item>
        <u-button :customStyle="btnStyle" :disabled="btnDisabled" shape="circle" type="primary" @click="submitForm"
          class="submit-btn">提交</u-button>
        <u-button :customStyle="btnStyle" shape="circle" type="error" @click="clearForm" class="clear-btn">重置</u-button>
      </u-form>
    </view>
  </u-popup>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import GridList from "../../components/GridList/GridList.vue"
import { getIncomeExpenseType, insertAccountRecord } from "@/api/demo/list";
import { useUserStore } from "@/stores/modules/user";
import { TimeStampFormatDate } from "@/utils/helper";
import { ShowToast } from "@/utils/toast";
import { InsertOrUpdateRecordRequestData } from "@/api/demo/model/RecordModel";
import { IncomeExpenseTypeList } from "@/api/demo/model/IncomeExpenseTypeModel";
import { onShow } from "@dcloudio/uni-app";
const btnStyle = reactive({
  marginBottom: '20rpx'
});
const userStore = useUserStore();
let DefaultId = userStore.getDefaultId;
let userinfo = userStore.getUser;
interface IncomeExpenseType {
  list: IncomeExpenseTypeList[],
  listIncome: IncomeExpenseTypeList[],
}
const state = reactive<IncomeExpenseType>({
  list: [],
  listIncome: []
});
const curList = reactive(['支出', '收入']);
const curNow = ref(0)
const typeId = ref("");
const showPopup = ref(false);
const selectedIndex = ref(-1);
const SelectDate = ref(TimeStampFormatDate(Date.now()));
const uForms = ref();
const DataShow = ref(false);
//入参实体
const model = reactive<InsertOrUpdateRecordRequestData>({
  AccountBookId: DefaultId,
  WxUserId: userinfo?.Id,
  TypeId: typeId.value,
  Amount: null,
  Remarks: null,
  RecordTime: SelectDate.value
});
onShow(async () => {
  DefaultId = userStore.getDefaultId;
  userinfo = userStore.getUser;
  var res = await getIncomeExpenseType({
    AccountBookId: DefaultId
  });
  state.list = res.data.filter(item => item.Type === 1);
  state.listIncome = res.data.filter(item => item.Type === 0);
});
const sectionChange = (index) => {
  curNow.value = index;
};
let scrollList = reactive([]);
const handleClick = async (index) => {
  if (curNow.value === 0) {
    scrollList = state.list;
  } else {
    scrollList = state.listIncome;
  }
  selectedIndex.value = index;
  showPopup.value = true;
  typeId.value = scrollList[index].Id;
};
const scrollHandleClick = async (index) => {
  selectedIndex.value = index;
  typeId.value = scrollList[index].Id;
};
//关闭弹出层
const closePopup = () => {
  selectedIndex.value = -1;
  showPopup.value = false;
};
//表单校验
const rules = ref({
  Amount: [
    { required: true, message: '请输入金额', trigger: 'blur' },
    {
      pattern: /^\d+(\.\d{1,2})?$/,
      transform(value) {
        return String(value);
      },
      message: '最多保留两位小数'
    },
    {
      //设置金额最高不能大于50万
      asyncValidator: (rule, value, callback) => {
        if (value > 500000) {
          callback(new Error('单次金额不能大于50万'));
        } else {
          callback();
        }
      }
    }
  ]
});
//按钮限制多次点击
const btnDisabled = ref(false);
//提交表单
const submitForm = async () => {
  btnDisabled.value = true;
  uForms.value.validate().then(async (res) => {
    if (res) {
      model.TypeId = typeId.value;
      model.AccountBookId = DefaultId;
      model.WxUserId = userinfo.Id;
      const data = await insertAccountRecord(model);
      if (data.isSuccess) {
        ShowToast("提交成功", "success");
        clearForm();
        closePopup();
        SelectDate.value = TimeStampFormatDate(Date.now());
        btnDisabled.value = false;
      }
      else {
        ShowToast(data.msg, "error");
        btnDisabled.value = false;
      }
    }
  }).catch(() => {
    btnDisabled.value = false;
  })
};
//表单重置
const clearForm = async () => {
  for (const key in model) {
    if (Object.hasOwnProperty.call(model, key)) {
      if (key == "RecordTime") {
        SelectDate.value = TimeStampFormatDate(Date.now());
        model[key] = SelectDate.value;
        continue;
      }
      model[key] = '';
    }
  }
};
//打开日期选择器
const ShowDataPikc = () => {
  DataShow.value = true;
};
//确认选择时间
const confirmData = (e) => {
  const FormatDate = TimeStampFormatDate(e.value);
  DataShow.value = false;
  model.RecordTime = FormatDate;
};
//关闭日期选择器
const closeData = () => {
  DataShow.value = false;
};
</script>

<style lang="scss" scoped>
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
../../utils/helper/helper