import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
  ReactElement,
  FC
} from 'react'
import { Modal } from './Modal'
import { ModalProviderProps, ModalOptions } from './types'

/**
 * Modal Content Context
 */
type ModalContext = {
  showModal: (content: ReactElement, options?: ModalOptions) => void
  hideModal: () => void
}

/**
 * Modal Context
 */
const ModalContext = createContext<ModalContext>({
  showModal: () => {},
  hideModal: () => {}
})

export const ModalProvider: FC<ModalProviderProps> = ({
  children,
  configs
}) => {
  const [show, setShow] = useState(false)
  const [content, setContent] = useState<ReactElement>()
  const [options, setOptions] = useState<ModalOptions | undefined>(configs)

  const showModal = (content: ReactElement, options?: ModalOptions) => {
    setOptions((prev) => ({ ...prev, ...options }))
    setContent(cloneElement(content, {}, null))
    setShow(true)
  }

  const hideModal = () => {
    setShow(false)
  }

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Modal show={show} onClose={hideModal} {...options}>
        {content}
      </Modal>
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  return useContext(ModalContext)
}
