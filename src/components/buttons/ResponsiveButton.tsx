import {ReactNode} from "react"

export const ResponsiveButton = ({
  onClick,
  children,
  icon,
  disabled,
  outline,
  className,
  variant,
}: {
  onClick?: (() => void) | (() => Promise<void>)
  children?: ReactNode
  icon: string
  className?: string
  disabled?: boolean
  outline?: boolean
  variant?: string
}) => {
  return (
    <button
      className={`btn btn-${outline ? "outline-" : ""}${
        variant ?? "primary"
      } m-3 d-flex align-items-center text-nowrap text-truncate flex-shrink-0 ${className ? " " + className : ""}${
        disabled ? " disabled" : ""
      }`}
      onClick={onClick}
    >
      <span>
        <i className={`bi bi-${icon} fs-5`} />
      </span>
      {children && <span className="d-none d-lg-inline ms-1">&nbsp;{children}</span>}
    </button>
  )
}
