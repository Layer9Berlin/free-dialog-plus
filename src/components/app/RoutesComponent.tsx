import React from "react"
import {Route, Routes} from "react-router-dom"
import {AssessmentPage} from "../pages/assessment/AssessmentPage"
import {AssessmentsPage} from "../pages/assessments/AssessmentsPage"
import {ClientsPage} from "../pages/clients/ClientsPage"
import {LoginPage} from "../../../../dialog-plus/dialog_plus/pages/LoginPage"
import {RegisterPage} from "../pages/register/RegisterPage"
import {SettingsPage} from "../pages/settings/SettingsPage"
import {WelcomePage} from "../pages/welcome/WelcomePage"

export const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/clients" element={<ClientsPage />} />
      <Route path="/assessments" element={<AssessmentsPage />} />
      <Route path="/assessment" element={<AssessmentPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/*" element={<WelcomePage />} />
    </Routes>
  )
}
