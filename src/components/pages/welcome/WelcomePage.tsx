import {Trans} from "@lingui/macro"
import React, {useRef, useState} from "react"
import {Button, Card, Modal} from "react-bootstrap"
import {filterEnterKey} from "../../../helpers/KeyboardEvents"
import {LoginContext} from "../../app/LoginComponent"
import {AddToHomescreenInfoPanel} from "../../menu/AddToHomescreenInfoPanel"
import {DataInfoPanel} from "../../menu/DataInfoPanel"
import {LanguageSwitch} from "../../menu/LanguageSwitch"

export const WelcomePage = () => {
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordConfirmationRef = useRef<HTMLInputElement>(null)

  const [showMismatchError, setShowMismatchError] = useState(false)
  const handleClose = () => setShowMismatchError(false)

  const onSubmit = async (savePassword: ((password: string) => void) | undefined) => {
    const password = passwordRef.current?.value
    if (!password) {
      return
    }
    const passwordConfirmation = passwordConfirmationRef.current?.value
    if (password !== passwordConfirmation) {
      setShowMismatchError(true)
    } else {
      savePassword?.(password)
    }
  }

  return (
    <LoginContext.Consumer>
      {({savePassword}) => (
        <div className="d-flex-center" style={{minHeight: "100vh"}}>
          <div className="d-flex flex-column align-items-stretch w-md-400">
            <Modal show={showMismatchError} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  <Trans>Password mismatch</Trans>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Trans>Looks like the passwords you entered do not match. Please try again!</Trans>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                  <Trans>Close</Trans>
                </Button>
              </Modal.Footer>
            </Modal>
            <LanguageSwitch />
            <DataInfoPanel />
            <Card className="m-3">
              <Card.Header>
                <span className="h4">
                  <Trans>Please choose a password</Trans>
                </span>
              </Card.Header>
              <Card.Body>
                <div className="d-flex flex-column">
                  <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">
                      <Trans>Password</Trans>
                    </label>
                    <input
                      type="password"
                      autoComplete="new-password"
                      className="form-control"
                      id="passwordInput"
                      autoFocus
                      ref={passwordRef}
                      onKeyDown={filterEnterKey(() => passwordConfirmationRef.current?.focus())}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="passwordConfirmationInput" className="form-label">
                      <Trans>Confirm password</Trans>
                    </label>
                    <input
                      type="password"
                      autoComplete="new-password"
                      className="form-control"
                      id="passwordConfirmationInput"
                      ref={passwordConfirmationRef}
                      onKeyDown={filterEnterKey(() => onSubmit(savePassword))}
                    />
                  </div>
                  <div className="d-flex">
                    <button className="ms-auto btn btn-primary" onClick={() => onSubmit(savePassword)}>
                      <Trans>Save</Trans>
                    </button>
                  </div>
                </div>
              </Card.Body>
            </Card>
            <AddToHomescreenInfoPanel />
          </div>
        </div>
      )}
    </LoginContext.Consumer>
  )
}
