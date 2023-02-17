import React, {ReactNode} from "react"
import {NavLink} from "react-router-dom"

export const ResponsiveLink = ({link, children, icon}: {link: string; children: ReactNode; icon: string}) => {
  //This was copy+pasted from the docs, just so we get a render for now:
  let activeStyle = {
    textDecoration: "underline",
  }

  return (
    <NavLink
      className="btn btn-outline-primary m-3 text-nowrap text-truncate"
      to={link}
      // This was also copy+pasted from the docs, just so we get a render for now:
      style={({isActive}) => (isActive ? activeStyle : undefined)}
    >
      <span>
        <i className={`bi bi-${icon}`} />
      </span>
      {children && <span className="d-none d-sm-inline">&nbsp;{children}</span>}
    </NavLink>
  )
}

//https://reactrouter.com/en/main/components/nav-link
