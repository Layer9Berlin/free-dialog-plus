import React from "react"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import {AssessmentPage} from "../pages/assessment/AssessmentPage"
import {AssessmentsPage} from "../pages/assessments/AssessmentsPage"
import {ClientsPage} from "../pages/clients/ClientsPage"
import {LoginPage} from "../pages/login/LoginPage"
import {WelcomePage} from "../pages/welcome/WelcomePage"
import {LocalDataStoreComponent} from "./LocalDataStoreComponent"
import {LoginComponent} from "./LoginComponent"

export const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <LoginComponent>
        <LocalDataStoreComponent>
          <Switch>
            <Route path="/" exact>
              <ClientsPage />
            </Route>
            <Route path="/welcome">
              <WelcomePage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/assessments">
              <AssessmentsPage />
            </Route>
            <Route path="/assessment">
              <AssessmentPage />
            </Route>
            {/*<Route path="/" element={<ClientsPage />} />*/}
            {/*<Route path="/welcome" element={<WelcomePage />} />*/}
            {/*<Route path="/login" element={<LoginPage />} />*/}
            {/*<Route path="/assessments" element={<AssessmentsPage />} />*/}
            {/*<Route path="/assessment" element={<AssessmentPage />} />*/}
            {/*<Route path="*" element={<Navigate to="/" />} />*/}
          </Switch>
        </LocalDataStoreComponent>
      </LoginComponent>
    </BrowserRouter>
  )
}
