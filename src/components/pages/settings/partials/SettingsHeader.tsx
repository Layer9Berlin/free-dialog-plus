import {t} from "@lingui/macro"
import React from "react"
import {useRerouter} from "../../../../hooks/Rerouter"
import {CloseButton} from "../../../buttons/CloseButton"
import {Header} from "../../../layouts/Header"

export const SettingsHeader = () => {
  const reroute = useRerouter()

  return <Header title={t`Settings`} right={<CloseButton onClick={() => reroute.to({page: "/clients"})} />} />
}
