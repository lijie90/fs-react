// /**
//  * 成功
//  */
//  SUCCESS("200", "success"),

//  /**
//   * 失败
//   */
//  FAIL("500", "failed"),

//  /**
//   * 请求成功
//   */
//  HTTP_STATUS_200("200", "ok"),

//  /**
//   * 请求失败
//   */
//  HTTP_STATUS_400("400", "request error"),

//  /**
//   * 没有身份验证
//   */
//  HTTP_STATUS_401("401", "no authentication"),

//  /**
//   * body 参数确实
//   */
//  HTTP_STATUS_402("402","request body miss"),

//  /**
//   * 没有操作权限
//   */
//  HTTP_STATUS_403("403", "no authorities"),

//  /**
//   * 请求方式不支持
//   **/
//  HTTP_STATUS_405("405", "method not allowed"),

//  /**
//   * 请求不被接受
//   **/
//  HTTP_STATUS_406("406", "Not Acceptable"),

//  /**
//   * 参数错误
//   **/
//  HTTP_STATUS_422("422", "invalid param"),

//  /**
//   * 接口频率限制
//   **/
//  HTTP_STATUS_429("429","api request limit"),

//  /**
//   * 服务器异常
//   */
//  HTTP_STATUS_500("500", "server error");
export const responseOperation = (status: string) => {
  switch (status) {
    //token过期或未认证
    case '401':
      localStorage.clear()
      //react跳转到登录页
      window.location.href = '/login'
      break

    default:
      break
  }
}
