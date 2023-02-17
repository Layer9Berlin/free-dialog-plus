export type QuestionState = {
  collapsed: boolean
  selected: boolean
  highlighted?: boolean
}

export type AnswerValue = {
  selectedOption: number | undefined
  furtherHelp: boolean | undefined
  actionItems: string[]
}

export type Question = {
  text: QuestionText
  state: QuestionState
  value: AnswerValue
}

export type QuestionText = {
  short: string
  long: string
  export: string
}
