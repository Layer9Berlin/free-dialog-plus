import {useState} from "react"
import {Card} from "react-bootstrap"
import {useRerouter} from "../../hooks/Rerouter"
import {detectLocale, dynamicActivate, localeForCountryCodedLanguage} from "../../locales/i18n"
import {BritishFlag} from "../icons/flags/BritishFlag"
import {GermanFlag} from "../icons/flags/GermanFlag"

export const LanguageSwitch = () => {
  const reroute = useRerouter()
  const getLocale = () => localeForCountryCodedLanguage(detectLocale() ?? "en")
  const [locale, setLocale] = useState(getLocale())
  return (
    <Card className="m-3 align-self-center">
      <Card.Body className="p-2">
        <div className="d-flex">
          <button
            className={`btn h-48 p-1${locale === "en" ? "" : " opacity-25"}`}
            onClick={() => {
              dynamicActivate("en")
              reroute.to({params: {lang: "en"}, replace: true})
              setLocale("en")
            }}
          >
            <BritishFlag />
          </button>
          <button
            className={`btn h-48 p-1${locale === "de" ? "" : " opacity-25"}`}
            onClick={() => {
              dynamicActivate("de")
              reroute.to({params: {lang: "de"}, replace: true})
              setLocale("de")
            }}
          >
            <GermanFlag />
          </button>
        </div>
      </Card.Body>
    </Card>
  )
}
