import React from "react"
import {createRoot} from "react-dom/client"
import "./index.sass"
import App from "./components/app/App"
import reportWebVitals from "./reportWebVitals"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"
import "bootstrap/dist/js/bootstrap.bundle.min"

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
