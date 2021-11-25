import {Trans} from "@lingui/macro"
import React, {useRef, useState} from "react"
import {ExportOrDeleteSelectionType} from "../../hooks/ListSelection"
import {Button} from "../buttons/Button"
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
  onImport?: (file: File) => void
  onExport?: () => void
  selectMode?: ExportOrDeleteSelectionType
  setSelectMode?: (selectMode: ExportOrDeleteSelectionType) => void
}) => {
  // const inputRef = useRef<HTMLInputElement>(null)

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
        {/*<input*/}
        {/*  id="import-file-input"*/}
        {/*  type="file"*/}
        {/*  ref={inputRef}*/}
        {/*  style={{display: "none"}}*/}
        {/*  onInput={(inputElement) => {*/}
        {/*    const file = (inputElement.target as HTMLInputElement)?.files?.[0]*/}
        {/*    if (file) {*/}
        {/*      const importSuccessful = onImport?.(file)*/}
        {/*      if (importSuccessful) {*/}
        {/*        setImportFeedbackModalState({*/}
        {/*          show: true,*/}
        {/*          title: "Import successful",*/}
        {/*          message: "The file has been imported.",*/}
        {/*        })*/}
        {/*      } else {*/}
        {/*        setImportFeedbackModalState({*/}
        {/*          show: true,*/}
        {/*          title: "Import error",*/}
        {/*          message: "Sorry, the file could not be imported.",*/}
        {/*        })*/}
        {/*      }*/}
        {/*    }*/}
        {/*  }}*/}
        {/*  className="pe-none opacity-0 position-fixed"*/}
        {/*/>*/}
        {/*<Button*/}
        {/*  onClick={() => {*/}
        {/*    inputRef.current?.click()*/}
        {/*  }}*/}
        {/*  icon="box-arrow-in-down"*/}
        {/*  outline={true}*/}
        {/*  className="m-3 me-0"*/}
        {/*/>*/}
        <Button
          onClick={() => {
            if (selectMode === "export") {
              onExport?.()
            } else {
              setSelectMode?.("export")
            }
          }}
          disabled={disabled}
          icon="box-arrow-up"
          outline={selectMode !== "export"}
        >
          {selectMode === "export" && <Trans>Export selected</Trans>}
        </Button>
      </div>
      <Button
        className={selectMode === "delete" ? "active" : ""}
        variant="danger"
        icon="trash"
        onClick={() => {
          if (selectMode === "delete") {
            onDelete?.()
          } else {
            setSelectMode?.("delete")
          }
        }}
        disabled={disabled}
        outline={selectMode !== "delete"}
      >
        {selectMode === "delete" && <Trans>Delete selected</Trans>}
      </Button>
    </div>
  )
}
