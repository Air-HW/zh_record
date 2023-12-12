<!--
 * @Author: 张书瑞
 * @Date: 2023-08-20 18:13:26
 * @LastEditors: 张书瑞
 * @LastEditTime: 2023-12-10 20:33:47
 * @FilePath: \zh_record\src\pages\accountbook\accountbook.vue
 * @Description: 
 * @email: 1592955886@qq.com
 * Copyright (c) 2023 by 张书瑞, All Rights Reserved. 
-->
<template>
  <view class="container">
    <view v-for="(item, index) in bookModel.list" :key="index">
      <view class="container_record">
        <view class="container_record_frist">
          <view class="container_record_frist_left">
            <text style="font-size: 40rpx;" v-if="!item.IsEdit">{{ item.Title }}</text>
            <input @input="onKeyInput($event, index)" focus :value="item.Title" class="inputStyple" v-if="item.IsEdit" />
            <u-icon name="edit-pen" color="#2979ff" v-if="!item.IsEdit" size="50rpx" @click="edit(index)"></u-icon>
            <u-icon name="checkmark" color="#2979ff" v-if="item.IsEdit" size="50rpx" @click="save(index)"></u-icon>
          </view>
          <view class="container_record_frist_right">
            <u-avatar-group max-count="3" :urls="item.HeadPortraitUrlList" size="70rpx" gap="0.5"></u-avatar-group>
          </view>
        </view>
        <view class="container_record_two">
          <u-button type="primary" shape="circle" :customStyle="customStyle" text="分享" open-type="share"></u-button>
          <u-button type="primary" shape="circle" :plain="bookId !== item.Id" :customStyle="customStyle" text="默认"
            @click="defaultClick(item.Id)"></u-button>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { getBook, updateBook } from '@/api/demo/book';
import { useUserStore } from '@/stores/modules/user';
import { onShareAppMessage, onShow } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue';
import { BookList } from '.';
import { UpdateBookRequestData } from '@/api/demo/model/BookModel';
import { LoginProviderEnum } from '@/enums/loginProviderEnum';
var store = useUserStore();
interface Book {
  list: BookList[]
}
const bookModel = reactive<Book>({
  list: []
})
const bookId = ref<string>(null);
onShow(async () => {
  bookModel.list = [];
  var res = await getBook();
  bookId.value = store.getDefaultId;
  if (res.isSuccess) {
    bookModel.list = res.data.map(s => {
      let urls: string[] = s.WxUserInfo.map(x => x.HeadPortraitUrl);
      return {
        Id: s.Id,
        IsDefault: s.IsDefault,
        Title: s.Title,
        WxUserId: s.WxUserId,
        HeadPortraitUrlList: urls,
        IsEdit: false
      };
    });
  }
})
const customStyle = reactive({
  width: '200rpx',
  fontSize: "100rpx"
});
const edit = (index: number) => {
  bookModel.list[index].IsEdit = true;
}
const save = async (index: number) => {
  const data: UpdateBookRequestData = {
    Id: bookModel.list[index].Id,
    Titile: bookModel.list[index].Title
  }
  bookModel.list[index].IsEdit = false;
  console.log(bookModel.list);
  await updateBook(data);
}
const onKeyInput = (event, index) => {
  bookModel.list[index].Title = event.detail.value;
}
const defaultClick = (Id: string) => {
  store.setDefaultId(Id);
  bookId.value = Id;
}
onShareAppMessage(() => {
  return {
    title: store.userInfo.NickName + '邀请你一起记账啦',
    path: '/pages/ShareBills/ShareBills?',
    imageUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fc03a255b-2dee-4ec6-afd3-9b5ca0af9d55%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1704788470&t=f9f7d7612c092f7560e0e74d5e69acf3',
    query: ''
  }
})
</script>
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &_record {
    border-radius: 20rpx;
    margin-top: 40rpx;
    width: 650rpx;
    height: 300rpx;
    box-shadow: 0rpx 0rpx 40rpx rgba(0, 0, 0, 0.3);

    &_frist {
      height: 150rpx;
      display: flex;
      border-bottom: 1rpx rgb(200, 200, 200) solid;

      &_left {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 2;
      }

      &_right {
        display: flex;
        align-items: center;
        flex: 1;
      }
    }

    &_two {
      height: 150rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.inputStyple {
  font-size: 40rpx;
  width: 170rpx;
}
</style>