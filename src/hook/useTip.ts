import { ElMessageBox } from 'element-plus'

interface ITipOption {
  msg: string
  title?: string
  block_close?: boolean
  hide_close?: boolean
  show_cancel?: boolean
  cancel_text?: string
  confirm_text?: string
  close?: () => (Promise<void> | void)
  cancel?: () => (Promise<void> | void)
  confirm?: () => (Promise<void> | void)
}

export const useTip = () => {
  const showTip = async (opt: ITipOption) => {
    await ElMessageBox({
      message: opt.msg,
      ...!!opt?.title ? { title: opt.title } : {},
      showClose: !opt?.hide_close,
      showCancelButton: !!opt?.show_cancel,
      cancelButtonText: opt?.cancel_text ?? '取消',
      showConfirmButton: true,
      confirmButtonText: opt?.confirm_text ?? '确认',
      closeOnClickModal: !opt?.block_close,
      closeOnPressEscape: !opt?.block_close,
      closeOnHashChange: !opt?.block_close,
      beforeClose: async (action, instance, done) => {
        switch (action) {
          case 'confirm':
            if (!!opt?.confirm) {
              await opt.confirm()
            }
            break
          case 'cancel':
            if (!!opt?.cancel) {
              await opt.cancel()
            }
            break
          case 'close':
            if (!!opt?.close) {
              await opt.close()
            }
            break
        }
        done()
      }
    });
  }

  return { showTip }
}
