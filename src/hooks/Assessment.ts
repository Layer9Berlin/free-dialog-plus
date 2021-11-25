import {useCallback, useEffect, useMemo, useState} from "react"
import {Assessment, MutableAssessment} from "../types/Assessment"
import {DataStoreType} from "../types/DataStore"

export const useMutableAssessment = ({
  dataStore,
  assessment,
}: {
  dataStore: DataStoreType
  assessment?: Assessment
}): MutableAssessment | undefined => {
  const [data, setData] = useState<Assessment | undefined>(undefined)
  useEffect(() => {
    setData(assessment)
  }, [assessment])

  const [assessments, setAssessments] = useState<Assessment[]>([])
  useEffect(() => {
    dataStore.assessments.list().then(setAssessments)
  }, [dataStore.assessments])

  const saveToLocalStorage = useCallback(
    (newData: Assessment) => {
      if (assessments.some((assessment) => assessment.id === newData.id)) {
        const newAssessments = assessments.map((assessment) => (assessment.id === newData.id ? newData : assessment))
        dataStore.assessments.replace(...newAssessments).then(() => {})
      } else {
        dataStore.assessments.replace(...assessments, newData).then(() => {})
      }
    },
    [assessments, dataStore.assessments],
  )

  const setSelected = useCallback(
    (questionIndex: number) => (selected: boolean) => {
      if (!data) {
        return
      }
      const newData = {
        ...data,
        questions: data.questions.map((question, index) =>
          index === questionIndex
            ? {
                ...question,
                state: {
                  ...question.state,
                  selected,
                },
              }
            : question,
        ),
        meta: {
          ...data.meta,
          lastUpdated: new Date(),
        },
      }
      setData(newData)
      saveToLocalStorage(newData)
    },
    [data, saveToLocalStorage],
  )

  const setCollapsed = (questionIndex: number) => (collapsed: boolean) => {
    setData((data) => {
      if (!data) {
        return undefined
      }
      const expandedQuestion = data.questions.find((question) => !question.state.collapsed)
      if (expandedQuestion) {
        // don't allow collapsing the currently expanded question if a rating has been provided
        // but the "further help" question has not been answered
        if (expandedQuestion.value.selectedOption !== undefined && expandedQuestion.value.furtherHelp === undefined) {
          return {
            ...data,
            questions: data.questions.map((question, index) => ({
              ...question,
              state: {
                ...question.state,
                highlighted: true,
              },
            })),
          }
        }
      }
      return {
        ...data,
        questions: data.questions.map((question, index) => ({
          ...question,
          state: {
            ...question.state,
            collapsed: index !== questionIndex || collapsed,
            highlighted: false,
          },
        })),
      }
    })
  }

  const setSelectedOption = useCallback(
    (questionIndex: number) => (selectedOption: number | undefined) => {
      if (!data) {
        return
      }
      const newData = {
        ...data,
        questions: data.questions.map((question, index) =>
          index === questionIndex
            ? {
                ...question,
                value: {
                  ...question.value,
                  selectedOption,
                },
              }
            : question,
        ),
        meta: {
          ...data.meta,
          lastUpdated: new Date(),
        },
      }
      setData(newData)
      saveToLocalStorage(newData)
    },
    [data, saveToLocalStorage],
  )

  const setFurtherHelp = useCallback(
    (questionIndex: number) => (furtherHelp: boolean | undefined) => {
      if (!data) {
        return
      }
      const newData = {
        ...data,
        questions: data.questions.map((question, index) =>
          index === questionIndex
            ? {
                ...question,
                value: {
                  ...question.value,
                  furtherHelp,
                },
                state: {
                  ...question.state,
                  highlighted: false,
                },
              }
            : question,
        ),
        meta: {
          ...data.meta,
          lastUpdated: new Date(),
        },
      }
      setData(newData)
      saveToLocalStorage(newData)
    },
    [data, saveToLocalStorage],
  )

  const setActionItems = useCallback(
    (questionIndex: number) => (actionItems: string[]) => {
      if (!data) {
        return
      }
      const newData = {
        ...data,
        questions: data.questions.map((question, index) =>
          index === questionIndex
            ? {
                ...question,
                value: {
                  ...question.value,
                  actionItems,
                },
              }
            : question,
        ),
        meta: {
          ...data.meta,
          lastUpdated: new Date(),
        },
      }
      setData(newData)
      saveToLocalStorage(newData)
    },
    [data, saveToLocalStorage],
  )

  return useMemo(() => {
    if (!data) {
      return undefined
    }
    return {
      ...data,
      questions: data.questions.map((question, questionIndex) => ({
        ...question,
        value: {
          ...question.value,
          setSelectedOption: setSelectedOption(questionIndex),
          setFurtherHelp: setFurtherHelp(questionIndex),
          setActionItems: setActionItems(questionIndex),
        },
        state: {
          ...question.state,
          setSelected: setSelected(questionIndex),
          setCollapsed: setCollapsed(questionIndex),
        },
      })),
      collapseAll: () => setCollapsed(0)(true),
    }
  }, [data, setActionItems, setFurtherHelp, setSelected, setSelectedOption])
}
