import React, {ReactNode} from "react"

export const Header = ({title, left, right}: {title?: string; left?: ReactNode; right?: ReactNode}) => {
  return (
    <div className="d-flex justify-content-between align-items-center border-bottom h-64 position-relative">
      {left || <div />}
      {title && <h1 className="m-1 position-absolute top-0 end-0 bottom-0 start-0 text-center pe-none">{title}</h1>}
      {right || <div />}
    </div>
  )
}
