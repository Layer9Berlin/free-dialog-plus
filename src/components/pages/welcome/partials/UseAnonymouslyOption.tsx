import React, {useContext} from "react"
import {Link} from "react-router-dom"
import {LoginStateContext} from "../../../../contexts/LoginStateContext"

export const UseAnonymouslyOption = () => {
  const {startAnonymousSession} = useContext(LoginStateContext)
  return (
    <div className="d-flex flex-column mt-3">
      <span className="text-muted align-self-center">
        You can also{" "}
        <Link className="link-dark" to="/clients" onClick={startAnonymousSession}>
          use it anonymously
        </Link>
      </span>
    </div>
  )
}
