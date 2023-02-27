import {i18n} from "@lingui/core"
import {I18nProvider} from "@lingui/react"
import {ReactNode, useEffect} from "react"
import {messages as daMessages} from "../../locales/da/messages"
import {messages as deMessages} from "../../locales/de/messages"
import {messages as enMessages} from "../../locales/en/messages"
import {messages as esMessages} from "../../locales/es/messages"
import {messages as frMessages} from "../../locales/fr/messages"
import {detectedLocale, dynamicActivate} from "../../locales/i18n"
import {messages as itMessages} from "../../locales/it/messages"

i18n.load({
  en: enMessages,
  de: deMessages,
  da: daMessages,
  es: esMessages,
  fr: frMessages,
  it: itMessages,
})
i18n.activate("en")

export const TranslationComponent = ({children}: {children?: ReactNode}) => {
  useEffect(() => {
    void dynamicActivate(detectedLocale)
  }, [])
  return <I18nProvider i18n={i18n}>{children}</I18nProvider>
}
