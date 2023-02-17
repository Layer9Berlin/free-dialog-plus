import React from "react"
import ReactDOM from "react-dom/client"
import "./index.sass"
import App from "./components/app/App"
import reportWebVitals from "./reportWebVitals"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"
// import "bootstrap/dist/js/bootstrap.bundle.min"
// Importing the bootstrap stuff here makes the styles appear again:
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

serviceWorkerRegistration.register()

reportWebVitals()
