import {Trans} from "@lingui/macro"
import React, {useEffect, useMemo, useRef} from "react"
import {Modal} from "react-bootstrap"
import {v4 as uuid} from "uuid"
import {Client} from "../../types/Client"
import {TextInput} from "../form/TextInput"
import {AddClientIcon, DoneIcon, EditIcon} from "../icons/BootstrapIcons"

const ModalTitle = ({isEditing}: {isEditing: boolean}) => {
  if (isEditing) {
    return (
      <>
        <span className="me-2">
          <EditIcon />
        </span>
        <Trans>Edit client</Trans>
      </>
    )
  }
  return (
    <>
      <span className="me-2">
        <AddClientIcon />
      </span>
      <Trans>New client</Trans>
    </>
  )
}

export const ClientDataModal = ({
  show,
  close,
  confirm,
  exited,
  initialData,
}: {
  show: boolean
  close: () => void
  confirm: (clientData: Client) => void
  exited: () => void
  initialData?: Client
}) => {
  const firstNameRef = useRef<HTMLInputElement>(null)
  const middleNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (firstNameRef.current) {
      firstNameRef.current.value = initialData?.first ?? ""
    }
    if (middleNameRef.current) {
      middleNameRef.current.value = initialData?.middle ?? ""
    }
    if (lastNameRef.current) {
      lastNameRef.current.value = initialData?.last ?? ""
    }
  }, [initialData])

  const isEditing = useMemo(() => !!initialData, [initialData])

  const onConfirm = () =>
    confirm({
      id: initialData?.id ?? uuid(),
      first: firstNameRef.current?.value,
      middle: middleNameRef.current?.value,
      last: lastNameRef.current?.value,
    })

  return (
    <Modal show={show} onHide={close} onExited={exited} onShow={() => firstNameRef.current?.focus()}>
      <Modal.Header closeButton className="pe-4">
        <Modal.Title>
          <ModalTitle isEditing={isEditing} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0 m-0">
        <TextInput id="firstNameInput" label={`First name`} onEnter={middleNameRef.current?.focus} ref={firstNameRef} />
        <TextInput
          id="middleNameInput"
          label={`Middle name`}
          onEnter={lastNameRef.current?.focus}
          ref={middleNameRef}
        />
        <TextInput id="lastNameInput" label={`Last name`} onEnter={onConfirm} ref={lastNameRef} />
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={onConfirm}>
          <DoneIcon className="me-2" />
          {isEditing ? <Trans>Edit</Trans> : <Trans>Create</Trans>}
        </button>
      </Modal.Footer>
    </Modal>
  )
}
