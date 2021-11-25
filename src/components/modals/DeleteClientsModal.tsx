import {plural, Trans} from "@lingui/macro"
import React from "react"
import {Button, Modal} from "react-bootstrap"
import {NoSelectionModal} from "./NoSelectionModal"

export const DeleteClientsModal = ({
  show,
  close,
  confirm,
  count,
}: {
  show: boolean
  close: () => void
  confirm: () => void
  count: number
}) => {
  if (!count) {
    return <NoSelectionModal show={show} close={close} message="Please select a client to delete." />
  }
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>
          {plural(count, {
            one: "Delete selected client?",
            other: "Delete {selectionCount} clients?",
          })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {plural(count, {
          one: "Do you really want to delete the selected client and all associated assessments? This cannot be undone.",
          other:
            "Do you really want to delete the selected clients and all associated assessments? This cannot be undone.",
        })}
      </Modal.Body>
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
}
