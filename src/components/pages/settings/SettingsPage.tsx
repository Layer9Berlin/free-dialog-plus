import {PageLayout} from "../../layouts/PageLayout"
import {LanguageSwitch} from "../../../../../dialog-plus/dialog_plus/components/menu/LanguageSwitch"
import {SettingsHeader} from "./partials/SettingsHeader"

export const SettingsPage = () => {
  return <PageLayout header={<SettingsHeader />} body={<LanguageSwitch />} />
}
