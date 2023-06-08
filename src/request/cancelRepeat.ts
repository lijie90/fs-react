import axios, { InternalAxiosRequestConfig } from 'axios'
import Qs from 'qs'

const pendingRequest = new Map()

// 请求生成一个唯一得key
function generateReqKey(config: InternalAxiosRequestConfig<any>) {
  const { method, url, params, data } = config
  return [method, url, Qs.stringify(params), Qs.stringify(data)].join('&')
}

// 唯一得key，添加到Map集合中
export function addPendingRequest(config: InternalAxiosRequestConfig<any>) {
  const requestKey = generateReqKey(config) // 生成唯一得key
  // 保存cancelToken,用于取消请求
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingRequest.has(requestKey)) {
        // 检查集合中是否存在
        pendingRequest.set(requestKey, cancel) // key添加到集合中
      }
    })
}

// 取消请求，删除唯一的key
export function removePendingRequest(config: InternalAxiosRequestConfig<any>) {
  const requestKey = generateReqKey(config) // 生成唯一得key
  if (pendingRequest.has(requestKey)) {
    // 检查集合中是否存在
    const cancelToken = pendingRequest.get(requestKey) // 获取key，对应的CancelToken
    cancelToken(requestKey) // 取消请求
    pendingRequest.delete(requestKey) // 删除唯一得key
  }
}
