import {Trans} from "@lingui/macro"
import {useCallback, useContext, useEffect, useState} from "react"
import {useLocation} from "react-router-dom"
import {DataStoreContext} from "../../../contexts/DataStoreContext"
import {Assessment} from "../../../types/Assessment"
import {StageIdentifier, StageNavigationRow, useStageNavigation} from "../../menu/StageNavigation"
import {ActionItemsStage} from "./stages/action-items/ActionItemsStage"
import {AssessStage} from "./stages/assess/AssessStage"
import {DiscussStage} from "./stages/discuss/DiscussStage"
import {ReviewStage} from "./stages/review/ReviewStage"
import {SelectStage} from "./stages/select/SelectStage"

const Stage = ({id, assessment, refresh}: {id: StageIdentifier; assessment: Assessment; refresh: () => void}) => {
  switch (id) {
    case "assess":
      return <AssessStage assessmentId={assessment.id} />
    case "review":
      return <ReviewStage assessmentId={assessment.id} />
    case "select":
      return <SelectStage assessmentId={assessment.id} refresh={refresh} />
    case "discuss":
      return <DiscussStage assessmentId={assessment.id} />
    case "action-items":
      return <ActionItemsStage assessmentId={assessment.id} />
    default:
      return <></>
  }
}

export const AssessmentPage = () => {
  const location = useLocation()
  const dataStore = useContext(DataStoreContext)
  const [assessment, setAssessment] = useState<Assessment | undefined>(undefined)

  const refresh = useCallback(() => {
    const searchParams = new URLSearchParams(location.search)
    const idFromLocation = searchParams.get("id")
    if (idFromLocation) {
      dataStore.assessments
        .find(idFromLocation)
        .then((assessment) => {
          setAssessment(assessment)
        })
        .catch(() => setAssessment(undefined))
    }
  }, [dataStore.assessments, location.search])

  useEffect(() => {
    refresh()
  }, [refresh])

  const {stage, props: stageNavigationProps} = useStageNavigation({assessment})

  return (
    <div className="d-flex flex-column position-relative" style={{minHeight: "100vh"}}>
      <StageNavigationRow {...stageNavigationProps} title={stage.title} />
      {!assessment && (
        <div className="d-flex-center flex-grow-1">
          <span className="text-muted fst-italics mt-4">
            <Trans>Assessment not found</Trans>
          </span>
        </div>
      )}
      {assessment && (
        <div className="flex-grow-1">
          <Stage id={stage.id} assessment={assessment} refresh={refresh} />
        </div>
      )}
      <StageNavigationRow {...stageNavigationProps} className="border-top" />
    </div>
  )
}
