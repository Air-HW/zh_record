<template>
  <view v-for="(item, index) in recordDetailList" :key="index">
    <view class="paydetail">
      <view class="detailitem">
        <view class="detailitem-title">
          <view class="detailitem-title-date">
            <text>{{ item.MonthDay }}</text>
            <text>{{ item.WeekDay }}</text>
          </view>
          <view class="detailitem-title-money">
            <text>支出:</text>
            <u-icon name="rmb" :bold="true" size="20rpx"></u-icon>
            <text style="font-weight: bold">{{ item.Expense }}</text>
          </view>
          <view class="detailitem-title-money">
            <text>收入:</text>
            <u-icon name="rmb" :bold="true" size="20rpx"></u-icon>
            <text style="font-weight: bold">{{ item.Income }}</text>
          </view>
        </view>
        <view v-for="(data, dataindex) in item.RecordData" :key="dataindex">
          <view class="detailitem-pay">
            <view class="detailitem-pay-icon">
              <view class="detailitem-pay-iconbac">
                <u-image width="70rpx" height="70rpx" :src="data.IncomeExpenseUrl" mode="aspectFill"></u-image>
              </view>
            </view>
            <view class="detailitem-pay-title">
              <u-cell size="large" :title="data.NickName" :border="false"
                :value="data.Type == 0 ? `+${data.Amount}` : `-${data.Amount}`"
                :label="data.IncomeExpenseName + (data.Remarks ? ' | ' + data.Remarks : '')"></u-cell>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
  <u-back-top :scroll-top="scrollTop" :icon-style="iconStyle" :custom-style="customStyle"></u-back-top>
</template>
<script lang="ts" setup>
import { RecordDetailView, processRecordData } from '../../detail';
import { onLoad, onPageScroll } from '@dcloudio/uni-app';
import { InExTypeDetailRequestData } from '@/api/demo/model/StatisticsModel';
import { postIETypeDetail } from '@/api/demo/statistics';
import { useUserStore } from '@/stores/modules/user';
import { reactive, ref } from 'vue';
const recordDetailList = ref<RecordDetailView[]>([])
const paraData = ref<InExTypeDetailRequestData>({
  Id: '',
  TypeId: '',
  StartTime: '',
  EndTime: ''
});
const userStore = useUserStore();
onLoad(async (query) => {
  paraData.value.Id = userStore.getDefaultId;
  paraData.value.TypeId = query.TypeId;
  paraData.value.StartTime = query.StartTime;
  paraData.value.EndTime = query.EndTime;
  const req = await postIETypeDetail(paraData.value);
  recordDetailList.value = processRecordData(req.data);
})
const scrollTop = ref(0);
const iconStyle = reactive({
  color: '#fff',
  fontSize: '36rpx'
});
const customStyle = reactive({
  backgroundColor: '#3c9cff'
});
onPageScroll((e) => {
  scrollTop.value = e.scrollTop;
});
</script>
<style lang="scss" scoped>
.paydetail {
  width: 100%;

  .detailitem {
    width: 92%;
    margin: auto;
    box-shadow: 0rpx 0rpx 40rpx rgba(0, 0, 0, 0.1);
    border-radius: 20rpx;
    background-color: white;
    margin-top: 40rpx;

    .detailitem-title {
      width: 100%;
      height: 80rpx;
      line-height: 80rpx;
      display: flex;

      .detailitem-title-date {
        flex: 1;
        font-size: 25rpx;
        display: flex;

        text {
          opacity: 0.8;
        }
      }

      .detailitem-title-date text:first-child {
        margin-left: 16rpx;
        margin-right: 6rpx;
      }

      .detailitem-title-money {
        flex: 1;
        font-size: 24rpx;
        display: flex;
        align-items: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        justify-content: center;
      }

      .detailitem-title-money text:first-child {
        opacity: 0.8;
      }
    }

    .detailitem-pay {
      display: flex;

      .detailitem-pay-icon {
        height: 100%;
        flex: 1;

        .detailitem-pay-iconbac {
          margin: auto;
          width: 100rpx;
          height: 100rpx;
          margin-top: 10rpx;
          border-radius: 20rpx;
          float: right;
          background-color: $default-color;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .detailitem-pay-title {
        height: 100%;
        flex: 4.4;
      }
    }
  }
}
</style>