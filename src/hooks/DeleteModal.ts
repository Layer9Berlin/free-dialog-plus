import {useCallback} from "react"
import {Assessment} from "../types/Assessment"
import {Client} from "../types/Client"
import {DataStoreSlice} from "../types/DataStore"
import {useModal} from "./Modal"

export const useDeleteModal = <EntityType extends Assessment | Client>({
  dataStoreSlice,
  refresh,
}: {
  dataStoreSlice: DataStoreSlice<EntityType>
  refresh: () => Promise<void>
}) =>
  useModal({
    onConfirm: useCallback(
      async (item: EntityType | undefined) => {
        if (item) {
          // now the clients themselves
          await dataStoreSlice.remove(item)
          await refresh()
        }
      },
      [dataStoreSlice, refresh],
    ),
  })
