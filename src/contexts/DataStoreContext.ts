import {createContext} from "react"
import {NoopStore} from "../components/api/DataStore"
import {DataStoreType} from "../types/DataStore"

export type SyncState = {text: string; icon: string; color: "success" | "danger" | "warning" | "muted"}

export const defaultSyncState: SyncState = {
  text: "Initialising...",
  icon: "arrow-repeat",
  color: "success",
}

export const DataStoreContext = createContext<{dataStore: DataStoreType; syncState: SyncState}>({
  dataStore: NoopStore,
  syncState: defaultSyncState,
})
