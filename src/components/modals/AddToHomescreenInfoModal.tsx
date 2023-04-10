import {Trans} from "@lingui/macro"
import {Button, Modal} from "react-bootstrap"

export const AddToHomeScreenInfoModal = ({show, close}: {show: boolean; close: () => void}) => {
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header>
        <Modal.Title>
          <Trans>Install on Home Screen</Trans>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center mb-2"></div>
          <h5>
            <Trans>
              Install this app on your {<span className="fw-bold">Home Screen</span>} for a better experience.
            </Trans>
          </h5>
          <p>
            <Trans>
              For example, on iOS, tap
              {
                <span className="px-1">
                  <i className="bi bi-box-arrow-up" />
                </span>
              }
              in the bottom menu, followed by "Add to Home Screen
              {
                <span className="px-1">
                  <i className="bi bi-plus-square" />
                </span>
              }
              ".
            </Trans>
          </p>
          <Button className="m-2 align-self-end" variant="outline-primary" onClick={close}>
            <Trans>OK</Trans>
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}
