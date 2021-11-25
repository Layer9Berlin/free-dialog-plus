import React, {ReactNode} from "react"
import {NavLink} from "react-router-dom"

export const ResponsiveLink = ({link, children, icon}: {link: string; children: ReactNode; icon: string}) => {
  return (
    <NavLink className="btn btn-outline-primary m-3 text-nowrap text-truncate" to={link} activeClassName="">
      <span>
        <i className={`bi bi-${icon}`} />
      </span>
      {children && <span className="d-none d-sm-inline">&nbsp;{children}</span>}
    </NavLink>
  )
}
