import React from "react"
import {createRoot} from "react-dom/client"
import "./index.sass"
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom"
import App from "./components/app/App"
import {AssessmentPage} from "./components/pages/assessment/AssessmentPage"
import {AssessmentsPage} from "./components/pages/assessments/AssessmentsPage"
import {ClientsPage} from "./components/pages/clients/ClientsPage"
import {LoginPage} from "./components/pages/login/LoginPage"
import {WelcomePage} from "./components/pages/welcome/WelcomePage"
import reportWebVitals from "./reportWebVitals"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"
import "bootstrap/dist/js/bootstrap.bundle.min"
// import Bootstrap Icons here to bypass webpack 5 issue
// https://stackoverflow.com/questions/69208829/bootstrap-icons-and-webpack-5-you-may-need-an-appropriate-loader-to-handle-thi
import "bootstrap-icons/font/bootstrap-icons.css"

const rootElement = document.getElementById("root")
if (!rootElement) {
  throw new Error("Failed to find the root element")
}
const root = createRoot(rootElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

serviceWorkerRegistration.register()

reportWebVitals()
