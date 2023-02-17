import {useEffect, useState} from "react"
import {InMemoryDataStore} from "../components/api/InMemoryDataStore"
import {LoadState} from "../components/api/CombinedDataStore"
import {LocalDataStore} from "../components/api/LocalDataStore"
import {localStorageRemoteUsernameKey} from "../constants"
import {SyncState} from "../contexts/DataStoreContext"
import {DataStoreType} from "../types/DataStore"

export const useDataStore = () => {
  const [syncState, setSyncState] = useState<SyncState>({
    text: "Initialising...",
    icon: "arrow-repeat",
    color: "success",
  })
  const [loadState, setLoadState] = useState<LoadState>({loaded: false})
  const [dataStore, setDataStore] = useState<DataStoreType | undefined>(undefined)
  useEffect(() => {
    ;(async () => {
      const username = localStorage.getItem(localStorageRemoteUsernameKey)
      if (username) {
        setLoadState({loaded: true, loggedIn: true, hasAccount: true})
      } else {
        setDataStore(new InMemoryDataStore([{id: "test1", first: "Testor", middle: "T", last: "Testington"}]))
        if (await LocalDataStore.haveData()) {
          // setLoadStatus({loaded: true, localLoaded: true, remoteLoaded: false})
        } else {
          // setLoadStatus({loaded: true, localLoaded: false, remoteLoaded: false})
        }
      }
    })()
  }, [])
  return {
    dataStore,
    syncState,
    loadState,
  }
}
