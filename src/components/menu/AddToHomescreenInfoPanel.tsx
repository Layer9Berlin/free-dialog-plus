import {Trans} from "@lingui/macro"
import {useEffect, useState} from "react"

export const AddToHomescreenInfoPanel = () => {
  const [show, setShow] = useState(true)
  // don't show this panel if the app is already on the home screen
  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setShow(false)
    }
  }, [])

  if (!show) {
    return (
      <div className="m-3 alert alert-success align-self-stretch">
        <div className="d-flex align-items-center mb-2">
          <span>
            <i className="bi bi-check-circle-fill fs-3" />
          </span>
          <h4 className="m-2">
            <Trans>Installed</Trans>
          </h4>
        </div>
        <p>
          <Trans>You have successfully installed the app.</Trans>
        </p>
      </div>
    )
  }

  return (
    <div className="m-3 alert alert-info align-self-stretch">
      <div className="d-flex align-items-center mb-2">
        <span>
          <i className="bi bi-info-circle fs-3" />
        </span>
        <h4 className="m-2">
          <Trans>Tip</Trans>
        </h4>
      </div>
      <p>
        <Trans>Install this app on your {<span className="fw-bold">Home Screen</span>} for a better experience.</Trans>
      </p>
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
    </div>
  )
}
