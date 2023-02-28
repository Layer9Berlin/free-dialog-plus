import {t} from "@lingui/macro"
import {useRerouter} from "../../../../hooks/Rerouter"
import {CloseButton} from "../../../buttons/CloseButton"
import {NavigationBar} from "../../../layouts/NavigationBar"

export const SettingsHeader = () => {
  const reroute = useRerouter()

  return <NavigationBar title={t`Settings`} right={<CloseButton onClick={() => reroute.to({page: "/clients"})} />} />
}
