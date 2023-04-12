import {createContext} from "react"

export type AppContextType = {
  languageLoaded: boolean
  setLanguageLoaded: (value: boolean) => void
  userWelcomed: boolean
  setUserWelcomed: (value: boolean) => void
}

export const AppContext = createContext<AppContextType>({
  languageLoaded: false,
  setLanguageLoaded: () => {},
  userWelcomed: false,
  setUserWelcomed: () => {},
})
