import {useCallback, useState} from "react"

export const useModal = <T>({
  onClose,
  onConfirm,
}: {
  onClose?: () => void
  onConfirm?: (initialData?: T, editedData?: T) => Promise<void>
}) => {
  const [show, setShow] = useState(false)
  const close = useCallback(() => {
    onClose?.()
    setShow(false)
  }, [onClose])
  const [initialData, setInitialData] = useState<T | undefined>()
  const confirm = useCallback(
    (data?: T) => {
      onConfirm?.(initialData, data)
      setShow(false)
    },
    [initialData, onConfirm],
  )
  const exited = () => {
    setInitialData(undefined)
  }
  return {
    props: {
      show,
      close,
      confirm,
      exited,
      initialData,
    },
    show: useCallback((data?: T) => {
      setInitialData(data)
      setShow(true)
    }, []),
    hide: useCallback(() => setShow(false), []),
  }
}
