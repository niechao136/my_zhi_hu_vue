import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useCookie } from '@/hook'

export const useToken
  = defineStore('token', () => {

  const token = ref('')

  const { getCookie, setCookie, rmCookie } = useCookie()

  const initToken = () => {
    const cookie = getCookie('MY_ZHU_HU_TOKEN')
    if (!!cookie) setToken(cookie)
  }
  const setToken = (target: string) => {
    token.value = target
    setCookie('MY_ZHU_HU_TOKEN', target)
  }
  const getToken = () => token.value
  const clearToken = () => {
    token.value = ''
    rmCookie('MY_ZHU_HU_TOKEN')
  }

  return { getToken, setToken, clearToken, initToken }

})
