import {t} from "@lingui/macro"
import {Assessment} from "./types/Assessment"
import {Question} from "./types/Questions"
import {v4 as uuid} from "uuid"

export const localStorageDatabaseName = "dialog_plus_database_v1.0"
export const localStorageRemoteUsernameKey = "dialog_plus_username_v1.0"

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

export const blankAssessment = (clientId: string): Assessment => {
  return {
    id: uuid(),
    meta: {
      date: new Date(),
      lastUpdated: new Date(),
      clientId,
    },
    questions: initialQuestionsData,
  }
}
