import React, {ReactNode} from "react"

export const Button = ({
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
  variant?: "primary" | "danger"
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
      {children && <span>&nbsp;{children}</span>}
    </button>
  )
}
