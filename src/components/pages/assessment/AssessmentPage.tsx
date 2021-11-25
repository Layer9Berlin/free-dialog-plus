import {Trans} from "@lingui/macro"
import React, {useEffect, useState} from "react"
import {useLocation} from "react-router-dom"
import {useMutableAssessment} from "../../../hooks/Assessment"
import {Assessment, MutableAssessment} from "../../../types/Assessment"
import {DataStoreType} from "../../../types/DataStore"
import {DataStoreContext} from "../../api/DataStore"
import {StageNavigationButtons, useStageNavigation} from "../../menu/StageNavigation"
import {TitleText} from "../../text/TitleText"
import {ActionItemsStage} from "./stages/action-items/ActionItemsStage"
import {AssessStage} from "./stages/assess/AssessStage"
import {DiscussStage} from "./stages/discuss/DiscussStage"
import {ReviewStage} from "./stages/review/ReviewStage"
import {SelectStage} from "./stages/select/SelectStage"

const AssessmentLoader = ({
  dataStore,
  setAssessment,
}: {
  dataStore: DataStoreType
  setAssessment: (assessment?: MutableAssessment) => void
}) => {
  const location = useLocation()
  const [assessmentData, setAssessmentData] = useState<Assessment | undefined>(undefined)

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)

    const idFromLocation = searchParams.get("id")
    if (idFromLocation) {
      dataStore.assessments.find(idFromLocation).then((assessment) => {
        setAssessmentData(assessment)
      })
    }
  }, [dataStore, dataStore.assessments, dataStore.clients, location.search, setAssessment])

  const mutableAssessment = useMutableAssessment({assessment: assessmentData, dataStore})
  useEffect(() => {
    setAssessment(mutableAssessment)
  }, [mutableAssessment, setAssessment])

  return <></>
}

export const AssessmentPage = () => {
  const [assessment, setAssessment] = useState<MutableAssessment | undefined>(undefined)
  const {stage, props: stageNavigationProps} = useStageNavigation({assessment})

  return (
    <DataStoreContext.Consumer>
      {(dataStore) => (
        <div className="d-flex flex-column position-relative" style={{minHeight: "100vh"}}>
          <AssessmentLoader dataStore={dataStore} setAssessment={setAssessment} />
          <StageNavigationButtons
            {...stageNavigationProps}
            className="position-absolute start-0 top-0 end-0"
            titleBar={true}
          />
          <div className="d-flex-center border-bottom border-muted h-64">
            <TitleText>{stage.title}</TitleText>
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
              {stage.id === "assess" && <AssessStage assessment={assessment} />}
              {stage.id === "review" && <ReviewStage assessment={assessment} />}
              {stage.id === "select" && <SelectStage assessment={assessment} />}
              {stage.id === "discuss" && <DiscussStage assessment={assessment} />}
              {stage.id === "action-items" && <ActionItemsStage assessment={assessment} />}
            </div>
          )}
          <StageNavigationButtons {...stageNavigationProps} className="border-top" />
        </div>
      )}
    </DataStoreContext.Consumer>
  )
}
