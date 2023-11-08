<!--
 * @Author: 张书瑞
 * @Date: 2023-08-20 18:26:09
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-11-08 23:16:44
 * @FilePath: \zh_record\src\pages\userinfo\userinfo.vue
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
-->
<template>
  <view class="container">
    <view class="container_one">
      <view class="container_one_header">
        <u-avatar class="uavatar" :src="userData.HeadPortraitUrl" size="200rpx" @click="avatarClick"></u-avatar>
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
            <u-input :borderBottom="true" placeholder="昵称" class="input" v-model="userData.NickName"></u-input>
          </view>
        </view>
        <view class="container_content_body">
          <text class="container_content_body_title">联系电话</text>
          <view class="container_content_body_content">
            <u-input :borderBottom="true" placeholder="联系电话" class="input" v-model="userData.Phone"></u-input>
          </view>
        </view>
        <view class="container_content_body">
          <text class="container_content_body_title">出生日期</text>
          <view class="container_content_body_content">
            <u-input :borderBottom="true" placeholder="出生日期" class="input" v-model="userData.BrithDay"></u-input>
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
        </view>
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
import { LoginProviderEnum } from '@/enums/loginProviderEnum';
import { ShowToast } from '@/utils/toast';
import { ApiResult } from '@/api/model/baseModel';
import { updateUserInfo } from '@/api/demo/user';
import { onShow } from '@dcloudio/uni-app';
import { BASE_URL } from '@/utils/http/unirequest';
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
onShow(() => {
  userData.value = { ...userinfo };
})
let avatarFile = null;
const avatarClick = () => {
  //#region 登录
  // uni.login({
  //   provider: LoginProviderEnum.微信,
  //   success: (res) => {
  //     console.log('微信登录成功', res.code)
  //   },
  //   fail: (res) => {
  //     console.log('微信登录失败', res)
  //   }
  // });
  // uni.getUserProfile({
  //   provider: LoginProviderEnum.微信,
  //   desc: "授权登录",
  //   success: (info) => {
  //     console.log(info.userInfo);
  //   },
  //   fail: (infoerror) => {
  //     console.log('getUserProfile', infoerror)
  //   }
  // })
  // uni.getUserInfo({
  //   provider: 'weixin',
  //   success: function (infoRes) {
  //     console.log(infoRes.userInfo);
  //   }
  // });
  //#endregion
  uni.chooseImage({
    count: 1,
    success: (res) => {
      avatarFile = res.tempFilePaths[0];
      userData.value.HeadPortraitUrl = res.tempFilePaths[0];
    }
  })
}
const save = async () => {
  if (avatarFile !== null) {
    uni.uploadFile({
      url: `${BASE_URL}/api/WxUser/${userData.value.Id}`,
      filePath: avatarFile,
      name: 'File',
      header: {
        "Authorization": `Bearer ${userStore.getToken}`
      },
      formData: {
        'NickName': userData.value.NickName,
        'Sex': userData.value.Sex,
        'Phone': userData.value.Phone,
        'Email': userData.value.Email,
        'BrithDay': userData.value.BrithDay
      },
      success: (res) => {
        const data = JSON.parse(res.data) as ApiResult<UserInfo>;
        if (data.isSuccess) {
          userStore.setUser(data.data);
          ShowToast("修改成功", "success");
        } else {
          ShowToast(data.msg, "error");
        }
      },
      fail: (err) => {
        ShowToast(err.errMsg, "error");
      }
    })
  } else {
    const res = await updateUserInfo(userData.value.Id, userData.value);
    if (res.isSuccess) {
      userStore.setUser(res.data);
      ShowToast("修改成功", "success");
    } else {
      ShowToast(res.msg, "error");
    }
  }
}
const cancel = () => {
  uni.switchTab({
    url: '/pages/home/index'
  });
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