import {useCallback, useContext} from "react"
import {DataStoreContext} from "../contexts/DataStoreContext"
import {Client} from "../types/Client"
import {useModal} from "./Modal"

export const useDeleteClientModal = ({refresh}: {refresh: () => Promise<void>}) => {
  const dataStore = useContext(DataStoreContext)
  return useModal({
    onConfirm: useCallback(
      async (client: Client | undefined) => {
        if (client) {
          const allAssessments = await dataStore.assessments.list()
          const clientAssessments = allAssessments.filter((assessment) => assessment.meta?.clientId === client.id)
          await dataStore.assessments.remove(...clientAssessments)

          await dataStore.clients.remove(client)
          await refresh()
        }
      },
      [dataStore, refresh],
    ),
  })
}
