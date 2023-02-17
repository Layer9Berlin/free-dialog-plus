import {t, Trans} from "@lingui/macro"
import React from "react"
import {useRerouter} from "../../../../hooks/Rerouter"
import {ResponsiveButton} from "../../../buttons/ResponsiveButton"
import {ResponsiveLink} from "../../../buttons/ResponsiveLink"
import {Header} from "../../../layouts/Header"

export const AssessmentsHeader = ({onCreateAssessment}: {onCreateAssessment: () => void}) => {
  const reroute = useRerouter()
  return (
    <Header
      title={t`Assessments`}
      left={
        <ResponsiveLink link={reroute.link({page: "/clients", params: {client_id: undefined}})} icon="chevron-left">
          <Trans>Back to Clients</Trans>
        </ResponsiveLink>
      }
      right={
        <ResponsiveButton onClick={onCreateAssessment} icon="clipboard-plus">
          <Trans>New session</Trans>
        </ResponsiveButton>
      }
    />
  )
}
