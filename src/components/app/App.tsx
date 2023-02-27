import {BrowserRouter} from "react-router-dom"
import {DataStoreContext, defaultSyncState} from "../../contexts/DataStoreContext"
import {InMemoryDataStore} from "../api/InMemoryDataStore"
import "./App.sass"
import {LoginComponent} from "./LoginComponent"
import {RoutesComponent} from "./RoutesComponent"
import {TranslationComponent} from "./TranslationComponent"

const App = () => {
  const dataStore = new InMemoryDataStore([{id: "test1", first: "Testor", middle: "T", last: "Testington"}])
  return (
    <TranslationComponent>
      <div className="App">
        <header />
        <main>
          <BrowserRouter>
            <DataStoreContext.Provider value={{dataStore, syncState: defaultSyncState}}>
              <LoginComponent>
                <RoutesComponent />
              </LoginComponent>
            </DataStoreContext.Provider>
          </BrowserRouter>
        </main>
      </div>
    </TranslationComponent>
  )
}

export default App
