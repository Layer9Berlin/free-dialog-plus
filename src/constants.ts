import {Assessment} from "./types/Assessment"
import {QuestionProps} from "./types/Questions"

export const localStorageAssessmentsKey = "dialog_plus_assessments_v0.3"
export const localStorageClientsKey = "dialog_plus_clients_v0.3"
export const localStoragePasswordHashKey = "dialog_plus_password_hash_v0.3"

const defaultQuestionProps: QuestionProps = {
  state: {
    collapsed: true,
    selected: false,
  },
  value: {
    selectedOption: undefined,
    furtherHelp: undefined,
    actionItems: [],
  },
}

export const initialQuestionsData = [
  {...defaultQuestionProps, state: {collapsed: false, selected: false}},
  defaultQuestionProps,
  defaultQuestionProps,
  defaultQuestionProps,
  defaultQuestionProps,
  defaultQuestionProps,
  defaultQuestionProps,
  defaultQuestionProps,
  defaultQuestionProps,
  defaultQuestionProps,
  defaultQuestionProps,
]

export const blankAssessment = (clientId: string): Omit<Assessment, "id"> => {
  return {
    meta: {
      date: new Date(),
      lastUpdated: new Date(),
      clientId,
    },
    questions: initialQuestionsData,
  }
}
