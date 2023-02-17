import React from "react"
import {LanguageSwitch} from "../../../../../dialog-plus/dialog_plus/components/menu/LanguageSwitch"
import {UseAnonymouslyOption} from "./partials/UseAnonymouslyOption"
import {WelcomeInfoPanel} from "./partials/WelcomeInfoPanel"

export const WelcomePage = () => {
  return (
    <div className="d-flex-center" style={{minHeight: "100vh"}}>
      <div className="d-flex flex-column align-items-stretch w-md-400">
        <LanguageSwitch />
        <WelcomeInfoPanel />
        <UseAnonymouslyOption />
      </div>
    </div>
  )
}
