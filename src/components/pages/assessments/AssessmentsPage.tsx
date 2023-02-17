import React, {useContext, useEffect, useState} from "react"
import {useLocation} from "react-router-dom"
import {blankAssessment} from "../../../constants"
import {DataStoreContext} from "../../../contexts/DataStoreContext"
import {useAssessments} from "../../../hooks/Assessments"
import {useDeleteModal} from "../../../hooks/DeleteModal"
import {useRerouter} from "../../../hooks/Rerouter"
import {Assessment} from "../../../types/Assessment"
import {PageLayout} from "../../layouts/PageLayout"
import {DeleteAssessmentsModal} from "../../modals/DeleteAssessmentsModal"
import {ExportPasswordModal, useExportPasswordModal} from "../../modals/ExportPasswordModal"
import {AssessmentRow} from "./partials/AssessmentRow"
import {AssessmentsFooter} from "./partials/AssessmentsFooter"
import {AssessmentsHeader} from "./partials/AssessmentsHeader"

export const AssessmentsPage = () => {
  const reroute = useRerouter()
  const location = useLocation()
  const {dataStore} = useContext(DataStoreContext)

  const [clientId, setClientId] = useState<string | undefined>(undefined)
  useEffect(() => {
    const clientId = new URLSearchParams(location.search).get("client_id") ?? undefined
    setClientId(clientId)
  }, [dataStore.clients, location.search])

  const {assessments, refresh} = useAssessments({clientId, dataStoreSlice: dataStore.assessments})

  const deleteAssessmentsModal = useDeleteModal<Assessment>({dataStoreSlice: dataStore.assessments, refresh})
  const exportPasswordModal = useExportPasswordModal()

  return (
    <>
      <DeleteAssessmentsModal {...deleteAssessmentsModal.props} />
      <ExportPasswordModal {...exportPasswordModal.props} />

      <PageLayout
        header={
          <AssessmentsHeader
            onCreateAssessment={async () => {
              if (clientId) {
                const newAssessment = blankAssessment(clientId)
                await dataStore.assessments.add(newAssessment)
                reroute.to({page: "/assessment", params: {id: newAssessment.id, stage: "assess"}})
              }
            }}
          />
        }
        body={assessments?.map((assessment) => (
          <AssessmentRow
            assessment={assessment}
            key={assessment.id}
            link={reroute.link({
              page: "/assessment",
              params: {id: assessment.id, stage: "assess", client_id: undefined},
            })}
            onDeleteClicked={() => deleteAssessmentsModal.show(assessment)}
          />
        ))}
        footer={<AssessmentsFooter onImport={async () => {}} />}
      />
    </>
  )
}
