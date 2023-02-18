import {PageLayout} from "../../layouts/PageLayout"
import {LanguageSwitch} from "../../menu/LanguageSwitch"
import {SettingsHeader} from "./partials/SettingsHeader"

export const SettingsPage = () => {
  return <PageLayout header={<SettingsHeader />} body={<LanguageSwitch />} />
}
