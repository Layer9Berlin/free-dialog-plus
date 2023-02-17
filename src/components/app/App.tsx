import React from "react"
import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom"
import {DataStoreContext, defaultSyncState} from "../../contexts/DataStoreContext"
import {InMemoryDataStore} from "../api/InMemoryDataStore"
import {AssessmentPage} from "../pages/assessment/AssessmentPage"
import {AssessmentsPage} from "../pages/assessments/AssessmentsPage"
import {ClientsPage} from "../pages/clients/ClientsPage"
import {LoginPage} from "../pages/login/LoginPage"
import {WelcomePage} from "../pages/welcome/WelcomePage"
import {LoginComponent} from "./LoginComponent"
import {TranslationComponent} from "./TranslationComponent"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<ClientsPage />}>
      <Route path="assessments" element={<AssessmentsPage />} />
      <Route path="assessment" element={<AssessmentPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="welcome" element={<WelcomePage />} />
    </Route>,
  ),
)

const App = () => {
  const dataStore = new InMemoryDataStore([{id: "test1", first: "Testor", middle: "T", last: "Testington"}])
  return (
    <TranslationComponent>
      <div className="App">
        <header />
        <main>
          <DataStoreContext.Provider value={{dataStore, syncState: defaultSyncState}}>
            <LoginComponent>
              <RouterProvider router={router} />
            </LoginComponent>
          </DataStoreContext.Provider>
        </main>
      </div>
    </TranslationComponent>
  )
}

export default App
