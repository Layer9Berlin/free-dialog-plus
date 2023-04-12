import {Trans} from "@lingui/macro"
import React, {ForwardedRef} from "react"
import {filterEnterKey} from "../../helpers/KeyboardEvents"

export const TextInput = React.forwardRef(
  (
    {
      id,
      label,
      onEnter,
    }: {
      id: string
      label: string
      onEnter?: () => void
    },
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div className="form-floating">
        <input
          type="text"
          className="form-control rounded-0"
          id={id}
          onKeyDown={filterEnterKey(onEnter)}
          placeholder=" "
          ref={ref}
        />
        <label htmlFor={id} className="form-label">
          <Trans id={label} />
        </label>
      </div>
    )
  },
)
