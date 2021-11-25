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

export const PersonIcon = BootstrapIcons("person")
export const ChevronUpIcon = BootstrapIcons("chevron-up")

// invisible icon just taking up space
// use for consistent layout
export const IconSpacer = BootstrapIcons("chevron-up opacity-0")
