import {Trans} from "@lingui/macro"
import React, {MouseEventHandler, useCallback, useEffect, useState} from "react"
import {NavLink, useLocation} from "react-router-dom"
import {blankAssessment} from "../../../constants"
import {formatDate, formatRelativeDatetime} from "../../../helpers/DateFormatter"
import {useAssessmentExporter} from "../../../hooks/Exporter"
import {ExportOrDeleteSelectionType, useListSelection} from "../../../hooks/ListSelection"
import {useQuestionTexts} from "../../../hooks/QuestionTexts"
import {useRerouter} from "../../../hooks/Rerouter"
import {Assessment} from "../../../types/Assessment"
import {Client} from "../../../types/Client"
import {DataStoreType} from "../../../types/DataStore"
import {DataStoreContext} from "../../api/DataStore"
import {CloseButton} from "../../buttons/CloseButton"
import {ResponsiveButton} from "../../buttons/ResponsiveButton"
import {ResponsiveLink} from "../../buttons/ResponsiveLink"
import {Footer} from "../../menu/Footer"
import {DeleteAssessmentsModal} from "../../modals/DeleteAssessmentsModal"
import {ExportPasswordModal, useExportPasswordModal} from "../../modals/ExportPasswordModal"

const AssessmentsLoader = ({
  dataStore,
  setAssessments,
  setClient,
}: {
  dataStore: DataStoreType
  setAssessments: (assessments: Assessment[]) => void
  setClient: (client?: Client) => void
}) => {
  const location = useLocation()
  const [clientId, setClientId] = useState<string | undefined>(undefined)

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)

    const idFromLocation = searchParams.get("client_id")
    if (idFromLocation) {
      setClientId(idFromLocation)
      dataStore.clients.find(idFromLocation).then((client) => {
        setClient(client)
      })
    }
  }, [dataStore, location.search, setClient])

  useEffect(() => {
    dataStore.assessments
      .list()
      .then((assessments) =>
        setAssessments(assessments.filter((assessment) => !!clientId && assessment.meta.clientId === clientId)),
      )
  }, [clientId, dataStore.assessments, setAssessments])

  return <></>
}

const AssessmentRow = ({
  assessment,
  link,
  onClick,
  selectMode,
  isSelected,
}: {
  assessment: Assessment
  link: string
  onClick: MouseEventHandler
  selectMode: ExportOrDeleteSelectionType
  isSelected?: boolean
}) => {
  const questionTexts = useQuestionTexts()
  return (
    <NavLink
      to={link}
      className={
        "p-3 border-bottom text-decoration-none overflow-hidden d-flex flex-column" +
        (selectMode === "delete" ? " link-danger" : "")
      }
      onClick={onClick}
    >
      <div className="d-flex flex-column flex-sm-row align-items-center">
        <div className="d-flex align-self-start">
          {selectMode === "none" && (
            <span className="me-2">
              <i className="bi bi-clipboard" />
            </span>
          )}
          {selectMode !== "none" && (
            <span className="me-2">
              <i className={`bi bi-${isSelected ? "check-circle-fill" : "circle"}`} />
            </span>
          )}
          <span className="text-nowrap text-truncate">{assessment.meta.title ?? formatDate(assessment.meta.date)}</span>
        </div>
        <span className="ms-auto text-muted text-nowrap">
          <i className="bi bi-clock-history" />
          &nbsp;<Trans>last updated</Trans>&nbsp;
          {formatRelativeDatetime(assessment.meta.lastUpdated, assessment.meta.date)}
        </span>
      </div>
      {assessment.questions.map((question, questionIndex) => {
        if (question.value.actionItems.every((item) => !item.length)) {
          return <div key={questionIndex} />
        }
        return (
          <div key={questionIndex}>
            <ul className="m-0 mt-3">
              <h4>{questionTexts[questionIndex].short}</h4>
              {question.value.actionItems
                .filter((actionItem) => !!actionItem.length)
                .map((actionItem, index) => (
                  <li key={index}>{actionItem}</li>
                ))}
            </ul>
          </div>
        )
      })}
      {assessment.questions.every((question) => question.value.actionItems.every((item) => !item.length)) && (
        <span className="text-muted fst-italic flex-grow-1 d-flex-center mt-3">
          <Trans>No action items defined</Trans>
        </span>
      )}
    </NavLink>
  )
}

