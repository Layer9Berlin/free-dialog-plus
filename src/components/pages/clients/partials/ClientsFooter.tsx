import React, {useContext} from "react"
import {LoginStateContext} from "../../../../contexts/LoginStateContext"
import {ExportButton} from "../../../buttons/ExportButton"
import {ImportButton} from "../../../buttons/ImportButton"
import {SettingsButton} from "../../../buttons/SettingsButton"
import {Footer} from "../../../layouts/Footer"
import {SyncStateText} from "../../../text/SyncStateText"

export const ClientsFooter = ({
  exportDisabled = false,
  exportSelectionModeActive = false,
  onExport,
  onImport,
}: {
  exportDisabled: boolean
  exportSelectionModeActive: boolean
  onExport: () => Promise<void>
  onImport: (file: File) => Promise<void>
}) => {
  return (
    <Footer
      left={
        <div className="d-flex">
          <ImportButton onImport={onImport} />
          <ExportButton active={exportSelectionModeActive} disabled={exportDisabled} onExport={onExport} />
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
