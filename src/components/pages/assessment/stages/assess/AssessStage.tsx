import {useAssessment} from "../../../../../hooks/Assessment"
import {
  collapseAll,
  expand,
  setFurtherHelp,
  setHighlightedOption,
  setSelectedOption,
} from "../../../../../hooks/Assessments"
import {AssessmentNumbers} from "../common/AssessmentNumbers"
import {AssessStageRow} from "./partials/AssessStageRow"

export const AssessStage = ({assessmentId}: {assessmentId: string}) => {
  const {assessment, change: changeAssessment} = useAssessment(assessmentId)
  return (
    <>
      <AssessmentNumbers />
      {assessment?.questions?.map(({text}, questionIndex) => {
        return (
          <AssessStageRow
            key={questionIndex}
            index={questionIndex}
            question={text}
            {...assessment.questions[questionIndex]}
            onSelectOption={(optionIndex: number) => {
              changeAssessment(setSelectedOption(assessment, questionIndex, optionIndex))
            }}
            onSetFurtherHelp={(needed: boolean) => {
              let newAssessment = setFurtherHelp(assessment, questionIndex, needed)
              if (assessment.questions[questionIndex]?.value?.selectedOption !== undefined) {
                newAssessment = expand(questionIndex + 1)(newAssessment)
              }
              changeAssessment(newAssessment)
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
                  changeAssessment(setHighlightedOption(assessment, questionIndex))
                  return
                }
                const newAssessment = assessment.questions[questionIndex]?.state?.collapsed
                  ? expand(questionIndex)(assessment)
                  : collapseAll(assessment)
                changeAssessment(newAssessment)
              }
            }}
          />
        )
      })}
    </>
  )
}
