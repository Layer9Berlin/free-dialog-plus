import {Trans} from "@lingui/macro"
import React from "react"
import {Button, Modal} from "react-bootstrap"
import {Link} from "react-router-dom"
import {CreateAccountIcon, WarningIcon} from "../icons/BootstrapIcons"

export const DataLossWarningModal = ({
  show,
  close,
  confirm,
}: {
  show: boolean
  close: () => void
  confirm: () => void
}) => {
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header>
        <Modal.Title>
          <Trans>Important information</Trans>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>
          You are using Free DIALOG+ in anonymous mode. Your data will stay only on your device and{" "}
          <strong className="text-danger">will be deleted</strong> if you clear your browser cache.
        </span>
      </Modal.Body>
      <Modal.Footer className="p-0 justify-content-between">
        <Link to="/register" className="btn btn-outline-primary m-2 me-0">
          <CreateAccountIcon className="me-2" />
          <Trans>Create account</Trans>
        </Link>
        <Button className="m-2" variant="danger" onClick={confirm}>
          <WarningIcon className="me-2" />
          <Trans>Proceed</Trans>
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
