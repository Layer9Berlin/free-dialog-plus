import bcrypt from "bcryptjs-react"
import {createContext, ReactNode, useCallback, useEffect, useState} from "react"
import {useLocation} from "react-router-dom"
import {localStoragePasswordHashKey} from "../../constants"
import {useRerouter} from "../../hooks/Rerouter"

export const LoginComponent = ({children}: {children?: ReactNode}) => {
  const reroute = useRerouter()
  const location = useLocation()
  const [finalRedirectRoute, setFinalRedirectRoute] = useState<string | undefined>(undefined)
  const [haveLoadedHash, setHaveLoadedHash] = useState<boolean>(false)
  const [haveRedirected, setHaveRedirected] = useState<boolean>(false)

  const [password, setPassword] = useState<string | undefined>(undefined)
  const [passwordHash, setPasswordHash] = useState<string | undefined>(undefined)
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  // on first page load only,
  // redirect to login screen if saved data is present,
  // the welcome screen otherwise
  useEffect(() => {
    if (haveLoadedHash) {
      return
    }
    const loadedHash = localStorage.getItem(localStoragePasswordHashKey)
    setHaveLoadedHash(true)
    const startedOnLoginOrWelcomeRoute = [`/login`, `/welcome`].includes(location.pathname)

    if (startedOnLoginOrWelcomeRoute) {
      setFinalRedirectRoute("/")
    } else {
      setFinalRedirectRoute(location.pathname)
    }
    if (loadedHash) {
      setPasswordHash(loadedHash)
      reroute.to({page: `/login`})
    } else {
      reroute.to({page: `/welcome`})
    }
  }, [haveLoadedHash, location.pathname, location.search, reroute])

  // after login, redirect back to orgiinal page
  useEffect(() => {
    if (loggedIn && finalRedirectRoute && !haveRedirected) {
      reroute.to({page: finalRedirectRoute, replace: true})
      setHaveRedirected(true)
    }
  }, [finalRedirectRoute, haveRedirected, loggedIn, reroute])

  const logIn = useCallback(
    (passwordCandidate: string) => {
      if (!passwordHash) {
        return false
      }
      const result = bcrypt.compareSync(passwordCandidate, passwordHash)
      if (result) {
        setPassword(passwordCandidate)
        setLoggedIn(true)
      }
      return result
    },
    [passwordHash],
  )

  const savePassword = (password: string) => {
    const passwordHash = bcrypt.hashSync(password, 10)
    localStorage.setItem(localStoragePasswordHashKey, passwordHash)
    reroute.to({page: "/"})
    setPassword(password)
  }

  const logOut = useCallback(() => {
    setPassword(undefined)
    reroute.to({page: "/login"})
  }, [reroute])

  return <LoginContext.Provider value={{password, savePassword, logIn, logOut}}>{children}</LoginContext.Provider>
}

export const LoginContext = createContext<{
  password?: string
  savePassword?: (password: string) => void
  logIn?: (password: string) => boolean
  logOut?: () => void
}>({password: undefined, savePassword: undefined, logIn: undefined, logOut: undefined})
