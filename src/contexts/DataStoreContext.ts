import {createContext} from "react"
import {NoopStore} from "../components/api/DataStore"
import {DataStoreType} from "../types/DataStore"

export const DataStoreContext = createContext<DataStoreType>(NoopStore)
