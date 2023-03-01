export const Checkbox = ({selected}: {selected: boolean}) => {
  return (
    <span className="me-2">
      <i className={`bi bi-${selected ? "check-circle-fill" : "circle"}`} />
    </span>
  )
}
