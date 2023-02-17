import {defaultSyncState} from "../contexts/DataStoreContext"
import {DataStoreType} from "../types/DataStore"

export const useSyncStateManager = ({dataStore}: {dataStore: DataStoreType}) => {
  return {syncState: defaultSyncState}
}
