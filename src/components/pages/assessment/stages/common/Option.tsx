import React from "react"

export const Option = ({
  text,
  onSelect,
  selected,
  optionIndex,
}: {
  text: string
  onSelect: () => void
  selected: boolean
  optionIndex: number
}) => {
  return (
    <div
      role="button"
      className="flex-grow-1 d-flex flex-row flex-md-column align-items-center justify-content-center px-2"
      onClick={onSelect}
    >
      <div
        className={
          "result-option-dot d-flex align-items-center justify-content-center m-2 rounded-pill w-24 h-24 " +
          (selected ? "bg-primary" : "bg-light border border-muted")
        }
        style={{
          width: 24,
          height: 24,
        }}
      >
        <span className={"fs-5 " + (selected ? "text-white" : "text-muted")}>{optionIndex + 1}</span>
      </div>
      <span className={"text-center " + (selected ? "text-primary" : "text-muted")}>{text}</span>
    </div>
  )
}
