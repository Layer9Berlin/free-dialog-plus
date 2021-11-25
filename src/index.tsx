import React from "react"
import ReactDOM from "react-dom"
import "./index.sass"
import App from "./components/app/App"
import reportWebVitals from "./reportWebVitals"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
)

serviceWorkerRegistration.unregister()

reportWebVitals()
