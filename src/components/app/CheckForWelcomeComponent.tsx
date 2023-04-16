import {ReactNode, useContext, useEffect} from "react"
import {AppContext} from "../../contexts/AppContext"
// import {useLocation} from "react-router-dom"
import {DataStoreContext} from "../../contexts/DataStoreContext"
import {useModal} from "../../hooks/Modal"
import {useRerouter} from "../../hooks/Rerouter"
import {DataLossWarningModal} from "../modals/DataLossWarningModal"

export const CheckForWelcomeComponent = ({children}: {children?: ReactNode}) => {
  const reroute = useRerouter()
  const dataStore = useContext(DataStoreContext)
  const {show: showDataLossWarningModal, props: dataLossWarningProps} = useModal({})
  const appContext = useContext(AppContext)

  // Redirect to welcome screen
  // unless client data has already been saved
  useEffect(() => {
    const welcomeIfNoClients = async () => {
      if (!appContext.languageLoaded) {
        return
      }
      if (appContext.userWelcomed) {
        return
      }
      appContext.setUserWelcomed(true)
      // skip welcome screen if app is installed as a PWA
      if (window.matchMedia("(display-mode: standalone)").matches) {
        return
      }
      const fetchedClients = await dataStore.clients.list()
      const alreadyHaveClients = !!fetchedClients.length
      if (alreadyHaveClients) {
        showDataLossWarningModal()
      } else if (!alreadyHaveClients) {
        reroute.to({page: `/welcome`})
      }
    }
    void welcomeIfNoClients()
  }, [dataStore.clients, reroute, showDataLossWarningModal, appContext])

  return (
    <>
      <DataLossWarningModal {...dataLossWarningProps} />
      {children}
    </>
  )
}

export default CheckForWelcomeComponent
