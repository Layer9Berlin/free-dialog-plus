import {Trans} from "@lingui/macro"
import React from "react"
import {Button, Modal} from "react-bootstrap"

export const DeleteClientsModal = ({show, close, confirm}: {show: boolean; close: () => void; confirm: () => void}) => {
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Delete this client?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Do you really want to delete the selected client and all associated assessments? This cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={close}>
          <Trans>Cancel</Trans>
        </Button>
        <Button variant="danger" onClick={() => confirm()}>
          <Trans>Delete</Trans>
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
