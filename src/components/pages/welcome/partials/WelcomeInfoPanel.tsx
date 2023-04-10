import {Trans} from "@lingui/macro"
import {useEffect, useState} from "react"
import {Card} from "react-bootstrap"
import {isMobile} from "react-device-detect"
import {Link} from "react-router-dom"
import {useModal} from "../../../../hooks/Modal"
import {DataInfoPanel} from "../../../menu/DataInfoPanel"
import {AddToHomeScreenInfoModal} from "../../../modals/AddToHomescreenInfoModal"

export const WelcomeInfoPanel = () => {
  const [showAddToHomeScreenInfo, setShowAddToHomeScreenInfo] = useState(false)
  // don't show this panel if the app is already on the home screen
  useEffect(() => {
    if (isMobile && !window.matchMedia("(display-mode: standalone)").matches) {
      setShowAddToHomeScreenInfo(true)
    }
  }, [])
  const addToHomeScreenInfo = useModal({})
  return (
    <>
      <AddToHomeScreenInfoModal {...addToHomeScreenInfo.props} />
      <Card>
        <Card.Header className="bg-light">
          <h3 className="text-primary fw-bold text-center m-0">
            <Trans>Welcome to Free DIALOG+</Trans>
          </h3>
        </Card.Header>
        <Card.Body className="d-flex align-items-center p-4">
          <DataInfoPanel />
        </Card.Body>
        <Card.Footer className="bg-white">
          <div className="d-flex w-100 justify-content-center align-items-center">
            {showAddToHomeScreenInfo && (
              <>
                <button
                  className="btn btn-outline-primary flex-grow-1 flex-basis-0"
                  onClick={() => addToHomeScreenInfo.show()}
                >
                  <Trans>Install on Home Screen</Trans>
                </button>
                <span className="mx-3">or</span>
              </>
            )}
            <Link className="btn btn-primary flex-grow-1 flex-basis-0" to="/">
              <Trans>Use in browser</Trans>
            </Link>
          </div>
        </Card.Footer>
      </Card>
    </>
  )
}
