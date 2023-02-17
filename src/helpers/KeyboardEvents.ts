import {KeyboardEvent} from "react"

export const filterEnterKey =
  <ReturnType>(callback?: (event: KeyboardEvent<HTMLInputElement>) => ReturnType) =>
  (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      callback?.(event)
    }
  }
