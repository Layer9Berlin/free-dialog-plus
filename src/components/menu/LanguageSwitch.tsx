import {useModal} from "../../hooks/Modal"
import {ChevronDownIcon} from "../icons/BootstrapIcons"
import {LanguageSwitchModal} from "../modals/LanguageSwitchModal"
import {CurrentLanguageFlag} from "./CurrentLanguageFlag"

export const LanguageSwitch = () => {
  const {show: showLanguageSwitchModal, props: languageSwitchModalProps} = useModal({})

  return (
    <>
      <LanguageSwitchModal {...languageSwitchModalProps} />
      <div className="d-flex m-3 p-2 align-self-center">
        <button onClick={showLanguageSwitchModal} className={`btn btn-outline-default d-flex align-items-center h-48`}>
          <CurrentLanguageFlag />
          <ChevronDownIcon className="ps-3 fs-4" />
        </button>
      </div>
    </>
  )
}
