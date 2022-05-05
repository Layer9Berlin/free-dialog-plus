import {t, Trans} from "@lingui/macro"
import {useEffect, useState} from "react"
import {Assessment} from "../../types/Assessment"
import {DataStoreType} from "../../types/DataStore"
import {CalendarItem} from "./CalendarItem"

export const Calendar = ({
  current,
  onSelectComparison,
  dataStore,
}: {
  current?: Assessment
  dataStore?: DataStoreType
  onSelectComparison?: (assessment: Assessment) => void
}) => {
  const [calendarItems, setCalendarItems] = useState<Assessment[]>([])
  const [comparisonIndex, setComparisonIndex] = useState<number | undefined>(undefined)

  useEffect(() => {
    dataStore?.assessments?.list()?.then((assessments) => {
      const comparisons =
        assessments?.filter(
          (assessment) => assessment.id !== current?.id && assessment.meta.clientId === current?.meta?.clientId,
        ) ?? []
      setCalendarItems(comparisons)
    })
  }, [current?.id, current?.meta?.clientId, dataStore?.assessments])

  return (
    <div className="d-flex overflow-x-scroll h-200 p-2 border-bottom bg-light position-relative overflow-scroll">
      <div className="position-absolute top-0 bottom-0 start-0 d-flex m-1">
        {calendarItems.map((calendarItem, calendarItemIndex) => {
          const cssClass = calendarItemIndex === comparisonIndex ? "warning" : "warning"
          return (
            <button
              key={calendarItemIndex}
              className={`btn mx-2 p-2 bg-white border border-${cssClass} link-${cssClass} w-200`}
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
        {!calendarItems.length && (
          <div className="d-flex-center">
            <span className="m-3 text-muted fst-italic">
              <Trans>No past assessments yet</Trans>
            </span>
          </div>
        )}
        {current && (
          <button className="btn mx-2 p-2 bg-white border border-primary link-primary w-200" style={{borderRadius: 6}}>
            <CalendarItem
              assessment={{
                ...current,
                meta: {
                  ...current.meta,
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
