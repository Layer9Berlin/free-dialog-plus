import {t, Trans} from "@lingui/macro"
import {useEffect, useMemo, useState} from "react"
import {NavLink, useLocation} from "react-router-dom"
import {useRerouter} from "../../hooks/Rerouter"
import {Assessment} from "../../types/Assessment"

export type StageIdentifier = "assess" | "review" | "select" | "discuss" | "action-items"
export type Stage = {id: StageIdentifier; title: string}
export type StageNavigationButtonProps = {
  clientId?: string
  className?: string
  titleBar?: boolean
  nextEnabled?: boolean
  stageIndex: number
  setStageIndex: (index: number) => void
}

const useStages = () =>
  [
    {
      id: "assess",
      title: t`Assess`,
    },
    {
      id: "review",
      title: t`Review`,
    },
    {
      id: "select",
      title: t`Select`,
    },
    {
      id: "discuss",
      title: t`Discuss`,
    },
    {
      id: "action-items",
      title: t`Action items`,
    },
  ] as Stage[]

export const useStageNavigation = ({
  assessment,
  onChange,
}: {
  assessment?: Assessment
  onChange?: () => void
}): {
  stage: Stage
  mode?: "input" | "select" | "compare"
  props: StageNavigationButtonProps
  clientId?: string
} => {
  const [stageIndex, setStageIndex] = useState<number>(0)
  const stages = useStages()
  const stage = useMemo(() => stages[stageIndex], [stageIndex, stages])

  const location = useLocation()
  const reroute = useRerouter()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)

    const stageFromLocation = searchParams.get("stage")
    if (stageFromLocation === "discuss" || stageFromLocation === "action-items") {
      if (!assessment?.questions.some((question) => question.state.selected)) {
        reroute.to({params: {stage: "select"}})
        return
      }
    }
    const stageIndexFromLocation = stages.findIndex((stage) => stage.id === stageFromLocation)
    if (stageIndexFromLocation !== -1) {
      setStageIndex(stageIndexFromLocation)
      onChange?.()
    }
  }, [assessment, location.search, onChange, reroute, stages])

  const mode = useMemo(() => {
    switch (stage.id) {
      case "select":
        return "select"
      case "review":
        return "compare"
      case "discuss":
      case "action-items":
        return undefined
      default:
        return "input"
    }
  }, [stage])
  return {
    stage,
    mode,
    props: useMemo(
      () => ({
        stageIndex,
        setStageIndex: (index) => {
          setStageIndex(index)
          onChange?.()
        },
        nextEnabled: stage.id !== "select" || assessment?.questions?.some((question) => question.state.selected),
        clientId: assessment?.meta?.clientId,
      }),
      [assessment?.meta?.clientId, assessment?.questions, onChange, stage.id, stageIndex],
    ),
  }
}

export const StageNavigationButtons = ({
  clientId,
  className,
  titleBar,
  stageIndex,
  setStageIndex,
  nextEnabled,
}: StageNavigationButtonProps) => {
  const reroute = useRerouter()
  const stages = useStages()

  const onBack = () => {
    setStageIndex(stageIndex - 1)
    reroute.to({params: {stage: stages[stageIndex - 1].id}})
  }

  const onNext = () => {
    if (stageIndex === stages.length - 1) {
      if (clientId) {
        reroute.to({page: `/assessments`, params: {client_id: clientId, id: undefined, stage: undefined}})
      }
      return
    }
    setStageIndex(stageIndex + 1)
    reroute.to({params: {stage: stages[stageIndex + 1].id}})
    window.scrollTo(0, 0)
  }

  return (
    <div className={"d-flex justify-content-start align-items-center h-64" + (className ? " " + className : "")}>
      {!titleBar && <ExitButton clientId={clientId} />}
      {stageIndex > 0 && <BackButton onBack={onBack} stageIndex={stageIndex} withText={!titleBar} />}
      <NextButton
        hideTextOnMobile={!!titleBar}
        onNext={onNext}
        stageIndex={stageIndex}
        disabled={nextEnabled === false}
      />
    </div>
  )
}

const ExitButton = ({clientId}: {clientId?: string}) => {
  const reroute = useRerouter()
  return (
    <NavLink
      className="btn btn-outline-primary m-3 me-0"
      to={reroute.link({page: "/assessments", params: {client_id: clientId, id: undefined, stage: undefined}})}
    >
      <span>
        <i className="bi bi-chevron-double-left" />
      </span>
      <span className="d-none d-md-inline">&nbsp;Exit</span>
    </NavLink>
  )
}

const BackButton = ({onBack, stageIndex, withText}: {onBack: () => void; stageIndex: number; withText: boolean}) => {
  const stages = useStages()

  return (
    <button className="btn btn-outline-primary m-3 text-nowrap text-truncate" onClick={onBack}>
      <span>
        <i className="bi bi-chevron-left" />
      </span>
      {withText && (
        <span className="d-none d-md-inline">
          &nbsp;
          <Trans>Back to {stages[(stageIndex + stages.length - 1) % stages.length].title}</Trans>
        </span>
      )}
    </button>
  )
}

const NextButton = ({
  onNext,
  stageIndex,
  hideTextOnMobile,
  disabled,
}: {
  onNext: () => void
  stageIndex: number
  disabled?: boolean
  hideTextOnMobile: boolean
}) => {
  const stages = useStages()
  const title = stageIndex === stages.length - 1 ? t`Finish` : stages[stageIndex + 1].title

  return (
    <button className="btn btn-primary ms-auto m-3 text-nowrap text-truncate" onClick={onNext} disabled={disabled}>
      {hideTextOnMobile && <span className="d-none d-md-inline">{title}&nbsp;</span>}
      {!hideTextOnMobile && <span>{title}&nbsp;</span>}
      <span>
        <i className="bi bi-chevron-right" />
      </span>
    </button>
  )
}
