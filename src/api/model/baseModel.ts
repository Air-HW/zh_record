/**
 * 接口统一返回格式
 */
export interface ApiResult<T> {
  status: Number;
  isSuccess: boolean;
  data: T;
  msg: string;
  date: string;
}
