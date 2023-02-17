import {Trans} from "@lingui/macro"
import React, {useContext} from "react"
import {LoginStateContext} from "../../../../contexts/LoginStateContext"
import {CloseButton} from "../../../buttons/CloseButton"
import {ResponsiveButton} from "../../../buttons/ResponsiveButton"
import {ResponsiveLink} from "../../../buttons/ResponsiveLink"
import {Header} from "../../../layouts/Header"

export const ClientsHeader = ({
  isSelectingRows,
  stopSelectingRows,
  onCreateClient,
}: {
  isSelectingRows: boolean
  stopSelectingRows: () => void
  onCreateClient: () => void
}) => {
  const {logOut} = useContext(LoginStateContext)
  return (
    <Header
      title={`Clients`}
      left={
        logOut ? (
          <ResponsiveButton onClick={logOut} icon="box-arrow-left" variant="danger" outline={true}>
            <Trans>Log out</Trans>
          </ResponsiveButton>
        ) : (
          <ResponsiveLink link="/register" icon="cloud-plus">
            <Trans>Create account</Trans>
          </ResponsiveLink>
        )
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
