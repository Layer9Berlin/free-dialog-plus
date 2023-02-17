import React, {useEffect, useState} from "react"
import {useLocation} from "react-router-dom"
import {Assessment} from "../../../../types/Assessment"
import {Client} from "../../../../types/Client"
import {DataStoreType} from "../../../../types/DataStore"

export const AssessmentsLoader = ({
  dataStore,
  setAssessments,
  setClient,
}: {
  dataStore: DataStoreType
  setAssessments: (assessments: Assessment[]) => void
  setClient: (client?: Client) => void
}) => {
  const location = useLocation()
  const [clientId, setClientId] = useState<string | undefined>(undefined)

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)

    const idFromLocation = searchParams.get("client_id")
    if (idFromLocation) {
      setClientId(idFromLocation)
      dataStore.clients.find(idFromLocation).then((client) => {
        setClient(client)
      })
    }
  }, [dataStore, location.search, setClient])

  useEffect(() => {
    dataStore.assessments
      .list()
      .then((assessments) => {
        setAssessments(
          assessments.filter((assessment) => !!assessment.meta.clientId && assessment.meta.clientId === clientId),
        )
      })
      .catch(() => setAssessments([]))
  }, [clientId, dataStore.assessments, setAssessments])

  return <></>
}
