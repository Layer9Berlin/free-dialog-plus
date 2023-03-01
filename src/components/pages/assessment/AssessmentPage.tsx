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

const Stage = ({
  id,
  assessment,
  changeAssessment,
}: {
  id: StageIdentifier
  assessment: Assessment
  changeAssessment: (newAssessment: Assessment) => void
}) => {
  switch (id) {
    case "assess":
      return <AssessStage assessment={assessment} />
    case "review":
      return <ReviewStage assessment={assessment} />
    case "select":
      return <SelectStage assessment={assessment} />
    case "discuss":
      return <DiscussStage assessment={assessment} />
    case "action-items":
      return <ActionItemsStage assessment={assessment} />
    default:
      return <></>
  }
}

export const AssessmentPage = () => {
  const location = useLocation()
  const dataStore = useContext(DataStoreContext)
  const [assessment, setAssessment] = useState<Assessment | undefined>(undefined)

  const changeAssessment = useCallback(
    (newAssessment: Assessment) => {
      void dataStore.assessments.change(newAssessment)
      setAssessment(newAssessment)
    },
    [dataStore.assessments, setAssessment],
  )

  useEffect(() => {
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
    return undefined
  }, [dataStore, location.search])

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
          <Stage id={stage.id} assessment={assessment} changeAssessment={changeAssessment} />
        </div>
      )}
      <StageNavigationRow {...stageNavigationProps} className="border-top" />
    </div>
  )
}
