import {Trans} from "@lingui/macro"
import React, {MouseEventHandler} from "react"
import {NavLink} from "react-router-dom"
import {formatDate, formatRelativeDatetime} from "../../../../helpers/DateFormatter"
import {useQuestionTexts} from "../../../../hooks/QuestionTexts"
import {Assessment} from "../../../../types/Assessment"
import {DeleteRowButton} from "../../../buttons/DeleteRowButton"
import {AssessmentIcon, DeselectedCheckboxIcon, SelectedCheckboxIcon} from "../../../icons/BootstrapIcons"

const AssessmentRowIcon = ({
  selectModeActive = false,
  isSelected = false,
}: {
  selectModeActive?: boolean
  isSelected?: boolean
}) => {
  if (selectModeActive) {
    if (isSelected) {
      return <SelectedCheckboxIcon />
    } else {
      return <DeselectedCheckboxIcon />
    }
  } else {
    return <AssessmentIcon />
  }
}

export const AssessmentRow = ({
  assessment,
  link,
  onDeleteClicked,
}: {
  assessment: Assessment
  link: string
  onDeleteClicked?: MouseEventHandler
}) => {
  const questionTexts = useQuestionTexts()
  return (
    <div className="d-flex border-bottom">
      <NavLink
        aria-label="Assessment row"
        to={link}
        className="flex-grow-1 p-3 text-decoration-none overflow-hidden d-flex flex-column"
      >
        <div className="d-flex flex-column flex-sm-row align-items-center">
          <div className="d-flex align-self-start">
            <span className="me-2">
              <AssessmentRowIcon />
            </span>
            <span className="text-nowrap text-truncate">
              {assessment.meta.title ?? formatDate(assessment.meta.date)}
            </span>
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
      <div className="d-flex align-self-start h-56">
        <DeleteRowButton className="border-bottom" onClick={onDeleteClicked} />
      </div>
    </div>
  )
}
