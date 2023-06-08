import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios'
import { axiosConfig } from './config'
import { responseOperation } from './response'
import { message } from 'antd'
import { addPendingRequest, removePendingRequest } from './cancelRepeat'
const { result_code, request_timeout } = axiosConfig
export const PATH_URL = import.meta.env.VITE_BASE_URL

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: PATH_URL, // api 的 base_url
  timeout: request_timeout // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    removePendingRequest(config) // 检查是否存在重复请求，若存在则取消已发的请求
    addPendingRequest(config) // 把当前请求信息添加到pendingRequest对象中
    config.headers.Accept = 'application/json;charset=UTF-8'
    const token = localStorage.getItem('token') || ''
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error: AxiosError) => {
    // Do something with request error
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  (response: AxiosResponse<ResponseProps>) => {
    removePendingRequest(response.config) // 从pendingRequest对象中移除请求
    //更新token
    if (response.headers) {
      if (response.headers.authorization) {
        localStorage.setItem('token', response.headers.authorization)
      }
    }
    //文件类型处理
    if (
      response.config &&
      response.config.responseType &&
      response.config.responseType === 'blob'
    ) {
      return Promise.resolve(response)
    }
    //其他类型的请求处理
    if (response.data.status === result_code) {
      //状态码为200时进一步处理详细的请求响应
      return Promise.resolve(response.data.data)
    } else {
      const status = response?.data?.status || '500'
      const messageText = response?.data?.message || '请求异常'
      responseOperation(status)
      message.open({
        type: 'error',
        content: messageText,
        duration: 1,
        onClose: () => {
          message.destroy()
        }
      })
      return Promise.reject(response?.data?.message)
    }
  },
  (error: AxiosError) => {
    removePendingRequest(error.config as InternalAxiosRequestConfig<any>) // 从pendingRequest对象中移除请求
    message.open({
      type: 'error',
      content: error.message,
      duration: 1,
      onClose: () => {
        message.destroy()
      }
    })
    const status = String(error?.response?.status) || '500'
    responseOperation(status)
    return Promise.reject(error)
  }
)

export default service
