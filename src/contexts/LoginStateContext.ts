import {createContext} from "react"

export const defaultLoginContextState = {
  current: {
    loggedIn: false,
    anonymous: false,
  },
  logIn: () => {},
  logOut: () => {},
  register: () => {},
  startAnonymousSession: () => {},
}

export type LoginState = {
  loggedIn: boolean
  anonymous: boolean
}

export type LoginStateContextType = {
  loginState?: LoginState
  logIn: () => void
  logOut: () => void
  register: () => void
  startAnonymousSession: () => void
}

export const LoginStateContext = createContext<LoginStateContextType>(defaultLoginContextState)
