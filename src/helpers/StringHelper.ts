export const capitalize = (value: string): string => {
  return value
    .split(" ")
    .map((component) => {
      return (component?.[0] ?? "").toUpperCase() + component.substr(1).toLowerCase()
    })
    .join(" ")
}
