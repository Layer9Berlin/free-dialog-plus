import {useModal} from "../../hooks/Modal"
import {ResponsiveButton} from "../buttons/ResponsiveButton"
import {ChevronDownIcon} from "../icons/BootstrapIcons"
import {LanguageSwitchModal} from "../modals/LanguageSwitchModal"
import {CurrentLanguageFlag} from "./CurrentLanguageFlag"

export type LanguageSwitchProps = {
  dropdownStyle?: boolean
}

export const LanguageSwitch = ({dropdownStyle}: LanguageSwitchProps) => {
  const {show: showLanguageSwitchModal, props: languageSwitchModalProps} = useModal({})

  return (
    <div>
      <LanguageSwitchModal {...languageSwitchModalProps} />
      <div className="d-flex m-3 p-2 align-self-center">
        {dropdownStyle ? (
          <button
            onClick={showLanguageSwitchModal}
            className={`btn d-flex align-items-center h-48 "btn-outline-default`}
          >
            <CurrentLanguageFlag />
            <ChevronDownIcon className="ps-3 fs-4" />
          </button>
        ) : (
          <ResponsiveButton
            variant="outline-primary"
            onClick={showLanguageSwitchModal}
            className={`d-flex align-items-center h-48`}
            icon="bi bi-translate"
          />
        )}
      </div>
    </div>
  )
}
