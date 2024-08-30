import Cookie from 'js-cookie'

export const useCookie = () => {
  const getCookie = (key: string) => Cookie.get(key)
  const setCookie = (key: string, value: string, expires: number = 1) => Cookie.set(key, value, { expires })
  const rmCookie = (key: string) => Cookie.remove(key)

  return {
    getCookie, rmCookie, setCookie
  }
}
