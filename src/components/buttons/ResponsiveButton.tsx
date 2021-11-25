import React, {ReactNode} from "react"

export const ResponsiveButton = ({
  onClick,
  children,
  icon,
  disabled,
  outline,
  className,
  variant,
}: {
  onClick: () => void
  children?: ReactNode
  icon: string
  className?: string
  disabled?: boolean
  outline?: boolean
  variant?: string
}) => {
  return (
    <button
      className={`btn btn-${outline ? "outline-" : ""}${variant ?? "primary"} m-3 text-nowrap text-truncate${
        className ? " " + className : ""
      }${disabled ? " disabled" : ""}`}
      onClick={onClick}
    >
      <span>
        <i className={`bi bi-${icon}`} />
      </span>
      {children && <span className="d-none d-sm-inline">&nbsp;{children}</span>}
    </button>
  )
}
