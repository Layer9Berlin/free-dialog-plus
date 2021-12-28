import {t} from "@lingui/macro"
import {useMemo} from "react"
import {MutableAssessment} from "../types/Assessment"
import {MutableQuestionProps} from "../types/Questions"

export type QuestionText = {short: string; long: string; export: string}

export const useQuestionTexts = () => [
  {short: t`Mental health`, long: t`How satisfied are you with your mental health?`, export: "Mental Health"},
  {short: t`Physical health`, long: t`How satisfied are you with your physical health?`, export: "Physical Health"},
  {short: t`Job situation`, long: t`How satisfied are you with your job situation?`, export: "Job Situation"},
  {short: t`Accommodation`, long: t`How satisfied are you with your accommodation?`, export: "Accommodation"},
  {
    short: t`Leisure activities`,
    long: t`How satisfied are you with your leisure activities?`,
    export: "Leisure Activities",
  },
  {
    short: t`Relationship with partner/family`,
    long: t`How satisfied are you with your relationship with your partner/family?`,
    export: "Partner / Family",
  },
  {short: t`Friendships`, long: t`How satisfied are you with your friendships?`, export: "Friendships"},
  {short: t`Personal safety`, long: t`How satisfied are you with your personal safety?`, export: "Personal Safety"},
  {short: t`Medication`, long: t`How satisfied are you with your medication?`, export: "Medication"},
  {
    short: t`Practical help`,
    long: t`How satisfied are you with the practical help you receive?`,
    export: "Practical Help",
  },
  {
    short: t`Meetings`,
    long: t`How satisfied are you with your meetings with mental health professionals?`,
    export: "Meetings",
  },
]

export const useSelectedQuestions = ({
  assessment,
}: {
  assessment: MutableAssessment
}): (MutableQuestionProps & QuestionText)[] => {
  const allTexts = useQuestionTexts()
  return useMemo(
    () =>
      assessment.questions
        .map((question, index) => ({...question, ...allTexts[index]} as MutableQuestionProps & QuestionText))
        .filter((question) => question.state.selected),
    [allTexts, assessment.questions],
  )
}
