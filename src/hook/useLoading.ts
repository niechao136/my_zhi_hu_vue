import { ElLoading } from 'element-plus'
import type { LoadingOptions } from 'element-plus'
import { ref } from 'vue'

export const useLoading = () => {

  const instance = ref(null)

  const startLoading = (option: LoadingOptions = {}) => {
    instance.value = ElLoading.service({
      lock: true,
      fullscreen: true,
      text: 'Loading...',
      background: 'rgba(255, 255, 255, 0.7)',
      ...option
    })
  }

  const stopLoading = () => instance.value?.close()

  return { startLoading, stopLoading }
  
}
