import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useLoading, useMsg } from '@/hook'

// const { stopLoading } = useLoading()
// const { errorMsg } = useMsg()

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

const form_data: string[] = [
  'image/upload',
]

service.interceptors.request.use(
  config => {
    if (!!form_data.find(o => config.url?.endsWith(o))) {
      config.headers['Content-Type'] = 'multipart/form-data'
    }
    return config
  }, () => {
    // stopLoading()
    // errorMsg('Request Error')
  }
)

service.interceptors.response.use(
  (response) => {
    return response
  }, (error) => {
    // stopLoading()
    // errorMsg('Network Error')
    return Promise.reject(error)
  }
)

export default service
