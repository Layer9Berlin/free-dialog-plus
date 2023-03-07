import {useState} from "react"
import {BrowserRouter} from "react-router-dom"
import {DataStoreContext} from "../../contexts/DataStoreContext"
import {LocalDataStore} from "../api/LocalDataStore"
import "./App.sass"
import {LoginComponent} from "./LoginComponent"
import {RoutesComponent} from "./RoutesComponent"
import {TranslationComponent} from "./TranslationComponent"

const App = () => {
  const dataStore = new LocalDataStore("dialog_plus_test")
  const [mayNeedToWelcomeUser, setMayNeedToWelcomeUser] = useState(true)
  return (
    <TranslationComponent>
      <div className="App">
        <header />
        <main>
          <BrowserRouter>
            <DataStoreContext.Provider value={dataStore}>
              <LoginComponent
                mayNeedToWelcomeUser={mayNeedToWelcomeUser}
                setMayNeedToWelcomeUser={setMayNeedToWelcomeUser}
              >
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
