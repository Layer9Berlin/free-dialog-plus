import React from "react"
import ReactDOM from "react-dom"
import "./index.sass"
import App from "./components/app/App"
import reportWebVitals from "./reportWebVitals"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"
import "bootstrap/dist/js/bootstrap.bundle.min"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
)

serviceWorkerRegistration.register()

reportWebVitals()
