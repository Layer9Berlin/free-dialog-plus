import {Trans} from "@lingui/macro"
import React from "react"
import {Button, Modal} from "react-bootstrap"

export const ImportFeedbackModal = ({
  show,
  close,
  title,
  message,
}: {
  show: boolean
  close: () => void
  title: string
  message: string
}): JSX.Element => {
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            close()
          }}
        >
          <Trans>OK</Trans>
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
