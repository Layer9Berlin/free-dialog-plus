import {t} from "@lingui/macro"
import {v4 as uuid} from "uuid"
import {Assessment} from "./types/Assessment"
import {Question} from "./types/Questions"

export const localStorageDatabaseName = "dialog_plus_database_v1.0"
export const localStorageRemoteUsernameKey = "dialog_plus_username_v1.0"

export const localStorageAssessmentsKey = "dialog_plus_assessments_v0.3"
export const localStorageClientsKey = "dialog_plus_clients_v0.3"
export const localStoragePasswordHashKey = "dialog_plus_password_hash_v0.3"

const defaultQuestionProps: Question = {
  text: {
    long: "",
    short: "",
    export: "",
  },
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
  {
    ...defaultQuestionProps,
    state: {collapsed: false, selected: false},
    text: {short: t`Mental health`, long: t`How satisfied are you with your mental health?`, export: "Mental Health"},
  },
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

export const blankAssessment = (
  clientId: string,
  questionTexts: {
    short: string
    long: string
    export: string
  }[],
): Assessment => {
  return {
    id: uuid(),
    meta: {
      date: new Date(),
      lastUpdated: new Date(),
      clientId,
    },
    questions: questionTexts.map((questionText, index) => ({
      text: questionText,
      state: {
        collapsed: index > 0,
        selected: false,
      },
      value: {
        selectedOption: undefined,
        furtherHelp: undefined,
        actionItems: [],
      },
    })),
  }
}
