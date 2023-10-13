/**
 * @description: 响应状态
 */
export enum ResultEnum {
    SUCCESS = 0,
    ERROR = 1,
    TIMEOUT = 401,
    TYPE = 'success',
  }
  
  /**
   * @description: 请求类型
   */
  export enum RequestEnum {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
  }
  
  /**
   * @description:  请求头
   */
  export enum ContentTypeEnum {
    // json
    JSON = 'application/json;charset=UTF-8',
    // form-data qs
    FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
    // form-data  upload
    FORM_DATA = 'multipart/form-data;charset=UTF-8',
  }
  