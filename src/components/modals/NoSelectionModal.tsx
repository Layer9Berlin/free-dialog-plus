import {Trans} from "@lingui/macro"
import {Button, Modal} from "react-bootstrap"

export const NoSelectionModal = ({
  show,
  close,
  message,
}: {
  show: boolean
  close: () => void
  message: string
}): JSX.Element => {
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Trans>No selection made</Trans>
        </Modal.Title>
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
