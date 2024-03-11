<!--
 * @Author: 张书瑞
 * @Date: 2023-08-20 18:26:09
 * @LastEditors: 张书瑞
 * @LastEditTime: 2024-01-21 21:55:52
 * @FilePath: \zh_record\src\pages\userinfo\userinfo.vue
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
-->
<template>
  <view class="container">
    <view class="container_one">
      <view class="container_one_header">
        <button class="btn-normal" open-type="chooseAvatar" @click="onClickAvatar" @chooseavatar="onChooseAvatar">
          <u-avatar class="uavatar" :src="HeadPortraitPath" size="200rpx"></u-avatar>
        </button>
      </view>
    </view>
    <view class="container_two">
      <view class="container_two_recordTitle">
        个人信息
      </view>
      <view class="container_content">
        <view class="container_content_body">
          <text class="container_content_body_title">昵称</text>
          <view class="container_content_body_content">
            <u-input :borderBottom="true" type="nickname" placeholder="昵称" class="input" v-model="userData.NickName"
              @input="onInputNickName" @blur="onInputNickName"></u-input>
          </view>
        </view>
        <!-- <view class="container_content_body">
          <text class="container_content_body_title">联系电话</text>
          <view class="container_content_body_content">
            <u-input :borderBottom="true" placeholder="联系电话" class="input" v-model="userData.Phone"></u-input>
          </view>
        </view>
        <view class="container_content_body">
          <text class="container_content_body_title">出生日期</text>
          <view class="container_content_body_content">
            <u-input :borderBottom="true" placeholder="出生日期" :disabled="true" class="input" v-model="userData.BrithDay">
              <template #suffix>
                <u-icon name="calendar" color="#3c9cff" size="30" @click="dataPickerClick"></u-icon>
                <u-datetime-picker ref="datetimePickerRef" :show="IsBrithDayShow" v-model="BrithDay" mode="date"
                  :closeOnClickOverlay="true" @close="dataPickerClose" @cancel="dataPickerClose"
                  @confirm="dataPickerConfirm" :minDate="minDate"></u-datetime-picker>
              </template>
            </u-input>
          </view>
        </view>
        <view class="container_content_body">
          <text class="container_content_body_title">性别</text>
          <view class="container_content_body_content">
            <u-radio-group v-model="userData.Sex" placement="row">
              <u-radio :customStyle="{ marginRight: '30rpx' }" label="男" name="0" />
              <u-radio :customStyle="{ marginRight: '30rpx' }" label="女" name="1" />
              <u-radio :customStyle="{ marginRight: '30rpx' }" label="保密" name="2" />
            </u-radio-group>
          </view>
        </view> -->
        <view class="container_content_bottom">
          <u-button shape="circle" type="info" :customStyle="customStyle" class="submit-btn" @click="cancel">取消</u-button>
          <u-button shape="circle" type="primary" :customStyle="customStyle" class="clear-btn" @click="save">保存</u-button>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useUserStore } from '@/stores/modules/user';
import { UserInfo } from '@/api/demo/model/UserModel';
import { ShowToast } from '@/utils/toast';
import { ApiResult } from '@/api/model/baseModel';
import { updateUserInfo } from '@/api/demo/user';
import { onShow } from '@dcloudio/uni-app';
import { BASE_URL } from '@/utils/http/unirequest';
import { TimeStampFormatDate, formatDate } from '@/utils/helper';
import { SingleUpload } from '@/api/demo/upload';
const customStyle = reactive({
  width: '250rpx',
});
const userStore = useUserStore();
const userinfo = userStore.getUser;
const userData = ref<UserInfo>({
  Id: "",
  NickName: "",
  Sex: 0,
  Phone: "",
  OpenID: "",
  HeadPortraitUrl: "",
  Email: "",
  BrithDay: null
})
const IsBrithDayShow = ref(false);
const minDate = ref(new Date(1900, 1, 1).getTime())
const BrithDay = ref();
const HeadPortraitPath = ref();
onShow(() => {
  userData.value = { ...userinfo };
  HeadPortraitPath.value = userData.value.HeadPortraitUrl;
  // userData.value.BrithDay = formatDate(new Date(userData.value.BrithDay));
  // BrithDay.value = userData.value.BrithDay;
})
let avatarFile = null;
const dataPickerClick = () => {
  IsBrithDayShow.value = true;
}
const dataPickerClose = () => {
  IsBrithDayShow.value = false;
}
const dataPickerConfirm = ({ value }) => {
  IsBrithDayShow.value = false;
  const dateStr = TimeStampFormatDate(value);
  userData.value.BrithDay = dateStr;
  BrithDay.value = dateStr;
}
const avatarClick = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: ({ tempFilePaths, tempFiles }) => {
      avatarFile = tempFiles[0];
      HeadPortraitPath.value = tempFilePaths[0];
    }
  })
}
// 点击头像按钮事件
const onClickAvatar = () => {
  // #ifdef MP-WEIXIN
  return;
  // #endif
  avatarClick();
}
// 选择头像事件 - 仅限微信小程序
// #ifdef MP-WEIXIN
const onChooseAvatar = ({ detail }) => {
  avatarFile = { path: detail.avatarUrl };
  HeadPortraitPath.value = detail.avatarUrl;
}
// #endif
const save = async () => {
  try {
    if (avatarFile !== null) {
      const data = await SingleUpload(avatarFile.path);
      userData.value.HeadPortraitUrl = data;
      avatarFile = null;
    }
    const res = await updateUserInfo(userData.value.Id, userData.value);
    userStore.setUser(res.data);
    ShowToast("修改成功", "success");
  } catch (error) {
    ShowToast(error, "error");
  }
}
const cancel = () => {
  uni.switchTab({
    url: '/pages/home/index'
  });
}
const onInputNickName = (val) => {
  if (val) {
    userData.value.NickName = val
  }
}
</script>
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  margin: 0px;
}

.container_one {
  border-bottom-left-radius: 30rpx;
  border-bottom-right-radius: 30rpx;
  background-image: linear-gradient(to right, #cbebff, #ddffdd);
  width: 100%;
  height: 300rpx;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &_header {
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200rpx;
    height: 200rpx;
    border-radius: 50%;
    margin: auto;

    .btn-normal {
      width: 200rpx;
      height: 200rpx;
      border-radius: 50%;
      border: none;
      background-color: transparent;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

  }

  &_body {
    margin: auto;
    width: 95%;
    border-radius: 20rpx;
    box-shadow: 0rpx 0rpx 40rpx rgba(0, 0, 0, 0.1);
  }
}

.container_two {
  width: 100%;

  &_recordTitle {
    margin: 20rpx;
    font-size: 40rpx;
  }

  .container_content {
    width: 95%;
    border: 2rpx dashed #ccc;
    border-radius: 30rpx;
    margin: auto;

    &_bottom {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .container_content_body {
      width: 90%;
      margin: auto;
      margin-top: 40rpx;

      &_title {
        font-size: 30rpx;
      }

      &_content {
        margin-top: 20rpx;
      }
    }

    .container_content_bottom {
      margin-top: 20rpx;
      margin-bottom: 20rpx;
    }
  }

}
</style>