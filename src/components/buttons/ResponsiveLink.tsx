import React, {ReactNode} from "react"
import {Link} from "react-router-dom"

export const ResponsiveLink = ({
  className,
  link,
  children,
  icon,
}: {
  className?: string
  link: string
  children: ReactNode
  icon: string
}) => {
  return (
    <Link
      className={
        "btn btn-outline-primary m-3 d-flex align-items-center text-nowrap text-truncate flex-shrink-0 " +
        (className ?? "")
      }
      to={link}
    >
      <span>
        <i className={`bi bi-${icon} fs-5`} />
      </span>
      {children && <span className="d-none d-lg-inline ms-1">&nbsp;{children}</span>}
    </Link>
  )
}
