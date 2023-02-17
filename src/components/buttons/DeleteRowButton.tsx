import {MouseEventHandler} from "react"
import {Button} from "react-bootstrap"
import {DeleteIcon} from "../icons/BootstrapIcons"

export const DeleteRowButton = ({className, onClick}: {className?: string; onClick?: MouseEventHandler}) => (
  <Button
    aria-label="Delete row"
    onClick={onClick}
    variant="outline-muted"
    className={"border-light border-0 border-start rounded-0 w-56 " + (className ?? "")}
  >
    <DeleteIcon />
  </Button>
)
