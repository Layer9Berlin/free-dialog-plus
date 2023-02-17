import {useMemo} from "react"
import {detectLocale, localeForCountryCodedLanguage} from "../../locales/i18n"
import {BritishFlag} from "../icons/flags/BritishFlag"
import {FrenchFlag} from "../icons/flags/FrenchFlag"
import {GermanFlag} from "../icons/flags/GermanFlag"
import {ItalianFlag} from "../icons/flags/ItalianFlag"
import {SpanishFlag} from "../icons/flags/SpanishFlag"

export const CurrentLanguageFlag = () => {
  const locale = useMemo(() => localeForCountryCodedLanguage(detectLocale() ?? "en"), [])
  switch (locale) {
    case "de":
      return <GermanFlag />
    case "en":
      return <BritishFlag />
    case "es":
      return <SpanishFlag />
    case "fr":
      return <FrenchFlag />
    case "it":
      return <ItalianFlag />
    default:
      return <></>
  }
}
