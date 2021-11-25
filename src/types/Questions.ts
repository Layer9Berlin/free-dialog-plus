export type QuestionStateProps = {
  collapsed: boolean
  selected: boolean
  highlighted?: boolean
}

export type ResultInputValue = {
  selectedOption: number | undefined
  furtherHelp: boolean | undefined
  actionItems: string[]
}

export type QuestionProps = {
  state: QuestionStateProps
  value: ResultInputValue
}

export type MutableQuestionProps = QuestionProps & {
  state: {
    setCollapsed: (collapsed: boolean) => void
    setSelected: (selected: boolean) => void
  }
  value: {
    setSelectedOption: (selectedOption: number | undefined) => void
    setFurtherHelp: (furtherHelp: boolean | undefined) => void
    setActionItems: (actionItems: string[]) => void
  }
}

export type QuestionText = {
  short: string
  long: string
}
