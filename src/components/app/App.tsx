import {useState} from "react"
import {BrowserRouter} from "react-router-dom"
import {DataStoreContext} from "../../contexts/DataStoreContext"
import {LocalDataStore} from "../api/LocalDataStore"
import "./App.sass"
import {CheckForWelcomeComponent} from "./CheckForWelcomeComponent"
import {RoutesComponent} from "./RoutesComponent"
import {TranslationComponent} from "./TranslationComponent"

const App = () => {
  const dataStore = new LocalDataStore("dialog_plus_test")
  const [welcomeUser, setWelcomeUser] = useState(true)
  return (
    <TranslationComponent>
      <div className="App">
        <header />
        <main>
          <BrowserRouter>
            <DataStoreContext.Provider value={dataStore}>
              <CheckForWelcomeComponent welcomeUser={welcomeUser} setWelcomeUser={setWelcomeUser}>
                <RoutesComponent />
              </CheckForWelcomeComponent>
            </DataStoreContext.Provider>
          </BrowserRouter>
        </main>
      </div>
    </TranslationComponent>
  )
}

export default App
