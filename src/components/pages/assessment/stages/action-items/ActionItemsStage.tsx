import {Trans} from "@lingui/macro"
import React, {useMemo} from "react"
import {useQuestionTexts} from "../../../../../hooks/QuestionTexts"
import {Assessment} from "../../../../../types/Assessment"

export const ActionItemsStage = ({assessment}: {assessment: Assessment}) => {
  const questions = useMemo(() => assessment.questions, [assessment.questions])
  const questionTexts = useQuestionTexts()

  return (
    <div className="m-4">
      <div className="d-flex minh-200 flex-column">
        {questions.map((question, questionIndex) => {
          if (question.value.actionItems.every((item) => !item.length)) {
            return <div key={questionIndex} />
          }
          return (
            <div key={questionIndex}>
              <ul>
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
        {questions.every((question) => question.value.actionItems.every((item) => !item.length)) && (
          <span className="text-muted fst-italic flex-grow-1 d-flex-center">
            <Trans>No action items defined</Trans>
          </span>
        )}
      </div>
    </div>
  )
}
