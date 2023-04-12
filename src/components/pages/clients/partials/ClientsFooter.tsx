import {ExportButton} from "../../../buttons/ExportButton"
import {ImportButton} from "../../../buttons/ImportButton"
import {Footer} from "../../../layouts/Footer"

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
      right={<div className="d-flex"></div>}
    />
  )
}
