import {ReactNode, useState} from "react"
import {defaultLoginContextState, LoginState, LoginStateContext} from "../../contexts/LoginStateContext"
import {useRerouter} from "../../hooks/Rerouter"

export const LoginComponent = ({children}: {children: ReactNode | ReactNode[]}) => {
  const [loginState, setLoginState] = useState<LoginState>(defaultLoginContextState.current)
  const reroute = useRerouter()

  const logOut = () => {
    setLoginState({loggedIn: false, anonymous: false})
    reroute.to({page: "/login"})
  }
  const logIn = () => {
    setLoginState({loggedIn: true, anonymous: false})
    reroute.to({page: "/clients"})
  }
  const register = () => {
    setLoginState({loggedIn: true, anonymous: false})
    reroute.to({page: "/clients"})
  }
  const startAnonymousSession = () => {
    setLoginState({loggedIn: false, anonymous: true})
    reroute.to({page: "/clients"})
  }
  // const reroute = useRerouter()
  // const {show: showWarningModal, props: dataLossWarningModalProps} = useModal({})
  // const {dataStore, loadState, syncState} = useDataStore()
  //
  // useEffect(() => {
  //   if (loginState) {
  //     if (loginState.loggedIn) {
  //     } else {
  //       if (loginState?.anonymous) {
  //         showWarningModal()
  //       } else {
  //         reroute.to({page: "/"})
  //       }
  //     }
  //   }
  // }, [loadState, loginState, reroute, showWarningModal])
  return (
    <>
      {/*<DataLossWarningModal {...dataLossWarningModalProps}></DataLossWarningModal>*/}
      <LoginStateContext.Provider value={{loginState, logIn, logOut, register, startAnonymousSession}}>
        {children}
      </LoginStateContext.Provider>
    </>
  )
}
