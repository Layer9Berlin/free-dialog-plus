import {Trans} from "@lingui/macro"
import React, {useRef} from "react"
import {Modal} from "react-bootstrap"
import {Client} from "../../types/Client"

export const NewClientModal = ({
  show,
  close,
  confirm,
}: {
  show: boolean
  close: () => void
  confirm: (clientData: Omit<Client, "id">) => void
}) => {
  const firstNameRef = useRef<HTMLInputElement>(null)
  const middleNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Trans>New client</Trans>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="firstNameInput" className="form-label">
            <Trans>First name</Trans>
          </label>
          <input type="text" className="form-control" id="firstNameInput" autoFocus ref={firstNameRef} />
        </div>
        <div className="mb-3">
          <label htmlFor="middleNameInput" className="form-label">
            <Trans>Middle name</Trans>
          </label>
          <input type="text" className="form-control" id="middleNameInput" ref={middleNameRef} />
        </div>
        <div className="mb-3">
          <label htmlFor="lastNameInput" className="form-label">
            <Trans>Last name</Trans>
          </label>
          <input type="text" className="form-control" id="lastNameInput" ref={lastNameRef} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-primary"
          onClick={() =>
            confirm({
              first: firstNameRef.current?.value,
              middle: middleNameRef.current?.value,
              last: lastNameRef.current?.value,
            })
          }
        >
          <Trans>Create</Trans>
        </button>
      </Modal.Footer>
    </Modal>
  )
}
