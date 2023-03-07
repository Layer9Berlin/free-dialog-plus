import {ReactNode, useContext, useEffect} from "react"
// import {useLocation} from "react-router-dom"
import {DataStoreContext} from "../../contexts/DataStoreContext"
import {useModal} from "../../hooks/Modal"
import {useRerouter} from "../../hooks/Rerouter"
import {DataLossWarningModal} from "../modals/DataLossWarningModal"

export const CheckForWelcomeComponent = ({
  children,
  welcomeUser,
  setWelcomeUser,
}: {
  children?: ReactNode
  welcomeUser: boolean
  setWelcomeUser: (value: boolean) => void
}) => {
  const reroute = useRerouter()
  const dataStore = useContext(DataStoreContext)
  const {show: showDataLossWarningModal, props: dataLossWarningProps} = useModal({})

  // Redirect to welcome screen
  // unless client data has already been saved
  useEffect(() => {
    const welcomeIfNoClients = async () => {
      if (welcomeUser) {
        setWelcomeUser(false)
        const fetchedClients = await dataStore.clients.list()
        const alreadyHaveClients = !!fetchedClients.length
        if (alreadyHaveClients) {
          showDataLossWarningModal()
        } else if (!alreadyHaveClients) {
          reroute.to({page: `/welcome`})
        }
      }
    }
    void welcomeIfNoClients()
  }, [dataStore.clients, welcomeUser, reroute, setWelcomeUser, showDataLossWarningModal])

  return (
    <>
      <DataLossWarningModal {...dataLossWarningProps} />
      {children}
    </>
  )
}

export default CheckForWelcomeComponent
