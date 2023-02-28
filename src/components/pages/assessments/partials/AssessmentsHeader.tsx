import {t, Trans} from "@lingui/macro"
import {useRerouter} from "../../../../hooks/Rerouter"
import {ResponsiveButton} from "../../../buttons/ResponsiveButton"
import {ResponsiveLink} from "../../../buttons/ResponsiveLink"
import {NavigationBar} from "../../../layouts/NavigationBar"

export const AssessmentsHeader = ({onCreateAssessment}: {onCreateAssessment: () => void}) => {
  const reroute = useRerouter()
  return (
    <NavigationBar
      title={t`Assessments`}
      left={
        <ResponsiveLink link={reroute.link({page: "/", params: {client_id: undefined}})} icon="chevron-left">
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
