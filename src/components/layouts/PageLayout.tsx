import React, {ReactNode} from "react"

export const PageLayout = ({header, body, footer}: {header?: ReactNode; body?: ReactNode; footer?: ReactNode}) => {
  return (
    <div className="d-flex flex-column" style={{minHeight: "100vh"}}>
      {header}
      <div className="flex-grow-1 d-flex flex-column">{body}</div>
      {footer}
    </div>
  )
}
