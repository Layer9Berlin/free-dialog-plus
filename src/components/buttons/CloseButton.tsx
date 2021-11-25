import React from "react"

export const CloseButton = ({onClick}: {onClick: () => void}) => {
  return (
    <button className="btn btn-outline-muted m-3 border-0" onClick={onClick}>
      <span>
        <i className="bi bi-x-lg" />
      </span>
    </button>
  )
}
