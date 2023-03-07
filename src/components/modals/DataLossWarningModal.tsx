import {Trans} from "@lingui/macro"
import {Button, Modal} from "react-bootstrap"
import {WarningIcon} from "../icons/BootstrapIcons"

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
          <Trans>Warning: Data Loss Possible</Trans>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Trans>
          You are using the demo version of DIALOG+. Your data will be saved to this device and{" "}
          <strong className="text-danger">will be deleted</strong> if you clear your browser cache. Use the export
          functionality in the bottom left portion of the Clients page to back up your data.
        </Trans>
      </Modal.Body>
      <Modal.Footer className="p-0 justify-content-end">
        {/* <Link to="/register" className="btn btn-outline-primary m-2 me-0">
          <CreateAccountIcon className="me-2" />
          <Trans>Create account</Trans>
        </Link> */}
        <Button className="m-2" variant="danger" onClick={confirm}>
          <WarningIcon className="me-2" />
          <Trans>Proceed</Trans>
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
