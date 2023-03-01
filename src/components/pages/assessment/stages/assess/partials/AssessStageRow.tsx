import {t, Trans} from "@lingui/macro"
import {Question, QuestionText} from "../../../../../../types/Questions"
import {ChevronUpIcon} from "../../../../../icons/BootstrapIcons"
import {DialogPlusIcon} from "../../../../../icons/DialogPlusIcon"
import {Option} from "../../common/Option"
import {ResultOverview} from "../../common/ResultOverview"

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
  onSelectOption,
  onSetFurtherHelp,
  onToggleCollapsed,
}: Question & {question: QuestionText} & {
  index: number
  onSelectOption?: (index: number) => void
  onSetFurtherHelp: (needed: boolean) => void
  onToggleCollapsed?: () => void
}) => {
  const options = useOptions()
  return (
    <div className={"d-flex flex-column border-bottom" + (state.collapsed ? "" : " bg-light")}>
      <button
        className={`btn btn-accordion d-flex align-items-center${state.collapsed ? " collapsed" : ""}`}
        type="button"
        onClick={onToggleCollapsed}
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
                  key={optionIndex}
                  text={option}
                  onSelect={() => onSelectOption?.(optionIndex)}
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
                    onClick={() => onSetFurtherHelp(true)}
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
                    onClick={() => onSetFurtherHelp(false)}
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
