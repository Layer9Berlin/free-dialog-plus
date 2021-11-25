import {t, Trans} from "@lingui/macro"
import React, {useRef, useState} from "react"
import {Modal} from "react-bootstrap"

export type ExportPasswordModalProps = {
  show: boolean
  close: () => void
  message: string
  confirm?: (password?: string) => void
}

export type UseExportPasswordModalProps = {
  props: ExportPasswordModalProps
  requestPasswordForExport: (callback: (password?: string) => void) => void
  requestPasswordForImport: (callback: (password?: string) => void) => void
}

export const useExportPasswordModal = (): UseExportPasswordModalProps => {
  const [props, setProps] = useState<{show: boolean; message: string; confirm: (password?: string) => void}>({
    show: false,
    message: "",
    confirm: () => {},
  })

  return {
    props: {
      ...props,
      close: () => setProps((props) => ({...props, show: false})),
      confirm: (password) => {
        setProps((props) => ({...props, show: false}))
        props.confirm(password)
      },
    },
    requestPasswordForExport: (callback: (password?: string) => void) =>
      setProps({
        show: true,
        message: t`Enter a password to protect the exported file`,
        confirm: callback,
      }),
    requestPasswordForImport: (callback: (password?: string) => void) =>
      setProps({
        show: true,
        message: t`Please enter the password used to protect the file`,
        confirm: callback,
      }),
  }
}

export const ExportPasswordModal = ({show, close, message, confirm}: ExportPasswordModalProps) => {
  const passwordRef = useRef<HTMLInputElement>(null)

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Trans>New client</Trans>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="firstNameInput" className="form-label">
            {message}
          </label>
          <input className="form-control" id="firstNameInput" autoFocus ref={passwordRef} type="password" />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={() => confirm?.(passwordRef.current?.value)}>
          <Trans>OK</Trans>
        </button>
      </Modal.Footer>
    </Modal>
  )
}
