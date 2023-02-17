import React from "react"
import {Route, Routes} from "react-router-dom"
import {AssessmentPage} from "../pages/assessment/AssessmentPage"
import {AssessmentsPage} from "../pages/assessments/AssessmentsPage"
import {ClientsPage} from "../pages/clients/ClientsPage"
import {LoginPage} from "../pages/login/LoginPage"
import {WelcomePage} from "../pages/welcome/WelcomePage"
import {LocalDataStoreComponent} from "./LocalDataStoreComponent"

export const RoutesComponent = () => {
  return (
    <LocalDataStoreComponent>
      <Routes>
        <Route path="/" element={<ClientsPage />} />
        <Route path="assessments" element={<AssessmentsPage />} />
        <Route path="assessment" element={<AssessmentPage />} />
        <Route path="welcome" element={<WelcomePage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </LocalDataStoreComponent>
  )
}
