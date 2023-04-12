import {useState} from "react"
import {AppContextType} from "../contexts/AppContext"

export const useAppContext = (): AppContextType => {
  const [languageLoaded, setLanguageLoaded] = useState(false)
  const [userWelcomed, setUserWelcomed] = useState(false)
  return {
    languageLoaded,
    setLanguageLoaded,
    userWelcomed,
    setUserWelcomed,
  }
}
