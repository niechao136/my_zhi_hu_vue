import { ElLoadingService } from 'element-plus'
import { ref } from 'vue'

export const useLoading = () => {

  const instance = ElLoadingService({
    lock: true,
    fullscreen: true,
    text: 'Loading...',
    background: 'rgba(255, 255, 255, 0.7)',
    visible: false,
  })
  const array = ref<string[]>([])

  const startLoading = (key: string) => {
    array.value.push(key)
    instance.visible.value = true
  }

  const stopLoading = (key: string) => {
    array.value = array.value.filter(o => o !== key)
    if (array.value.length === 0) instance.close()
  }

  const closeLoading = () => instance.close()

  return { closeLoading, startLoading, stopLoading }
  
}
