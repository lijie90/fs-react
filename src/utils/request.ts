//封装axios
import axios from 'axios'
import { message } from 'antd'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 1000
})
instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    message.error(error.message)
  }
)
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    message.error(error.message)
  }
)