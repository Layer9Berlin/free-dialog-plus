import React, {useContext} from "react"
import {DataStoreContext} from "../../contexts/DataStoreContext"

export const SyncStateText = () => {
  const {
    syncState: {text, icon, color},
  } = useContext(DataStoreContext)

  return (
    <button
      className={`btn link-success text-decoration-none d-flex align-items-center text-${color} px-1 flex-shrink-1 overflow-hidden`}
    >
      <span>
        <i className={`bi bi-${icon} fs-4`} />
      </span>
      <span className="ms-1 small text-truncate">{text}</span>
    </button>
  )
}
