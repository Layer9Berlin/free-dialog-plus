import {Trans} from "@lingui/macro"
import {useState} from "react"
import {Button, Modal} from "react-bootstrap"
import ListGroup from "react-bootstrap/ListGroup"
import {useRerouter} from "../../hooks/Rerouter"
import {detectLocale, dynamicActivate, localeForCountryCodedLanguage} from "../../locales/i18n"
import {BritishFlag} from "../icons/flags/BritishFlag"
import {DanishFlag} from "../icons/flags/DanishFlag"
import {FrenchFlag} from "../icons/flags/FrenchFlag"
import {GermanFlag} from "../icons/flags/GermanFlag"
import {ItalianFlag} from "../icons/flags/ItalianFlag"
import {SpanishFlag} from "../icons/flags/SpanishFlag"

export const LanguageSwitchModal = ({
  show,
  close,
  confirm,
}: {
  show: boolean
  close: () => void
  confirm: () => void
}) => {
  const reroute = useRerouter()
  const getLocale = () => localeForCountryCodedLanguage(detectLocale() ?? "en")
  const [locale, setLocale] = useState(getLocale())

  const localeParams = [
    {
      localeCode: "da",
      language: "Dansk",
      flag: <DanishFlag />,
    },
    {
      localeCode: "de",
      language: "Deutsch",
      flag: <GermanFlag />,
    },
    {
      localeCode: "en",
      language: "English",
      flag: <BritishFlag />,
    },
    {
      localeCode: "es",
      language: "Español",
      flag: <SpanishFlag />,
    },
    {
      localeCode: "fr",
      language: "Français",
      flag: <FrenchFlag />,
    },
    {
      localeCode: "it",
      language: "Italiano",
      flag: <ItalianFlag />,
    },
  ]

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Trans>Choose a language</Trans>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overflow-hidden p-0">
        <ListGroup className="rounded-0" style={{margin: -1}}>
          {localeParams.map((locale) => {
            return (
              <ListGroup.Item
                action
                key={locale.localeCode}
                variant="light"
                className="d-flex align-items-center h-48"
                onClick={() => {
                  dynamicActivate(locale.localeCode)
                  reroute.to({params: {lang: locale.localeCode}, replace: true})
                  setLocale(locale.localeCode)
                }}
              >
                <div className="me-3" style={{width: "60px", height: "30px"}}>
                  {locale.flag}
                </div>
                <div>{locale.language}</div>
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={close}>
          <Trans>Cancel</Trans>
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
