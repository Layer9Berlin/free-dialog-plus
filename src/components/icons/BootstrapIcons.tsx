import React from "react"

export const BootstrapIcons =
  (name: string) =>
  ({className}: {className?: string}) => {
    return (
      <span className={className ?? ""}>
        <i className={`bi bi-${name}`} />
      </span>
    )
  }

export const ClientIcon = BootstrapIcons("person")
export const AddClientIcon = BootstrapIcons("person-plus")
export const EditIcon = BootstrapIcons("pencil")
export const DeleteIcon = BootstrapIcons("trash")
export const DoneIcon = BootstrapIcons("check-circle")
export const CreateAccountIcon = BootstrapIcons("cloud-plus")
export const WarningIcon = BootstrapIcons("exclamation-diamond")
export const ChevronUpIcon = BootstrapIcons("chevron-up")
export const AssessmentIcon = BootstrapIcons("clipboard")
export const SelectedCheckboxIcon = BootstrapIcons("check-circle-fill")
export const DeselectedCheckboxIcon = BootstrapIcons("circle")

// invisible icon just taking up space
// use for consistent layout
export const IconSpacer = BootstrapIcons("chevron-up opacity-0")
