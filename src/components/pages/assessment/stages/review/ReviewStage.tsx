import {useState} from "react"
import {useAssessment} from "../../../../../hooks/Assessment"
import {useQuestionTexts} from "../../../../../hooks/QuestionTexts"
import {Assessment} from "../../../../../types/Assessment"
import {AnswerValue, Question, QuestionText} from "../../../../../types/Questions"
import {Calendar} from "../../../../calendar/Calendar"
import {IconSpacer} from "../../../../icons/BootstrapIcons"
import {DialogPlusIcon} from "../../../../icons/DialogPlusIcon"
import {AssessmentNumbers} from "../common/AssessmentNumbers"
import {ResultOverview} from "../common/ResultOverview"

export const ReviewStageRow = ({
  short,
  value,
  comparisonValue,
}: Question & QuestionText & {onOpenNext?: () => void; comparisonValue?: AnswerValue}) => {
  return (
    <div className="d-flex flex-column border-bottom">
      <button className="btn btn-accordion d-flex align-items-center" type="button">
        <span className="fs-4 me-1">
          <IconSpacer />
        </span>
        <div className="d-flex flex-column flex-sm-row px-2 align-items-center flex-grow-1 justify-content-stretch">
          <span className={"m-0 text-start w-200 align-self-start align-self-sm-center"}>{short}</span>
          <div className="d-flex flex-column flex-grow-1 py-2 align-self-stretch">
            {comparisonValue && (
              <ResultOverview selectedValue={comparisonValue?.selectedOption} colorCode={"warning"} />
            )}
            <ResultOverview selectedValue={value.selectedOption} colorCode="primary" />
          </div>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center align-self-end mb-2">
          {comparisonValue && (
            <DialogPlusIcon
              className={"ps-3 text-warning " + (comparisonValue.furtherHelp === true ? "visible" : "invisible")}
            />
          )}
          <DialogPlusIcon className={"ps-3 text-primary " + (value.furtherHelp === true ? "visible" : "invisible")} />
        </div>
      </button>
    </div>
  )
}

export const ReviewStage = ({assessmentId}: {assessmentId: string}) => {
  const [comparison, setComparison] = useState<Assessment | undefined>(undefined)
  const questionTexts = useQuestionTexts()
  const {assessment} = useAssessment(assessmentId)

  return (
    <>
      <Calendar assessment={assessment} onSelectComparison={setComparison} />
      <AssessmentNumbers />
      {questionTexts.map(
        (questionText, questionIndex) =>
          !!assessment && (
            <ReviewStageRow
              key={questionIndex}
              {...questionText}
              {...assessment.questions[questionIndex]}
              comparisonValue={comparison?.questions?.[questionIndex]?.value}
            />
          ),
      )}
    </>
  )
}
