import {MouseEventHandler} from "react"
import {Button} from "react-bootstrap"
import {EditIcon} from "../icons/BootstrapIcons"

export const EditRowButton = ({onClick}: {onClick?: MouseEventHandler}) => (
  <Button
    aria-label="Edit row"
    onClick={onClick}
    variant="outline-muted border-light border-0 border-start rounded-0 w-56"
  >
    <EditIcon />
  </Button>
)
