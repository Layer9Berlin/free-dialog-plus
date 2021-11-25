import {t, Trans} from "@lingui/macro"
import React, {useMemo, useState} from "react"
import {useQuestionTexts} from "../../../../../hooks/QuestionTexts"
import {MutableAssessment} from "../../../../../types/Assessment"
import {MutableQuestionProps, QuestionProps} from "../../../../../types/Questions"
import {DialogPlusIcon} from "../../../../icons/DialogPlusIcon"
import {ResultOverview} from "../common/ResultOverview"
import {StepInformationModal} from "../../../../modals/StepInformationModal"

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

export const DiscussStage = ({assessment}: {assessment: MutableAssessment}) => {
  const questions = useMemo(
    () => assessment.questions.filter((question) => question.state.selected) as MutableQuestionProps[],
    [assessment],
  )
  const [questionIndex, setQuestionIndex] = useState<number>(0)
  const questionProps = useMemo<QuestionProps & MutableQuestionProps>(
    () => questions?.[questionIndex],
    [questionIndex, questions],
  )
  const questionTexts = useQuestionTexts()
  const questionText = useMemo(() => questionTexts?.[questionIndex], [questionIndex, questionTexts])

  const [informationModalIndex, setInformationModalIndex] = useState<number | undefined>(undefined)

  return (
    <div className="m-4">
      <StepInformationModal activeStep={informationModalIndex} onClose={() => setInformationModalIndex(undefined)} />
      <div className="d-flex">
        <h3>{questionText?.short || "-"}</h3>
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
                <div className="d-flex align-items-center justify-content-between" key={index}>
                  <span className="p-1 me-2">
                    <i className="bi bi-dot fs-3" />
                  </span>
                  <div className="input-group">
                    <input
                      className="form-control"
                      defaultValue={actionItem}
                      placeholder={t`Action item`}
                      onChange={(event) =>
                        questionProps.value.setActionItems(
                          questionProps.value.actionItems.map((actionItem, actionItemIndex) => {
                            if (index === actionItemIndex) {
                              return event.target.value
                            }
                            return actionItem
                          }),
                        )
                      }
                    />
                    <button
                      className="btn btn-outline-default"
                      onClick={() =>
                        questionProps.value.setActionItems(
                          questionProps.value.actionItems.filter((_, actionItemIndex) => index !== actionItemIndex),
                        )
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
                  onClick={() => questionProps.value.setActionItems([...questionProps.value.actionItems, ""])}
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
      {!!questions.length && (
        <nav className="mt-5" aria-label="Discuss question navigation">
          <ul className="pagination justify-content-center">
            {questions.map((question, index) => (
              <li key={index} className={"page-item link-info" + (index === questionIndex ? " active" : "s")}>
                <button className="page-link w-48 h-48" onClick={() => setQuestionIndex(index)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={"page-item link-info" + (questionIndex === questions.length - 1 ? " disabled" : "")}>
              <button
                className="page-link w-48 h-48"
                onClick={() => setQuestionIndex(questionIndex + 1)}
                aria-disabled={questionIndex === questions.length - 1 ? "true" : "false"}
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
