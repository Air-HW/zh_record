<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
    uni.getSystemInfo({
      success: (res) => {
        uni.$statusBarHeight = res.statusBarHeight;
      },
    });
    // #ifdef MP-WEIXIN
    const updateManager = uni.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function () {
          uni.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: function (res) {
              if (res.confirm) {
                updateManager.applyUpdate();
              }
            }
          });
        });
        updateManager.onUpdateFailed(function () {
          uni.showModal({
            title: '更新提示',
            content: '新版本下载失败，请检查您的网络状态并重启应用。',
            showCancel: false
          });
        });
      }
    });
    // #endif
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style lang="scss">
@import "@/uni_modules/uview-plus/index.scss";
</style>
