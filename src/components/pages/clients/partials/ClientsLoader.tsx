import React, {useEffect} from "react"
import {Client} from "../../../../types/Client"
import {DataStoreType} from "../../../../types/DataStore"

export const ClientsLoader = ({
  dataStore,
  setClients,
}: {
  dataStore: DataStoreType
  setClients: (clients: Client[]) => void
}) => {
  useEffect(() => {
    dataStore.clients
      .list()
      .then((clients) => setClients(clients))
      // TODO: give user feedback
      .catch(() => setClients([]))
  }, [dataStore.clients, setClients])
  return <></>
}
