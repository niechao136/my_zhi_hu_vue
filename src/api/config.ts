import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useLoading, useMsg, useTip } from '@/hook'
import { useToken } from '@/store'
import { Result } from '@/type'

const { closeLoading } = useLoading()
const { errorMsg } = useMsg()
const { showTip } = useTip()
const { getToken } = useToken()

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
    if (!not_need_token.find(o => config.url?.endsWith(o))) {
      config.headers.Authorization = getToken()
    }
    return config
  }, () => {
    closeLoading()
    errorMsg('Request Error')
  }
)

service.interceptors.response.use(
  async (response: AxiosResponse<Result.Base>) => {
    if (response?.data?.status === 400) {
      closeLoading()
      location.href = '/login'
      return Promise.reject(response)
    }
    if (response?.data?.status === 401) {
      closeLoading()
      await showTip({
        title: '用户登出',
        msg: '用户已登出，请重新登入',
        confirm_text: '重新登入',
        block_close: true,
        confirm: () => {
          location.href = '/login'
        }
      })
      return Promise.reject(response)
    }
    return response
  }, (error) => {
    closeLoading()
    errorMsg('Network Error')
    return Promise.reject(error)
  }
)

export default service
