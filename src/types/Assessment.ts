import {MutableQuestionProps, QuestionProps} from "./Questions"

export type AssessmentMeta = {
  title?: string
  date: Date
  lastUpdated: Date
  clientId: string
}

export type LocalStorageAssessmentMeta = {
  title?: string
  date: string
  lastUpdated: Date
  clientId: string
}

export type Assessment = {
  id: string
  meta: AssessmentMeta
  questions: QuestionProps[]
}

export type LocalStorageAssessment = {
  id: string
  meta: LocalStorageAssessmentMeta
  questions: QuestionProps[]
}

export type MutableAssessment = Assessment & {
  questions: MutableQuestionProps[]
  collapseAll: () => void
}
