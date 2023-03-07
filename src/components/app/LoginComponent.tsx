import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react"
// import {useLocation} from "react-router-dom"
import {DataStoreContext} from "../../contexts/DataStoreContext"
import {useRerouter} from "../../hooks/Rerouter"

export const LoginComponent = ({
  children,
  mayNeedToWelcomeUser,
  setMayNeedToWelcomeUser,
}: {
  children?: ReactNode
  mayNeedToWelcomeUser: boolean
  setMayNeedToWelcomeUser: (value: boolean) => void
}) => {
  const reroute = useRerouter()
  const [password, setPassword] = useState<string | undefined>(undefined)
  const dataStore = useContext(DataStoreContext)

  // redirect to welcome screen
  // unless client data has already been saved
  useEffect(() => {
    const welcomeIfNoClients = async () => {
      if (mayNeedToWelcomeUser) {
        setMayNeedToWelcomeUser(false)
        const fetchedClients = await dataStore.clients.list()
        const alreadyHaveClients = !!fetchedClients.length
        if (!alreadyHaveClients) {
          reroute.to({page: `/welcome`})
        }
      }
    }
    void welcomeIfNoClients()
  }, [dataStore.clients, mayNeedToWelcomeUser, reroute, setMayNeedToWelcomeUser])

  const logOut = useCallback(() => {
    setPassword(undefined)
    reroute.to({page: "/login"})
  }, [reroute])

  return <LoginContext.Provider value={{password, logOut}}>{children}</LoginContext.Provider>
}

export const LoginContext = createContext<{
  password?: string
  savePassword?: (password: string) => void
  logIn?: (password: string) => boolean
  logOut?: () => void
}>({password: undefined, savePassword: undefined, logIn: undefined, logOut: undefined})
