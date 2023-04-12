import {t, Trans} from "@lingui/macro"
import {useState} from "react"
import {useAssessments} from "../../hooks/Assessments"
import {Assessment} from "../../types/Assessment"
import {CalendarItem} from "./CalendarItem"

export const Calendar = ({
  assessment: currentAssessment,
  onSelectComparison,
}: {
  assessment?: Assessment
  onSelectComparison?: (assessment: Assessment) => void
}) => {
  const [comparisonIndex, setComparisonIndex] = useState<number | undefined>(undefined)
  const {assessments} = useAssessments({clientId: currentAssessment?.meta?.clientId})

  return (
    <div className="d-flex overflow-x-scroll h-200 p-2 border-bottom bg-light position-relative overflow-scroll">
      <div className="position-absolute top-0 bottom-0 start-0 d-flex m-1">
        {assessments
          .filter((item) => item.id !== currentAssessment?.id)
          .map((calendarItem, calendarItemIndex) => {
            const cssClass = calendarItemIndex === comparisonIndex ? "warning" : "dark"
            return (
              <button
                key={calendarItemIndex}
                className={`btn mx-2 p-2 bg-white border border-${cssClass} btn-outline-${cssClass} w-200`}
                style={{
                  borderRadius: 6,
                  opacity: calendarItemIndex === comparisonIndex ? 1 : 0.5,
                }}
                onClick={() => {
                  onSelectComparison?.(calendarItem)
                  setComparisonIndex(calendarItemIndex)
                }}
              >
                <CalendarItem assessment={calendarItem} cssClass={cssClass} />
              </button>
            )
          })}
        {!assessments.length && (
          <div className="d-flex-center">
            <span className="m-3 text-muted fst-italic">
              <Trans>No past assessments yet</Trans>
            </span>
          </div>
        )}
        {currentAssessment && (
          <button
            className="btn mx-2 p-2 bg-white border border-primary btn-outline-primary w-200 pe-none"
            style={{borderRadius: 6}}
          >
            <CalendarItem
              assessment={{
                ...currentAssessment,
                meta: {
                  ...currentAssessment.meta,
                  title: t`Current assessment`,
                },
              }}
            />
          </button>
        )}
      </div>
    </div>
  )
}
