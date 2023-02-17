import React from "react"
import {BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, Routes} from "react-router-dom"
import {DataStoreContext, defaultSyncState} from "../../contexts/DataStoreContext"
import {InMemoryDataStore} from "../api/InMemoryDataStore"
import {AssessmentPage} from "../pages/assessment/AssessmentPage"
import {AssessmentsPage} from "../pages/assessments/AssessmentsPage"
import {ClientsPage} from "../pages/clients/ClientsPage"
import {LoginPage} from "../pages/login/LoginPage"
import {WelcomePage} from "../pages/welcome/WelcomePage"
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
