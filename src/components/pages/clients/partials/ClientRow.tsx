import {MouseEventHandler} from "react"
import {NavLink} from "react-router-dom"
import {Client} from "../../../../types/Client"
import {DeleteRowButton} from "../../../buttons/DeleteRowButton"
import {EditRowButton} from "../../../buttons/EditRowButton"
import {ClientIcon, DeselectedCheckboxIcon, SelectedCheckboxIcon} from "../../../icons/BootstrapIcons"

type ClientRowProps = {
  client: Client
  link: string
  onDeleteClicked?: MouseEventHandler
  onEditClicked?: MouseEventHandler
  onToggleSelected?: MouseEventHandler
  selectModeActive: boolean
  isSelected?: boolean
}

const ClientRowIcon = ({selectModeActive, isSelected}: {selectModeActive: boolean; isSelected?: boolean}) => {
  if (selectModeActive) {
    if (isSelected) {
      return <SelectedCheckboxIcon />
    } else {
      return <DeselectedCheckboxIcon />
    }
  } else {
    return <ClientIcon />
  }
}

export const ClientRow = ({
  client,
  link,
  onDeleteClicked,
  onEditClicked,
  onToggleSelected,
  selectModeActive,
  isSelected,
}: ClientRowProps) => {
  let linkColor = ""
  if (selectModeActive) {
    linkColor = isSelected ? "link-primary" : "link-dark"
  }
  return (
    <div className="d-flex border-bottom justify-content-between">
      <NavLink
        aria-label="Client row"
        className={`flex-grow-1 p-3 text-decoration-none overflow-hidden d-flex align-items-center ${linkColor} ${
          isSelected ? "fw-bold" : ""
        }`}
        to={link}
        onClick={
          selectModeActive
            ? (event) => {
                onToggleSelected?.(event)
                event.preventDefault()
              }
            : undefined
        }
      >
        <span className="me-2">
          <ClientRowIcon isSelected={isSelected} selectModeActive={selectModeActive} />
        </span>
        <span className="d-inline-block text-truncate">
          {[client.first, client.middle, client.last].filter((component) => component?.length).join(" ")}
        </span>
      </NavLink>
      <div className="d-flex">
        <EditRowButton onClick={onEditClicked} />
        <DeleteRowButton onClick={onDeleteClicked} />
      </div>
    </div>
  )
}
