import {useState} from "react"
import {SelectionType} from "../../hooks/ListSelection"
import {DeleteRowButton} from "../buttons/DeleteRowButton"
import {ExportButton} from "../buttons/ExportButton"
import {ImportButton} from "../buttons/ImportButton"
import {ImportFeedbackModal} from "../modals/ImportErrorModal"

export const Footer = ({
  className,
  disabled,
  onDelete,
  onImport,
  onExport,
  selectMode,
  setSelectMode,
}: {
  className?: string
  disabled?: boolean
  onDelete?: () => void
  onImport?: (file: File) => Promise<boolean>
  onExport?: () => void
  selectMode?: SelectionType
  setSelectMode?: (selectMode: SelectionType) => void
}) => {
  const [importFeedbackModalState, setImportFeedbackModalState] = useState<{
    show: boolean
    title: string
    message: string
  }>({show: false, title: "", message: ""})
  const closeImportFeedbackModal = () => {
    setImportFeedbackModalState((state) => ({...state, show: false}))
  }
  return (
    <div
      className={
        "d-flex justify-content-between align-items-center h-64 border-top" + (className ? " " + className : "")
      }
    >
      <ImportFeedbackModal {...importFeedbackModalState} close={closeImportFeedbackModal} />
      <div className="d-flex">
        {onImport && (
          <ImportButton
            onImport={async (file) => {
              const importSuccessful = await onImport(file)
              if (importSuccessful) {
                setImportFeedbackModalState({
                  show: true,
                  title: "Import successful",
                  message: "The file has been imported.",
                })
              } else {
                setImportFeedbackModalState({
                  show: true,
                  title: "Import error",
                  message: "Sorry, the file could not be imported.",
                })
              }
            }}
          />
        )}
        {onExport && <ExportButton onExport={async () => onExport()} disabled={disabled} />}
      </div>
      <DeleteRowButton onClick={onDelete} />
    </div>
  )
}
