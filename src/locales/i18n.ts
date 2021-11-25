import {i18n} from "@lingui/core"
import {detect, fromNavigator, fromStorage, fromUrl} from "@lingui/detect-locale"
import {de, en} from "make-plural/plurals"

/**
 * Add new locale and plurals data here
 */
export const locales = {
  en: "English",
  de: "Deutsch",
}
i18n.loadLocaleData({
  en: {plurals: en},
  de: {plurals: de},
})

export const localeForCountryCodedLanguage = (lang: string): string => {
  if (lang.includes("-")) {
    lang = lang.split("-")[0]
  } else if (lang.includes("_")) {
    lang = lang.split("_")[0]
  }
  return lang
}

export const detectLocale = () => detect(fromUrl("lang"), fromStorage("lang"), fromNavigator())
export const detectedLocale = detectLocale() || "en"

/**
 * We do a dynamic import of just the catalog that we need
 * @param locale any locale string
 */
export async function dynamicActivate(locale: string) {
  // check if we support the (possibly country coded) language
  const localeKeys = Object.keys(locales)
  if (!localeKeys.includes(locale)) {
    const countryCodedLocale = localeForCountryCodedLanguage(locale)
    if (!localeKeys.includes(countryCodedLocale)) {
      locale = "en"
    } else {
      locale = countryCodedLocale
    }
  }
  const {messages} = await import(`@lingui/loader!./${locale}/messages.po`)
  i18n.load(locale, messages)
  i18n.activate(locale)
}
