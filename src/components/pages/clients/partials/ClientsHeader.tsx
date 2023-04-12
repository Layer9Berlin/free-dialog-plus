import {t, Trans} from "@lingui/macro"
import {CloseButton} from "../../../buttons/CloseButton"
import {ResponsiveButton} from "../../../buttons/ResponsiveButton"
import {NavigationBar} from "../../../layouts/NavigationBar"
import {LanguageSwitch} from "../../../menu/LanguageSwitch"

export const ClientsHeader = ({
  isSelectingRows,
  stopSelectingRows,
  onCreateClient,
}: {
  isSelectingRows: boolean
  stopSelectingRows: () => void
  onCreateClient: () => void
}) => {
  return (
    <NavigationBar
      title={t`Clients`}
      left={<LanguageSwitch dropdownStyle={false} />}
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
