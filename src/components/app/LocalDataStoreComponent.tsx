import {ReactNode} from "react"

export const LocalDataStoreComponent = ({children}: {children?: ReactNode}) => {
  return (
    <></>
    // <LoginContext.Consumer>
    //   {({password}) => (
    //     <DataStoreContext.Provider value={localDataStore(password)}>{children}</DataStoreContext.Provider>
    //   )}
    // </LoginContext.Consumer>
  )
}
