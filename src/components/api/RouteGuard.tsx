import React, {ReactNode, useEffect} from "react"
import {SyncState} from "../../contexts/DataStoreContext"
import {LoginState} from "../../contexts/LoginStateContext"
import {useDataStore} from "../../hooks/DataStore"
import {useModal} from "../../hooks/Modal"
import {useRerouter} from "../../hooks/Rerouter"
import {DataStoreType} from "../../types/DataStore"
import {DataLossWarningModal} from "../modals/DataLossWarningModal"

export const RouteGuard = ({
  children,
  loginState,
}: {
  children: ({dataStore, status}: {dataStore: DataStoreType; status: SyncState}) => ReactNode
  loginState?: LoginState
}) => {
  const reroute = useRerouter()
  const {show: showWarningModal, props: dataLossWarningModalProps} = useModal({})
  const {dataStore, loadState, syncState} = useDataStore()

  useEffect(() => {
    if (loginState?.loggedIn) {
    } else {
      if (loginState?.anonymous) {
        showWarningModal()
      } else {
        reroute.to({page: "/"})
      }
    }
  }, [loadState, loginState, reroute, showWarningModal])
  return (
    <>
      <DataLossWarningModal {...dataLossWarningModalProps} />
      {!!dataStore && children({dataStore, status: syncState})}
    </>
  )
}
