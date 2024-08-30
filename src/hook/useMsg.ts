import { ElMessage } from 'element-plus'

export const useMsg = () => {
  const successMsg = (text: string) => {
    ElMessage.success({ message: text, type: 'success', plain: true })
  }
  const warningMsg = (text: string) => {
    ElMessage.warning({ message: text, type: 'warning', plain: true })
  }
  const infoMsg = (text: string) => {
    ElMessage.info({ message: text, type: 'info', plain: true })
  }
  const errorMsg = (text: string) => {
    ElMessage.error({ message: text, type: 'error', plain: true })
  }

  return { successMsg, warningMsg, infoMsg, errorMsg }
}
