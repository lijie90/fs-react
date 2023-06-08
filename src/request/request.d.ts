declare interface AxiosConfig {
  params?: any
  data?: any
  url?: string
  method?: AxiosMethod
  headersType?: string
  responseType?: AxiosResponseType
}
declare type Recordable<T = any, K = string> = Record<
  K extends null | undefined ? string : K,
  T
>
declare type ResponseProps = {
  status: string
  message?: string
  data?: any
  timestamp?: number
  code?: number
} & Recordable
declare type AxiosHeaders =
  | 'application/json'
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'
