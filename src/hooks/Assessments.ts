import {useCallback, useContext, useEffect, useState} from "react"
import {DataStoreContext} from "../contexts/DataStoreContext"
import {Assessment} from "../types/Assessment"

export const useAssessments = ({
  clientId,
}: {
  clientId: string | undefined
}): {assessments: Assessment[]; refresh: () => Promise<void>} => {
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const dataStore = useContext(DataStoreContext)
  const refresh = useCallback(async () => {
    if (!clientId) {
      setAssessments([])
      return Promise.resolve()
    }
    try {
      const assessments = await dataStore.assessments.list()
      setAssessments(assessments.filter((assessment) => assessment.meta?.clientId === clientId))
    } catch (e) {
      return setAssessments([])
    }
  }, [clientId, dataStore])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return {assessments, refresh}
}

export const setSelectedOption = (assessment: Assessment, index: number, value: number | undefined): Assessment => ({
  ...assessment,
  questions: assessment.questions.map((question, questionIndex) =>
    index === questionIndex
      ? {
          ...question,
          value: {...question.value, selectedOption: value},
        }
      : question,
  ),
  meta: {
    ...assessment.meta,
    lastUpdated: new Date(),
  },
})

export const setFurtherHelp = (assessment: Assessment, index: number, value: boolean | undefined): Assessment => ({
  ...assessment,
  questions: assessment.questions.map((question, questionIndex) =>
    index === questionIndex
      ? {
          ...question,
          value: {...question.value, furtherHelp: value},
          state: {...question.state, highlighted: false},
        }
      : question,
  ),
  meta: {
    ...assessment.meta,
    lastUpdated: new Date(),
  },
})

export const setHighlightedOption = (assessment: Assessment, index: number): Assessment => ({
  ...assessment,
  questions: assessment.questions.map((question, index) => ({
    ...question,
    state: {
      ...question.state,
      highlighted: true,
    },
  })),
  meta: {
    ...assessment.meta,
    lastUpdated: new Date(),
  },
})

export const setSelected =
  (index: number, value: boolean) =>
  (assessment: Assessment): Assessment => ({
    ...assessment,
    questions: assessment.questions.map((question, questionIndex) =>
      index === questionIndex
        ? {
            ...question,
            state: {...question.state, selected: value},
          }
        : question,
    ),
    meta: {
      ...assessment.meta,
      lastUpdated: new Date(),
    },
  })

export const toggleSelected =
  (index: number) =>
  (assessment: Assessment): Assessment => {
    return setSelected(index, !assessment.questions?.[index]?.state?.selected)(assessment)
  }

export const expand =
  (index: number | undefined) =>
  (assessment: Assessment): Assessment => ({
    ...assessment,
    questions: assessment.questions.map((question, questionIndex) => ({
      ...question,
      state: {...question.state, collapsed: index !== questionIndex, highlighted: false},
    })),
  })

export const collapseAll = (assessment: Assessment): Assessment => ({
  ...assessment,
  questions: assessment.questions.map((question, questionIndex) => ({
    ...question,
    state: {...question.state, collapsed: true, highlighted: false},
  })),
})

export const setActionItem =
  (questionId: string | undefined, actionItemIndex: number, actionItemText: string) =>
  (assessment: Assessment): Assessment => ({
    ...assessment,
    questions: assessment.questions.map((question, questionIndex) =>
      questionId === question.id
        ? {
            ...question,
            value: {
              ...question.value,
              actionItems: question.value.actionItems.map((oldItem, oldItemIndex) =>
                oldItemIndex === actionItemIndex ? actionItemText : oldItem,
              ),
            },
          }
        : question,
    ),
    meta: {
      ...assessment.meta,
      lastUpdated: new Date(),
    },
  })

export const removeActionItem =
  (questionId: string | undefined, indexOfItemToBeDeleted: number) =>
  (assessment: Assessment): Assessment => ({
    ...assessment,
    questions: assessment.questions.map((question, questionIndex) =>
      questionId === question.id
        ? {
            ...question,
            value: {
              ...question.value,
              actionItems: question.value.actionItems.filter(
                (_, oldItemIndex) => oldItemIndex !== indexOfItemToBeDeleted,
              ),
            },
          }
        : question,
    ),
    meta: {
      ...assessment.meta,
      lastUpdated: new Date(),
    },
  })

export const addActionItem =
  (questionId: string | undefined, newActionItemIndex: string) =>
  (assessment: Assessment): Assessment => ({
    ...assessment,
    questions: assessment.questions.map((question, questionIndex) =>
      questionId === question.id
        ? {
            ...question,
            value: {
              ...question.value,
              actionItems: [...question.value.actionItems, newActionItemIndex],
            },
          }
        : question,
    ),
    meta: {
      ...assessment.meta,
      lastUpdated: new Date(),
    },
  })
