import React from "react"
import {useQuestionTexts} from "../../../../../hooks/QuestionTexts"
import {MutableAssessment} from "../../../../../types/Assessment"
import {MutableQuestionProps, QuestionText} from "../../../../../types/Questions"
import {Checkbox} from "../../../../buttons/Checkbox"
import {DialogPlusIcon} from "../../../../icons/DialogPlusIcon"
import {AssessmentNumbers} from "../common/AssessmentNumbers"
import {ResultOverview} from "../common/ResultOverview"

export const SelectStageRow = ({short, value, state}: MutableQuestionProps & QuestionText) => {
  return (
    <div className="d-flex flex-column border-bottom">
      <button
        className={`btn btn-accordion d-flex align-items-center${state.selected ? " link-info fw-bold selected" : ""}`}
        type="button"
        onClick={() => state.setSelected(!state.selected)}
      >
        <span className="fs-4 me-1">
          <Checkbox selected={state.selected} />
        </span>
        <div className="d-flex flex-column flex-sm-row px-2 align-items-center flex-grow-1 justify-content-stretch">
          <span className={"m-0 text-start w-200 align-self-start align-self-sm-center"}>{short}</span>
          <div className="d-flex flex-column flex-grow-1 py-2 align-self-stretch">
            <ResultOverview selectedValue={value.selectedOption} colorCode={state.selected ? "info" : "primary"} />
          </div>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center align-self-end mb-2">
          <DialogPlusIcon
            className={`ps-3${state.selected ? " text-info" : " text-primary"}${
              value.furtherHelp === true ? " visible" : " invisible"
            }`}
          />
        </div>
      </button>
    </div>
  )
}

export const SelectStage = ({assessment}: {assessment: MutableAssessment}) => {
  const questionTexts = useQuestionTexts()
  return (
    <>
      <AssessmentNumbers />
      {questionTexts.map((questionText, questionIndex) => (
        <SelectStageRow key={questionIndex} {...questionText} {...assessment.questions[questionIndex]} />
      ))}
    </>
  )
}
