import {Trans} from "@lingui/macro"

export const DataInfoPanel = () => {
  return (
    <div className="m-3 alert alert-primary align-self-stretch">
      {/* <h4>
        <Trans>Welcome to Free DIALOG+</Trans>
      </h4> */}
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
          This app is meant for demo purposes only. All data is stored directly <b>on this device</b>. If used in the
          browser, deleting your browser cache will permanently erase all client and session data.
        </Trans>
        <br />
        <Trans>
          To prevent accidental data loss, use the import/export functionality in the browser version, or install the
          app on iOS.
        </Trans>
      </p>
    </div>
  )
}
