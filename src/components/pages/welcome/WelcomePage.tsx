import {LanguageSwitch} from "../../menu/LanguageSwitch"
import {WelcomeInfoPanel} from "./partials/WelcomeInfoPanel"

export const WelcomePage = () => {
  return (
    <div className="d-flex-center" style={{minHeight: "100vh"}}>
      <div className="d-flex flex-column align-items-stretch w-md-400">
        <LanguageSwitch dropdownStyle={true} />
        <WelcomeInfoPanel />
      </div>
    </div>
  )
}
