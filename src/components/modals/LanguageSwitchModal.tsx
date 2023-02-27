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

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Trans>Choose a language</Trans>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overflow-hidden p-0">
        <ListGroup className="rounded-0" style={{margin: -1}}>
          <ListGroup.Item
            action
            variant="light"
            className="d-flex align-items-center h-48"
            onClick={() => {
              dynamicActivate("da")
              reroute.to({params: {lang: "da"}, replace: true})
              setLocale("da")
            }}
          >
            <div className="me-3" style={{width: "60px", height: "30px"}}>
              <DanishFlag />
            </div>
            <div>Dansk</div>
          </ListGroup.Item>
          <ListGroup.Item
            action
            variant="light"
            className="d-flex align-items-center h-48"
            onClick={() => {
              dynamicActivate("de")
              reroute.to({params: {lang: "de"}, replace: true})
              setLocale("de")
            }}
          >
            <div className="me-3" style={{width: "60px", height: "30px"}}>
              <GermanFlag />
            </div>
            <div style={{width: "75px"}}>Deutsch</div>
          </ListGroup.Item>
          <ListGroup.Item
            action
            variant="light"
            className="d-flex align-items-center h-48"
            onClick={() => {
              dynamicActivate("en")
              reroute.to({params: {lang: "en"}, replace: true})
              setLocale("en")
            }}
          >
            <div className="me-3" style={{width: "60px", height: "30px"}}>
              <BritishFlag />
            </div>
            <div style={{width: "75px"}}>English</div>
          </ListGroup.Item>
          <ListGroup.Item
            action
            variant="light"
            className="d-flex align-items-center h-48"
            onClick={() => {
              dynamicActivate("es")
              reroute.to({params: {lang: "es"}, replace: true})
              setLocale("es")
            }}
          >
            <div className="me-3" style={{width: "60px", height: "30px"}}>
              <SpanishFlag />
            </div>
            <div style={{width: "75px"}}>Español</div>
          </ListGroup.Item>
          <ListGroup.Item
            action
            variant="light"
            className="d-flex align-items-center h-48"
            onClick={() => {
              dynamicActivate("fr")
              reroute.to({params: {lang: "fr"}, replace: true})
              setLocale("fr")
            }}
          >
            <div className="me-3" style={{width: "60px", height: "30px"}}>
              <FrenchFlag />
            </div>
            <div style={{width: "75px"}}>Français</div>
          </ListGroup.Item>
          <ListGroup.Item
            action
            variant="light"
            className="d-flex align-items-center h-48"
            onClick={() => {
              dynamicActivate("it")
              reroute.to({params: {lang: "it"}, replace: true})
              setLocale("it")
            }}
          >
            <div className="me-3" style={{width: "60px", height: "30px"}}>
              <ItalianFlag />
            </div>
            <div style={{width: "75px"}}>Italiano</div>
          </ListGroup.Item>
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
