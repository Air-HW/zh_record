
/**
 * 消息提示
 * @param title 消息内容
 * @param icon 展示图标
 * @param duration 展示时间
 */
export function ShowToast(title: string
  , icon: "success" | "loading" | "error" | "none" | "fail" | "exception" = "none"
  , duration: number = 2000): void {
  uni.showToast({
    title,
    duration,
    icon
  });
}