export const AssessmentsPage = () => {
  const exporter = useAssessmentExporter()
  const reroute = useRerouter()

  const [client, setClient] = useState<Client | undefined>(undefined)
  const [assessments, setAssessments] = useState<Assessment[]>([])

  const [selectMode, setSelectMode] = useState<ExportOrDeleteSelectionType>("none")
  const {
    selection,
    isSelected,
    toggle: toggleSelection,
    all: selectAll,
    none: selectNone,
  } = useListSelection<Assessment>({items: assessments})

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const closeDeleteModal = () => {
    setShowDeleteModal(false)
    setSelectMode("none")
  }
  const confirmDelete = (dataStore: DataStoreType) => async () => {
    closeDeleteModal()
    await dataStore.assessments.remove(...selection)
    setAssessments((await dataStore.assessments.list()).filter((assessment) => assessment.meta.clientId === client?.id))
  }

  const exportSelected = useCallback(
    async (dataStore: DataStoreType) => {
      await exporter.export(selection, await dataStore.clients.list())
      setSelectMode("none")
    },
    [exporter, selection],
  )

  const exportPasswordModal = useExportPasswordModal()

  return (
    <DataStoreContext.Consumer>
      {(dataStore) => (
        <>
          <AssessmentsLoader dataStore={dataStore} setAssessments={setAssessments} setClient={setClient} />

          <DeleteAssessmentsModal
            close={closeDeleteModal}
            confirm={confirmDelete(dataStore)}
            count={selection.length}
            show={showDeleteModal}
          />
          <ExportPasswordModal {...exportPasswordModal.props} />

          <div className="d-flex flex-column" style={{minHeight: "100vh"}}>
            <div className="d-flex justify-content-between align-items-center border-bottom h-64">
              {selectMode === "none" && (
                <ResponsiveLink link={reroute.link({page: "/", params: {client_id: undefined}})} icon="chevron-left">
                  <Trans>Back to Clients</Trans>
                </ResponsiveLink>
              )}
              {selectMode !== "none" && <div />}
              <h1 className="m-1">
                <Trans>Assessments</Trans>
              </h1>
              {selectMode === "none" && (
                <ResponsiveButton
                  onClick={async () => {
                    if (client?.id) {
                      const newAssessment = (await dataStore.assessments.add(blankAssessment(client.id)))?.[0]
                      if (newAssessment) {
                        reroute.to({page: `/assessment`, params: {id: newAssessment.id, client_id: undefined}})
                      }
                    }
                  }}
                  icon="clipboard-plus"
                >
                  <Trans>New session</Trans>
                </ResponsiveButton>
              )}
              {selectMode !== "none" && (
                <CloseButton
                  onClick={() => {
                    setSelectMode("none")
                  }}
                />
              )}
            </div>
            <div className="flex-grow-1 d-flex flex-column">
              {assessments.map((assessment, index) => (
                <AssessmentRow
                  assessment={assessment}
                  key={index}
                  link={reroute.link({
                    page: "/assessment",
                    params: {id: assessment.id, stage: "assess", client_id: undefined},
                  })}
                  onClick={(event) => {
                    if (selectMode !== "none") {
                      toggleSelection(assessment)
                      event.preventDefault()
                    }
                  }}
                  selectMode={selectMode}
                  isSelected={isSelected(assessment)}
                />
              ))}
            </div>
            <Footer
              disabled={assessments.length === 0}
              onExport={async () => {
                return exportSelected(dataStore)
              }}
              onDelete={() => setShowDeleteModal(true)}
              selectMode={selectMode}
              setSelectMode={(newSelectMode: ExportOrDeleteSelectionType) => {
                switch (newSelectMode) {
                  case "export": {
                    selectAll()
                    break
                  }
                  case "delete": {
                    selectNone()
                    break
                  }
                }
                setSelectMode(newSelectMode)
              }}
            />
          </div>
        </>
      )}
    </DataStoreContext.Consumer>
  )
}
