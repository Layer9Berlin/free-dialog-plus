import React, {ReactNode} from "react"

export const Footer = ({center, left, right}: {center?: ReactNode; left?: ReactNode; right?: ReactNode}) => {
  return (
    <div className="d-flex justify-content-between align-items-center border-top h-64">
      {left || <div />}
      {center || <div />}
      {right || <div />}
    </div>
  )
}
