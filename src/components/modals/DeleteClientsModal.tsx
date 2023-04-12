import {Trans} from "@lingui/macro"
import {Button, Modal} from "react-bootstrap"

export const DeleteClientsModal = ({show, close, confirm}: {show: boolean; close: () => void; confirm: () => void}) => {
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Trans>Delete this client?</Trans>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Trans>
          Do you really want to delete the selected client and all associated assessments? This cannot be undone.
        </Trans>
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
