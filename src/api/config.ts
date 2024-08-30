import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useLoading, useMsg } from '@/hook'

const { stopLoading } = useLoading()
const { errorMsg } = useMsg()

const config: AxiosRequestConfig = {
  timeout: 300 * 1000,
  baseURL: import.meta.env.VITE_APP_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
}

const service = axios.create(config)

const not_need_token: string[] = [
  'server/info',
  'auth/login',
  'user/register',
]

service.interceptors.request.use(
  config => {
    return config
  }, () => {
    stopLoading()
    errorMsg('Request Error')
  }
)

service.interceptors.response.use(
  (response) => {
    return response
  }, (error) => {
    stopLoading()
    errorMsg('Network Error')
    return Promise.reject(error)
  }
)

export default service
