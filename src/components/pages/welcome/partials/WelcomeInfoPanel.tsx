import {Trans} from "@lingui/macro"
import {Card} from "react-bootstrap"

export const WelcomeInfoPanel = () => {
  return (
    <Card>
      <Card.Header className="bg-light">
        <h3 className="text-primary fw-bold text-center">
          <Trans>Free DIALOG+</Trans>
        </h3>
      </Card.Header>
      <Card.Body className="h-120 d-flex align-items-center">
        <p>
          <Trans>
            This is a free, web-based implementation of the{" "}
            {
              <a href="https://dialog.elft.nhs.uk" className="link-primary">
                DIALOG+ therapeutic intervention
              </a>
            }
            .
          </Trans>
        </p>
      </Card.Body>
      <Card.Footer className="bg-white">
        <div className="d-flex w-100 justify-content-center align-items-center">
          <a className="btn btn-outline-primary flex-grow-1 flex-basis-0" href="/login">
            Log in
          </a>
          <span className="mx-3">or</span>
          <a className="btn btn-primary flex-grow-1 flex-basis-0" href="/register">
            Create account
          </a>
        </div>
      </Card.Footer>
    </Card>
  )
}
