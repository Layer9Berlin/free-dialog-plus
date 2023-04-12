import {Question} from "./Questions"

export type AssessmentMeta = {
  title?: string
  date: Date
  lastUpdated: Date
  clientId: string
}

export type LocalStorageAssessmentMeta = {
  title?: string
  date: string
  lastUpdated: string
  clientId: string
}

export type Assessment = {
  id: string
  meta: AssessmentMeta
  questions: Question[]
}

export type DeletedRecord = {
  id: string
  deletedAt: Date
}

export type LocalStorageAssessment = {
  id: string
  meta: LocalStorageAssessmentMeta
  questions: Question[]
}
