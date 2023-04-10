import {BrowserRouter} from "react-router-dom"
import {AppContext} from "../../contexts/AppContext"
import {DataStoreContext} from "../../contexts/DataStoreContext"
import {useAppContext} from "../../hooks/App"
import {LocalDataStore} from "../api/LocalDataStore"
import "./App.sass"
import {CheckForWelcomeComponent} from "./CheckForWelcomeComponent"
import {RoutesComponent} from "./RoutesComponent"
import {TranslationComponent} from "./TranslationComponent"

const App = () => {
  const dataStore = new LocalDataStore("dialog_plus_data")
  const appContext = useAppContext()
  return (
    <AppContext.Provider value={appContext}>
      <TranslationComponent>
        <div className="App">
          <header />
          <main>
            <BrowserRouter>
              <DataStoreContext.Provider value={dataStore}>
                <CheckForWelcomeComponent>
                  <RoutesComponent />
                </CheckForWelcomeComponent>
              </DataStoreContext.Provider>
            </BrowserRouter>
          </main>
        </div>
      </TranslationComponent>
    </AppContext.Provider>
  )
}

export default App
