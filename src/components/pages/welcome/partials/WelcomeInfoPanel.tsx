import {Trans} from "@lingui/macro"
import {Card} from "react-bootstrap"
import {Link} from "react-router-dom"
import {DataInfoPanel} from "../../../menu/DataInfoPanel"

export const WelcomeInfoPanel = () => {
  return (
    <Card>
      <Card.Header className="bg-light">
        <h3 className="text-primary fw-bold text-center">
          <Trans>Welcome to Free DIALOG+</Trans>
        </h3>
      </Card.Header>
      <Card.Body className="d-flex align-items-center">
        <DataInfoPanel />
      </Card.Body>
      <Card.Footer className="bg-white">
        <div className="d-flex w-100 justify-content-center align-items-center">
          <a className="btn btn-outline-primary flex-grow-1 flex-basis-0" href="/login">
            Install App on iOS
          </a>
          <span className="mx-3">or</span>
          <Link className="btn btn-primary flex-grow-1 flex-basis-0" to="/">
            Use in browser
          </Link>
        </div>
      </Card.Footer>
    </Card>
  )
}
