import { FC, useCallback, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

export const usePortal = () => {
  const initRef = useRef(false)
  const containerRef = useRef<HTMLElement>()
  const parentRef = useRef<ParentNode>()

  if (!initRef.current) {
    containerRef.current = document.body.appendChild(
      document.createElement('div')
    )
    // @ts-ignore
    parentRef.current = containerRef.current.parentNode
    initRef.current = true
  }

  useEffect(() => {
    if (
      containerRef.current?.parentNode === null &&
      parentRef.current !== null
    ) {
      // @ts-ignore
      parentRef.current.appendChild(containerRef.current)
    }
    return () => {
      containerRef.current?.parentNode?.removeChild(containerRef.current)
    }
  }, [])

  const Portal: FC = useCallback(({ children }) => {
    if (!containerRef.current) {
      return null
    }

    return ReactDOM.createPortal(children, containerRef.current)
  }, [])
  return { Portal, containerRef }
}
