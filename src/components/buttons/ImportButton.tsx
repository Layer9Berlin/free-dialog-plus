import {Trans} from "@lingui/macro"
import {useRef} from "react"
import {ResponsiveButton} from "./ResponsiveButton"

export const ImportButton = ({onImport}: {onImport: (file: File) => Promise<void>}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <>
      <input
        accept=".csv"
        id="import-file-input"
        type="file"
        ref={inputRef}
        style={{display: "none"}}
        onInput={(inputElement) => {
          const file = (inputElement.target as HTMLInputElement)?.files?.[0]
          if (file) {
            void onImport(file)
          }
        }}
        className="pe-none opacity-0 position-fixed"
      />
      <ResponsiveButton
        className="me-0 flex-shrink-0"
        icon="box-arrow-in-down"
        onClick={() => {
          inputRef.current?.click()
        }}
        outline={true}
      >
        <Trans>Import</Trans>
      </ResponsiveButton>
    </>
  )
}
