import {Trans} from "@lingui/macro"
import React, {useRef, useState} from "react"
import {Card} from "react-bootstrap"
import {filterEnterKey} from "../../../helpers/KeyboardEvents"
import {useRerouter} from "../../../hooks/Rerouter"
import {LoginContext} from "../../app/LoginComponent"
import {AddToHomescreenInfoPanel} from "../../menu/AddToHomescreenInfoPanel"
import {LanguageSwitch} from "../../menu/LanguageSwitch"

export const LoginPage = () => {
  const passwordRef = useRef<HTMLInputElement>(null)
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

  return (
    <LoginContext.Consumer>
      {({logIn}) => (
        <div className="d-flex-center" style={{minHeight: "100vh"}}>
          <div className="d-flex flex-column align-items-stretch w-md-400">
            <LanguageSwitch />
            <Card className="m-3">
              <Card.Header>
                <span className="h4">
                  <Trans>Login</Trans>
                </span>
              </Card.Header>
              <Card.Body>
                <div className="d-flex flex-column">
                  <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">
                      <Trans>Password</Trans>
                    </label>
                    <input
                      autoComplete="password"
                      autoFocus
                      className={"form-control" + (haveError ? " is-invalid" : "")}
                      id="passwordInput"
                      onInput={() => setHaveError(false)}
                      ref={passwordRef}
                      type="password"
                      onKeyDown={filterEnterKey(() => onSubmit(logIn))}
                    />
                    <div className="small text-danger">
                      {haveError ? (
                        <span>
                          <Trans>Invalid password</Trans>
                        </span>
                      ) : (
                        <span>&nbsp;</span>
                      )}
                    </div>
                  </div>
                  <div className="d-flex">
                    <button
                      className={"ms-auto btn" + (haveError ? " btn-outline-danger disabled" : " btn-outline-primary")}
                      onClick={() => onSubmit(logIn)}
                    >
                      <Trans>Log in</Trans>
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
