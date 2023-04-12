import {ReactNode} from "react"

export const TitleText = ({children}: {children: ReactNode}) => (
  <h1 className="m-3 d-block flex-grow-1 flex-shrink-1 overflow-hidden text-truncate text-center">{children}</h1>
)
