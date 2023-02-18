import {Trans} from "@lingui/macro"
import React, {useContext, useRef, useState} from "react"
import {Button, Card, Modal} from "react-bootstrap"
import {LoginStateContext} from "../../../contexts/LoginStateContext"
import {filterEnterKey} from "../../../helpers/KeyboardEvents"
import {useRerouter} from "../../../hooks/Rerouter"
import {LanguageSwitch} from "../../menu/LanguageSwitch"

export const RegisterPage = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordConfirmationRef = useRef<HTMLInputElement>(null)
  const [haveError, setHaveError] = useState(false)
  const reroute = useRerouter()

  const onSubmit = async (logIn?: (password: string) => boolean) => {
    const password = passwordRef.current?.value
    if (!password || !logIn) {
      setHaveError(true)
      return
    }
    const result = await logIn(password)
    if (result) {
      reroute.to({page: `/`})
    } else {
      setHaveError(true)
    }
  }

  const [showMismatchError, setShowMismatchError] = useState(false)
  const handleClose = () => setShowMismatchError(false)

  const {register} = useContext(LoginStateContext)

  return (
    <div className="d-flex-center" style={{minHeight: "100vh"}}>
      <div className="d-flex flex-column align-items-stretch w-md-400">
        <LanguageSwitch />
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
        <Card className="m-3">
          <Card.Header>
            <span className="h4">
              <Trans>Create account</Trans>
            </span>
          </Card.Header>
          <Card.Body className="m-0 p-0">
            <div className="d-flex flex-column">
              <div className="form-floating">
                <input
                  autoComplete="email"
                  autoFocus
                  className={"rounded-0 form-control" + (haveError ? " is-invalid" : "")}
                  id="emailInput"
                  onInput={() => setHaveError(false)}
                  ref={emailRef}
                  type="email"
                  onKeyDown={filterEnterKey(() => {})}
                  placeholder=" "
                />
                <label htmlFor="emailInput" className="form-label">
                  <Trans>E-Mail-Adresse</Trans>
                </label>
              </div>
              <div className="form-floating">
                <input
                  autoComplete="new-password"
                  className={"rounded-0 form-control" + (haveError ? " is-invalid" : "")}
                  id="passwordInput"
                  onInput={() => setHaveError(false)}
                  ref={passwordRef}
                  type="password"
                  onKeyDown={filterEnterKey(() => {})}
                  placeholder=" "
                />
                <label htmlFor="passwordInput" className="form-label">
                  <Trans>Password</Trans>
                </label>
              </div>
              <div className="form-floating">
                <input
                  autoComplete="new-password"
                  className={"rounded-0 form-control" + (haveError ? " is-invalid" : "")}
                  id="passwordInput"
                  onInput={() => setHaveError(false)}
                  ref={passwordConfirmationRef}
                  type="password"
                  onKeyDown={filterEnterKey(() => {})}
                  placeholder=" "
                />
                <label htmlFor="passwordInput" className="form-label">
                  <Trans>Password confirmation</Trans>
                </label>
                <div className="small text-danger my-1 mx-2">
                  {haveError ? (
                    <span>
                      <Trans>Invalid password</Trans>
                    </span>
                  ) : (
                    <span>&nbsp;</span>
                  )}
                </div>
              </div>
              <div className="d-flex m-3 align-items-center">
                <button
                  className={"ms-auto btn" + (haveError ? " btn-outline-danger disabled" : " btn-outline-primary")}
                  onClick={register}
                >
                  <Trans>Create</Trans>
                </button>
              </div>
            </div>
          </Card.Body>
        </Card>
        <a className="btn link-muted align-self-start mx-1" href="/">
          <i className="bi bi-arrow-left me-2" />
          <Trans>other options</Trans>
        </a>
      </div>
    </div>
  )
}
