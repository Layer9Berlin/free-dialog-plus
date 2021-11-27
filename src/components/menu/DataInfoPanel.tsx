import {Trans} from "@lingui/macro"

export const DataInfoPanel = () => {
  return (
    <div className="m-3 alert alert-primary align-self-stretch">
      <h4>
        <Trans>Welcome to Free Dialogue Plus</Trans>
      </h4>
      <p>
        <Trans>
          This is a free, web-based implementation of the{" "}
          {
            <a href="https://dialog.elft.nhs.uk" className="link-primary">
              DIALOG+ therapeutic intervention
            </a>
          }
          .
        </Trans>
      </p>
      <h4>
        <Trans>Data protection</Trans>
      </h4>
      <p>
        <Trans>
          Note that all data is stored <b>on this device</b> only. Take care when deleting your browser cache and use
          the import/export functionality or install the app (see below) to prevent accidental loss of data.
        </Trans>
      </p>
    </div>
  )
}
