import {ImportButton} from "../../../buttons/ImportButton"
import {Footer} from "../../../layouts/Footer"

export const AssessmentsFooter = ({onImport}: {onImport: (file: File) => Promise<void>}) => {
  return (
    <Footer
      left={
        <div className="d-flex">
          <ImportButton onImport={onImport} />
        </div>
      }
      right={<div className="d-flex"></div>}
    />
  )
}
