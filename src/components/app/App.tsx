import React from "react"
import {RoutesComponent} from "./RoutesComponent"
import {TranslationComponent} from "./TranslationComponent"

const App = () => {
  return (
    <TranslationComponent>
      <div className="App">
        <header />
        <main>
          <RoutesComponent />
        </main>
      </div>
    </TranslationComponent>
  )
}

export default App
