import {Trans} from "@lingui/macro"
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
      <Modal.Title>
        <Trans>Delete assessment?</Trans>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Trans>Do you really want to delete this assessment? This cannot be undone.</Trans>
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
