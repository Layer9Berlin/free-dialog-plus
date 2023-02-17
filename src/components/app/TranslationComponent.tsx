import {i18n} from "@lingui/core"
import {I18nProvider} from "@lingui/react"
import {ReactNode, useEffect} from "react"
import {detectedLocale, dynamicActivate} from "../../locales/i18n"
import {messages} from "../../locales/en/messages"

i18n.load("en", messages)
i18n.activate("en")

export const TranslationComponent = ({children}: {children?: ReactNode}) => {
  // useEffect(() => {
  //   dynamicActivate(detectedLocale).then(() => {})
  // }, [])
  return <I18nProvider i18n={i18n}>{children}</I18nProvider>
}
