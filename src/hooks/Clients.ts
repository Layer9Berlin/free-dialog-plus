import {useCallback, useEffect, useState} from "react"
import {Client} from "../types/Client"
import {DataStoreType} from "../types/DataStore"

export const useClients = ({dataStore}: {dataStore: DataStoreType}) => {
  const [clients, setClients] = useState<Client[]>([])
  const refresh = useCallback(async () => {
    const newClients = await dataStore.clients.list()
    setClients(newClients)
  }, [dataStore])
  useEffect(() => void refresh(), [refresh])
  return {clients, refresh}
}
