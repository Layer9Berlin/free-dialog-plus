import {t, Trans} from "@lingui/macro"
import {useContext, useMemo, useState} from "react"
import {DataStoreContext} from "../../../../../contexts/DataStoreContext"
import {addActionItem, removeActionItem, setActionItem} from "../../../../../hooks/Assessments"
import {Assessment} from "../../../../../types/Assessment"
import {DialogPlusIcon} from "../../../../icons/DialogPlusIcon"
import {StepInformationModal} from "../../../../modals/StepInformationModal"
import {ResultOverview} from "../common/ResultOverview"

export const StepNumber = ({step}: {step: number}) => {
  return (
    <div
      className="d-flex align-items-center justify-content-center rounded-pill bg-white border border-dark m-3 ms-0"
      style={{
        height: 48,
        width: 48,
        minHeight: 48,
        minWidth: 48,
      }}
    >
      <span className="fs-5 fw-bold text-dark">{step}</span>
    </div>
  )
}

export const DiscussStage = ({assessment}: {assessment: Assessment}) => {
  // Index of the current page within the set of selected questions.
  const [pageIndex, setPageIndex] = useState<number>(0)
  const selectedQuestions = useMemo(
    () => assessment.questions.filter((question) => question.state.selected),
    [assessment],
  )
  const {assessments} = useContext(DataStoreContext)

  const questionProps = useMemo(() => selectedQuestions?.[pageIndex], [pageIndex, selectedQuestions])

  const [informationModalIndex, setInformationModalIndex] = useState<number | undefined>(undefined)

  return (
    <div className="m-4">
      <StepInformationModal activeStep={informationModalIndex} onClose={() => setInformationModalIndex(undefined)} />
      <div className="d-flex">
        <h3>{questionProps?.text?.short || "-"}</h3>
      </div>
      <div className="d-flex align-items-center mb-3 ms-0">
        <ResultOverview selectedValue={questionProps?.value?.selectedOption} />
        <DialogPlusIcon
          className={
            "ms-3 d-flex align-items-center justify-content-center text-primary" +
            (questionProps?.value?.furtherHelp ? " visible" : " invisible")
          }
        />
      </div>
      <div className="d-flex-center">
        <div>
          <div className="d-flex align-items-start">
            <StepNumber step={1} />
            <div className="flex-grow-1">
              <div className="d-flex align-items-center">
                <h4 className="m-0">
                  <Trans>Understanding</Trans>
                </h4>
                <button
                  className="btn btn-link"
                  onClick={() => {
                    setInformationModalIndex(1)
                  }}
                >
                  <span>
                    <i className="bi bi-info-circle fs-5" />
                  </span>
                </button>
              </div>
              <ul>
                <li>
                  <Trans>Why is this rating not a lower one?</Trans>
                </li>
                <li>
                  <Trans>What is working?</Trans>
                </li>
              </ul>
            </div>
          </div>
          <div className="d-flex align-items-start">
            <StepNumber step={2} />
            <div className="flex-grow-1">
              <div className="d-flex align-items-center">
                <h4 className="m-0">
                  <Trans>Looking forward</Trans>
                </h4>
                <button
                  className="btn btn-link"
                  onClick={() => {
                    setInformationModalIndex(2)
                  }}
                >
                  <span>
                    <i className="bi bi-info-circle fs-5" />
                  </span>
                </button>
              </div>
              <ul>
                <li>
                  <Trans>Best case scenario?</Trans>
                </li>
                <li>
                  <Trans>Smallest improvement?</Trans>
                </li>
              </ul>
            </div>
          </div>
          <div className="d-flex align-items-start">
            <StepNumber step={3} />
            <div className="flex-grow-1">
              <div className="d-flex align-items-center">
                <h4 className="m-0">
                  <Trans>Considering options</Trans>
                </h4>
                <button
                  className="btn btn-link"
                  onClick={() => {
                    setInformationModalIndex(3)
                  }}
                >
                  <span>
                    <i className="bi bi-info-circle fs-5" />
                  </span>
                </button>
              </div>
              <ul>
                <li>
                  <Trans>What can the patient do?</Trans>
                </li>
                <li>
                  <Trans>What can the clinician do?</Trans>
                </li>
                <li>
                  <Trans>What can others do?</Trans>
                </li>
              </ul>
            </div>
          </div>
          <div className="d-flex align-items-start">
            <StepNumber step={4} />
            <div className="flex-grow-1 d-flex flex-column">
              <div className="d-flex align-items-center">
                <h4 className="m-0">
                  <Trans>Agreeing on actions</Trans>
                </h4>
                <button
                  className="btn btn-link"
                  onClick={() => {
                    setInformationModalIndex(4)
                  }}
                >
                  <span>
                    <i className="bi bi-info-circle fs-5" />
                  </span>
                </button>
              </div>
              {questionProps?.value?.actionItems?.map((actionItem, index) => (
                <div
                  className="d-flex align-items-center justify-content-between"
                  key={index + " " + pageIndex + " " + questionProps.value.actionItems.length}
                >
                  <span className="p-1 me-2">
                    <i className="bi bi-dot fs-3" />
                  </span>
                  <div className="input-group">
                    <input
                      className="form-control"
                      defaultValue={actionItem}
                      placeholder={t`Action item`}
                      onChange={(event) =>
                        assessments.change(setActionItem(pageIndex, index, event.target.value)(assessment))
                      }
                    />
                    <button
                      className="btn btn-outline-default"
                      onClick={() =>
                        assessments.change(removeActionItem(pageIndex, index, selectedQuestions)(assessment))
                      }
                    >
                      <span>
                        <i className="bi bi-x" />
                      </span>
                    </button>
                  </div>
                </div>
              ))}
              <div className="d-flex align-items-center justify-content-between">
                <button
                  className="btn link-primary border-0 p-0 d-flex align-items-center"
                  onClick={() => assessments.change(addActionItem(pageIndex, "")(assessment))}
                >
                  <span className="p-1 me-2">
                    <i className="bi bi-plus-square fs-3" />
                  </span>
                  <span>
                    <Trans>Add action item</Trans>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!!selectedQuestions.length && (
        <nav className="mt-5" aria-label="Discuss question navigation">
          <ul className="pagination justify-content-center">
            {selectedQuestions.map((question, index) => (
              <li key={index} className={"page-item link-info" + (index === pageIndex ? " active" : "")}>
                <button className="page-link w-48 h-48" onClick={() => setPageIndex(index)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={"page-item link-info" + (pageIndex === selectedQuestions.length - 1 ? " disabled" : "")}>
              <button
                className="page-link w-48 h-48"
                onClick={() => setPageIndex(pageIndex + 1)}
                aria-disabled={pageIndex === selectedQuestions.length - 1 ? "true" : "false"}
              >
                <span>
                  <i className="bi bi-chevron-right" />
                </span>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  )
}
