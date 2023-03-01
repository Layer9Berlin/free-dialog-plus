import {ReactNode} from "react"
// import {DataStoreContext} from "../../contexts/DataStoreContext"
// import {LoginContext} from "./LoginComponent"
// import {LocalDataStore} from "../api/LocalDataStore"

// const LocalDataStoreContentComponent = ({password, children}: {password?: string; children: ReactNode}) => {
//   const localDataStore = useMemo(() => new LocalDataStore(password), [password])
//   return <DataStoreContext.Provider value={localDataStore}>{children}</DataStoreContext.Provider>
// }
export const LocalDataStoreComponent = ({children}: {children?: ReactNode}) => {
  return <>{children}</>
  // return (
  //   <LoginContext.Consumer>
  //     {({password}) => (
  //       <LocalDataStoreContentComponent password={password}>{children}</LocalDataStoreContentComponent>
  //     )}
  //   </LoginContext.Consumer>
  // )
}
