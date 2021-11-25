import {ReactNode} from "react"
import {DataStoreContext} from "../api/DataStore"
import {localDataStore} from "../api/LocalDataStore"
import {LoginContext} from "./LoginComponent"

export const LocalDataStoreComponent = ({children}: {children?: ReactNode}) => {
  return (
    <LoginContext.Consumer>
      {({password}) => (
        <DataStoreContext.Provider value={localDataStore(password)}>{children}</DataStoreContext.Provider>
      )}
    </LoginContext.Consumer>
  )
}
