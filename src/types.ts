import { ReactElement } from 'react'

export type ModalOptions = {
  title?: string | ReactElement
  customHeader?: string | ReactElement
  customFooter?: string | ReactElement
  maskClosable?: boolean
  closable?: boolean
  closableWithEsc?: boolean
  cancelText?: string
  okText?: string
  width?: string
  zIndex?: number
  onOk?: () => void
  onClose?: () => void
}

export type ModalProviderProps = {
  configs?: ModalOptions
}
