import {useContext} from "react"
import {DataStoreContext} from "../../../../../contexts/DataStoreContext"
import {
  collapseAll,
  expand,
  setFurtherHelp,
  setHighlightedOption,
  setSelectedOption,
} from "../../../../../hooks/Assessments"
import {Assessment} from "../../../../../types/Assessment"
import {AssessmentNumbers} from "../common/AssessmentNumbers"
import {AssessStageRow} from "./partials/AssessStageRow"

export const AssessStage = ({assessment}: {assessment: Assessment}) => {
  const {assessments} = useContext(DataStoreContext)
  return (
    <>
      <AssessmentNumbers />
      {assessment.questions.map(({text}, questionIndex) => {
        return (
          <AssessStageRow
            key={questionIndex}
            index={questionIndex}
            question={text}
            {...assessment.questions[questionIndex]}
            onSelectOption={(optionIndex: number) => {
              assessments.change(setSelectedOption(assessment, questionIndex, optionIndex))
            }}
            onSetFurtherHelp={(needed: boolean) => {
              let newAssessment = setFurtherHelp(assessment, questionIndex, needed)
              if (assessment.questions[questionIndex]?.value?.selectedOption !== undefined) {
                newAssessment = expand(questionIndex + 1)(newAssessment)
              }
              assessments.change(newAssessment)
            }}
            onToggleCollapsed={() => {
              const expandedQuestionIndex = assessment.questions.findIndex((question) => !question.state.collapsed)
              if (expandedQuestionIndex || expandedQuestionIndex === 0) {
                const expandedQuestion = assessment.questions[expandedQuestionIndex]
                // don't allow collapsing the currently expanded question if a rating has been provided
                // but the "further help" question has not been answered
                if (
                  expandedQuestion?.value?.selectedOption !== undefined &&
                  expandedQuestion?.value?.furtherHelp === undefined
                ) {
                  assessments.change(setHighlightedOption(assessment, questionIndex))
                  return
                }
                const newAssessment = assessment.questions[questionIndex]?.state?.collapsed
                  ? expand(questionIndex)(assessment)
                  : collapseAll(assessment)
                assessments.change(newAssessment)
              }
            }}
          />
        )
      })}
    </>
  )
}
