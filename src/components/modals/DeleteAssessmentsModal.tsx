import {Trans} from "@lingui/macro"
import React from "react"
import {Button, Modal} from "react-bootstrap"

export const DeleteAssessmentsModal = ({
  show,
  close,
  confirm,
}: {
  show: boolean
  close: () => void
  confirm: () => void
}) => (
  <Modal show={show} onHide={close}>
    <Modal.Header closeButton>
      <Modal.Title>Delete assessment?</Modal.Title>
    </Modal.Header>
    <Modal.Body>Do you really want to delete this assessment? This cannot be undone.</Modal.Body>
    <Modal.Footer>
      <Button variant="outline-primary" onClick={close}>
        <Trans>Cancel</Trans>
      </Button>
      <Button variant="danger" onClick={confirm}>
        <Trans>Delete</Trans>
      </Button>
    </Modal.Footer>
  </Modal>
)
