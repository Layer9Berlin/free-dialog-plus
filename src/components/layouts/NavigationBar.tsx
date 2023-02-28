import {ReactNode} from "react"

export const NavigationBar = ({title, left, right}: {title?: string; left?: ReactNode; right?: ReactNode}) => {
  return (
    <div className="d-flex justify-content-between align-items-center border-bottom h-64 position-relative">
      {left || <div />}
      {title && (
        <div className="m-1 d-flex-center flex-grow-1 flex-shrink-1 overflow-hidden pe-none">
          <h1 className="d-block text-truncate text-center m-0">{title}</h1>
        </div>
      )}
      {right || <div />}
    </div>
  )
}
