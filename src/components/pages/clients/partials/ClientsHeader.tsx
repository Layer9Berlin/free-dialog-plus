import {t, Trans} from "@lingui/macro"
import {CloseButton} from "../../../buttons/CloseButton"
import {ResponsiveButton} from "../../../buttons/ResponsiveButton"
import {NavigationBar} from "../../../layouts/NavigationBar"

export const ClientsHeader = ({
  isSelectingRows,
  stopSelectingRows,
  onCreateClient,
}: {
  isSelectingRows: boolean
  stopSelectingRows: () => void
  onCreateClient: () => void
}) => {
  // function reloadPage() {
  //   window.location.reload()
  // }
  return (
    <NavigationBar
      title={t`Clients`}
      left={
        <ResponsiveButton icon="box-arrow-left" variant="danger" outline={true}>
          <Trans>Log out</Trans>
        </ResponsiveButton>
      }
      right={
        isSelectingRows ? (
          <CloseButton onClick={stopSelectingRows} />
        ) : (
          <ResponsiveButton onClick={onCreateClient} icon="person-plus">
            <Trans>New client</Trans>
          </ResponsiveButton>
        )
      }
    />
  )
}
