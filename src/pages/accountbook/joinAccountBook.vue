<template>
  <view class="container">
    <view class="card">
      <view class="card_content">
        <view class="card_content_body">
          {{ body }}
        </view>
        <view class="card_content_foot">
          <u-row>
            <u-col span="6" offset="3">
              <u-button type="primary" icon="man-add" text="加入账单" @click="Join" shape="circle"></u-button>
            </u-col>
          </u-row>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { joinAccountBook } from '@/api/demo/book';
import { JoinAccountBookInputRequestData } from '@/api/demo/model/BookModel';
import { ShowToast } from '@/utils/toast';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
const body = ref("邀请你加入账单");
const joinRequest = ref<JoinAccountBookInputRequestData>({
  AccountBookId: null,
  WxUserId: null
});
onLoad((query) => {
  joinRequest.value.AccountBookId = query.AccountBookId;
  joinRequest.value.WxUserId = query.WxUserId;
  body.value = `${query.NickName}${body.value}`
})
const Join = async () => {
  const res = await joinAccountBook(joinRequest.value)
  if (res.data == true) {
    ShowToast("加入成功", "success");
  } else {
    ShowToast(res.msg ?? "加入失败", "error");
  }
  setTimeout(() => {
    uni.switchTab({
      url: '/pages/home/index'
    });
  }, 2000);
}
</script>
<style scoped lang="scss">
.container {
  margin-top: 100rpx;
  height: 100%;
  width: 100%;
}

.card {
  height: 500rpx;
  width: 700rpx;
  border: 2rpx dashed #ccc;
  border-radius: 30rpx;
  margin: auto;

  &_content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;

    &_foot {
      margin-top: auto;
      margin-bottom: 30rpx;
    }

    &_body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }
}
</style>