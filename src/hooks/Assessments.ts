import {useCallback, useEffect, useState} from "react"
import {Assessment} from "../types/Assessment"
import {DataStoreSlice} from "../types/DataStore"

export const useAssessments = ({
  clientId,
  dataStoreSlice,
}: {
  clientId: string | undefined
  dataStoreSlice: DataStoreSlice<Assessment>
}): {assessments: Assessment[]; refresh: () => Promise<void>} => {
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const refresh = useCallback(() => {
    if (!clientId) {
      setAssessments([])
      return Promise.resolve()
    }
    return dataStoreSlice
      .list()
      .then((assessments) => {
        setAssessments(assessments.filter((assessment) => assessment.meta.clientId === clientId))
      })
      .catch(() => setAssessments([]))
  }, [clientId, dataStoreSlice])
  useEffect(() => void refresh(), [refresh])
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
  (index: number, itemIndex: number, actionItem: string) =>
  (assessment: Assessment): Assessment => ({
    ...assessment,
    questions: assessment.questions.map((question, questionIndex) =>
      index === questionIndex
        ? {
            ...question,
            value: {
              ...question.value,
              actionItems: question.value.actionItems.map((oldItem, oldItemIndex) =>
                oldItemIndex === itemIndex ? actionItem : oldItem,
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
  (index: number, indexOfItemToBeDeleted: number) =>
  (assessment: Assessment): Assessment => ({
    ...assessment,
    questions: assessment.questions.map((question, questionIndex) =>
      index === questionIndex
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
  (index: number, newItem: string) =>
  (assessment: Assessment): Assessment => ({
    ...assessment,
    questions: assessment.questions.map((question, questionIndex) =>
      index === questionIndex
        ? {
            ...question,
            value: {
              ...question.value,
              actionItems: [...question.value.actionItems, newItem],
            },
          }
        : question,
    ),
    meta: {
      ...assessment.meta,
      lastUpdated: new Date(),
    },
  })
