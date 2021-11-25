import {t, Trans} from "@lingui/macro"
import React from "react"
import {useQuestionTexts} from "../../../../../hooks/QuestionTexts"
import {MutableAssessment} from "../../../../../types/Assessment"
import {MutableQuestionProps, QuestionText} from "../../../../../types/Questions"
import {ChevronUpIcon} from "../../../../icons/BootstrapIcons"
import {DialogPlusIcon} from "../../../../icons/DialogPlusIcon"
import {AssessmentNumbers} from "../common/AssessmentNumbers"
import {Option} from "../common/Option"
import {ResultOverview} from "../common/ResultOverview"

const useOptions = () => [
  t`totally dissatisfied`,
  t`very dissatisfied`,
  t`fairly dissatisfied`,
  t`in the middle`,
  t`fairly satisfied`,
  t`very satisfied`,
  t`totally satisfied`,
]

export const AssessStageRow = ({
  question,
  state,
  value,
  index,
  onOpenNext,
}: MutableQuestionProps & {question: QuestionText} & {index: number; onOpenNext?: () => void}) => {
  const options = useOptions()
  return (
    <div className={"d-flex flex-column border-bottom" + (state.collapsed ? "" : " bg-light")}>
      <button
        className={`btn btn-accordion d-flex align-items-center${state.collapsed ? " collapsed" : ""}`}
        type="button"
        onClick={() => state.setCollapsed(!state.collapsed)}
      >
        <span className="fs-4 me-1">
          <ChevronUpIcon />
        </span>
        <div className="d-flex flex-column flex-sm-row px-2 align-items-center flex-grow-1 justify-content-stretch">
          <span className={"m-0 text-start w-200 align-self-start align-self-sm-center"}>{question.short}</span>
          <div className="d-flex flex-column flex-grow-1 py-2 align-self-stretch">
            <ResultOverview selectedValue={value.selectedOption} colorCode="primary" />
          </div>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center align-self-end mb-2">
          <DialogPlusIcon className={`ps-3 text-primary ${value.furtherHelp === true ? "visible" : "invisible"}`} />
        </div>
      </button>
      <div className={`accordion-content overflow-hidden${state.collapsed ? " max-h-0" : " max-h-500 max-md-h-160"}`}>
        <div className="d-flex flex-column border-muted border-bottom">
          <h3 className="m-3">{question.long}</h3>
          <div className="d-flex flex-column">
            <div className="d-flex flex-column flex-md-row align-items-start py-2">
              {options.map((option, optionIndex) => (
                <Option
                  key={"question_" + index + "_option_" + optionIndex}
                  text={option}
                  onSelect={() => value.setSelectedOption(optionIndex)}
                  selected={value.selectedOption === optionIndex}
                  optionIndex={optionIndex}
                />
              ))}
            </div>
            <div className="d-flex align-items-center align-self-end">
              <div className={`alert m-2 p-1${state.highlighted ? "  alert-info" : ""}`}>
                <div className="form-check user-select-none d-flex align-items-center ps-3">
                  <span>
                    <Trans>Do you need more help in this area?</Trans>
                  </span>
                  <button
                    className={`btn ps-5${state.highlighted ? " link-info" : ""}`}
                    onClick={() => {
                      value.setFurtherHelp(true)
                      onOpenNext?.()
                    }}
                  >
                    <input
                      role="button"
                      className="form-check-input"
                      type="checkbox"
                      checked={value.furtherHelp === true}
                      value="yes"
                      id={"further_help_radio_yes_" + index}
                      readOnly={true}
                    />
                    <label role="button" className="form-check-label ms-1" htmlFor={"further_help_radio_yes_" + index}>
                      <span>
                        <Trans>Yes</Trans>
                      </span>
                    </label>
                  </button>
                  <button
                    className={`btn ps-4${state.highlighted ? " link-info" : ""}`}
                    onClick={() => {
                      value.setFurtherHelp(false)
                      onOpenNext?.()
                    }}
                  >
                    <input
                      role="button"
                      className="form-check-input"
                      type="checkbox"
                      checked={value.furtherHelp === false}
                      value="no"
                      id={"further_help_radio_no_" + index}
                      readOnly={true}
                    />
                    <label role="button" className="form-check-label ms-1" htmlFor={"further_help_radio_no_" + index}>
                      <span>
                        <Trans>No</Trans>
                      </span>
                    </label>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const AssessStage = ({assessment}: {assessment: MutableAssessment}) => {
  const questionTexts = useQuestionTexts()
  return (
    <>
      <AssessmentNumbers />
      {questionTexts.map((questionText, questionIndex) => (
        <AssessStageRow
          key={questionIndex}
          index={questionIndex}
          question={questionText}
          {...assessment.questions[questionIndex]}
          onOpenNext={() => {
            if (assessment.questions[questionIndex]?.value?.selectedOption !== undefined) {
              assessment.questions[questionIndex]?.state?.setCollapsed(true)
              assessment.questions?.[questionIndex + 1]?.state?.setCollapsed(false)
            }
          }}
        />
      ))}
    </>
  )
}
