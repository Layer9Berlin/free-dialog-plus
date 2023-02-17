import React from "react"
import {ImportButton} from "../../../buttons/ImportButton"
import {SettingsButton} from "../../../buttons/SettingsButton"
import {Footer} from "../../../layouts/Footer"
import {SyncStateText} from "../../../text/SyncStateText"

export const AssessmentsFooter = ({onImport}: {onImport: (file: File) => Promise<void>}) => {
  return (
    <Footer
      left={
        <div className="d-flex">
          <ImportButton onImport={onImport} />
        </div>
      }
      right={
        <div className="d-flex">
          <SyncStateText />
          <SettingsButton />
        </div>
      }
    />
  )
}
