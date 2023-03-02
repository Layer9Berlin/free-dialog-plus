import {useContext, useEffect, useState} from "react"
import {DataStoreContext} from "../contexts/DataStoreContext"
import {Assessment} from "../types/Assessment"

export const useAssessment = (
  assessmentId?: string,
): {assessment: Assessment | undefined; change: (assessment: Assessment) => Promise<void>} => {
  const [assessment, setAssessment] = useState<Assessment | undefined>(undefined)
  const dataStore = useContext(DataStoreContext)
  useEffect(() => {
    if (!assessmentId) {
      setAssessment(undefined)
      return
    }
    dataStore.assessments
      .find(assessmentId)
      .then((assessment) => {
        setAssessment(assessment)
      })
      .catch(() => setAssessment(undefined))
  }, [assessmentId, dataStore.assessments])
  const change = async (assessment: Assessment) => {
    await dataStore.assessments.change(assessment)
    setAssessment(assessment)
  }
  return {assessment, change}
}
