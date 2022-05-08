import React, {
  useEffect,
  useRef,
  useMemo,
  FC,
  ReactElement,
  PropsWithChildren
} from 'react'
import { CSSTransition } from 'react-transition-group'
import { Button } from './Button'
import styles from './Modal.module.scss'
import { usePortal } from './usePortal'
import closeIcon from './assets/svg/close.svg'

export type ModalProps = {
  show: boolean
  title?: string | ReactElement
  customHeader?: string | ReactElement
  customFooter?: string | ReactElement
  maskClosable?: boolean
  closable?: boolean
  closableWithEsc?: boolean
  okText?: string
  cancelText?: string
  width?: string
  zIndex?: number
  onOk?: () => void
  onClose?: () => void
}

/**
 * Modal base component.
 */
export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  children,
  show,
  title = 'Modal',
  customHeader,
  customFooter,
  maskClosable = true,
  closable = true,
  closableWithEsc = true,
  okText = 'OK',
  cancelText = 'Cancel',
  width = '320px',
  zIndex = 999,
  onOk,
  onClose
}) => {
  const { Portal } = usePortal()
  const focusTargetRef = useRef<HTMLDivElement | null>(null)
  const transitionRef = useRef<HTMLDivElement | null>(null)

  // If the Escape button is pressed, the modal will be closed
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (closableWithEsc && ['Esc', 'Escape'].includes(event.key)) {
        onClose?.()
      }
    }

    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [onClose])

  useEffect(() => {
    if (show) {
      focusTargetRef.current?.focus()
    }
  }, [show])

  const handleClickMask = () => {
    if (maskClosable) {
      onClose?.()
    }
  }

  const header = useMemo(() => {
    if (customHeader) {
      return customHeader
    }

    return (
      <div className={styles.header}>
        <strong>{title}</strong>
        {closable && (
          <Button onClick={onClose} ghost noSpace>
            <img src={closeIcon} />
          </Button>
        )}
      </div>
    )
  }, [customHeader, title, closable, onClose])

  const footer = useMemo(() => {
    if (customFooter) {
      return customFooter
    }

    return (
      <div className={styles.footer}>
        <Button onClick={onClose}>{cancelText}</Button>
        <Button onClick={onOk} theme='primary'>
          {okText}
        </Button>
      </div>
    )
  }, [okText, cancelText, onClose])

  return (
    <Portal>
      <CSSTransition
        in={show}
        timeout={300}
        classNames={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          exitActive: styles.exitActive,
          exit: styles.exit
        }}
        unmountOnExit
        nodeRef={transitionRef}
      >
        <div className={styles.wrapper} ref={transitionRef} style={{ zIndex }}>
          <div className={styles.overlay} onClick={handleClickMask} />
          <div
            role='dialog'
            aria-modal
            className={styles.modal}
            style={{ width }}
          >
            <div tabIndex={-1} ref={focusTargetRef} />
            {header}
            <div className={styles.body}>{children}</div>
            {footer}
          </div>
        </div>
      </CSSTransition>
    </Portal>
  )
}
Modal.displayName = 'Modal'
