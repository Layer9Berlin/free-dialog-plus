import {Trans} from "@lingui/macro"
import {useCallback, useContext, useEffect, useState} from "react"
import {useLocation} from "react-router-dom"
import {DataStoreContext} from "../../../contexts/DataStoreContext"
import {Assessment} from "../../../types/Assessment"
import {StageIdentifier, StageNavigationButtons, useStageNavigation} from "../../menu/StageNavigation"
import {TitleText} from "../../text/TitleText"
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
      return <AssessStage assessment={assessment} changeAssessment={changeAssessment} />
    case "review":
      return <ReviewStage assessment={assessment} />
    case "select":
      return <SelectStage assessment={assessment} changeAssessment={changeAssessment} />
    case "discuss":
      return <DiscussStage assessment={assessment} changeAssessment={changeAssessment} />
    case "action-items":
      return <ActionItemsStage assessment={assessment} />
    default:
      return <></>
  }
}

export const AssessmentPage = () => {
  const location = useLocation()
  const {dataStore} = useContext(DataStoreContext)
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
      <div className="d-flex-center border-muted h-64 border-bottom">
        <TitleText>{stage.title}</TitleText>
        <StageNavigationButtons
          {...stageNavigationProps}
          // className="position-absolute start-0 top-0 end-0"
          titleBar={true}
        />
      </div>
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
      <StageNavigationButtons {...stageNavigationProps} className="border-top" />
    </div>
  )
}
