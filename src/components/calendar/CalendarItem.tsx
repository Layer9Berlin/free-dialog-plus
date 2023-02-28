import {useLingui} from "@lingui/react"
import {formatDate} from "../../helpers/DateFormatter"
import {Assessment} from "../../types/Assessment"
import {DialogPlusIcon} from "../icons/DialogPlusIcon"

export const CalendarItem = ({assessment, cssClass}: {assessment: Assessment; cssClass?: string}) => {
  const {i18n} = useLingui()
  return (
    <div className="d-flex flex-column justify-content-end h-100">
      <span className="mb-auto">{assessment.meta.title ?? formatDate(assessment.meta.date, i18n.locale)}</span>
      {assessment.questions.map((question, index) => (
        <div className="d-flex align-items-center" key={index}>
          <div className="progress flex-grow-1" style={{height: 6}}>
            <div
              className={"progress-bar" + (cssClass ? ` bg-${cssClass}` : "")}
              role="progressbar"
              aria-valuenow={question.value.selectedOption}
              aria-valuemin={0}
              aria-valuemax={6}
              style={{
                width: `${((question.value.selectedOption || 0) / 6) * 100}%`,
              }}
            />
          </div>
          <DialogPlusIcon
            small={true}
            className={
              "ms-1 d-flex align-items-center justify-content-center" +
              (question.value.furtherHelp ? " visible" : " invisible") +
              (cssClass ? ` text-${cssClass}` : "")
            }
          />
        </div>
      ))}
    </div>
  )
}
