import { AxiosResponse } from 'axios'
import http from './http'
import store from '@/store'
import { setLoading } from '@/store/modules/common'

// 请求拦截器,每次请求前都会调用,可以在这里进行一些操作,比如loading等
const request = (config: any, loading = false) => {
  return new Promise((resolve, reject) => {
    if (loading) {
      store.dispatch(setLoading(true))
    }
    http(config)
      .then((res: AxiosResponse) => {
        resolve(res)
      })
      .catch((err: unknown) => {
        reject(err)
      })
      .finally(() => {
        store.dispatch(setLoading(false))
      })
  })
}
export const getRequest = (config: any, loading = false) => {
  return request(
    {
      ...config,
      method: 'GET'
    },
    loading
  )
}
export const postRequest = (config: any, loading = false) => {
  return request(
    {
      ...config,
      method: 'POST'
    },
    loading
  )
}
export default request
