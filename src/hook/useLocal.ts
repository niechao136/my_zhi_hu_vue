
export const useLocal = () => {

  const getLocal = (key: string) => localStorage.getItem(key)

  const setLocal = (key: string, value: string) => localStorage.setItem(key, value)

  const rmLocal = (key: string) => localStorage.removeItem(key)

  return { getLocal, setLocal, rmLocal }

}

