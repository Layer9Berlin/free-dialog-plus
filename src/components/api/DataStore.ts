import {createContext} from "react"
import {DataStoreType} from "../../types/DataStore"

const NoopStoreSlice = {
  add: async () => undefined,
  find: async () => undefined,
  list: async () => [],
  remove: async () => false,
  replace: async () => false,
}

const NoopStore = {
  assessments: NoopStoreSlice,
  clients: NoopStoreSlice,
}

export const DataStoreContext = createContext<DataStoreType>(NoopStore)
