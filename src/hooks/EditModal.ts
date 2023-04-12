import {useCallback} from "react"
import {Assessment} from "../types/Assessment"
import {Client} from "../types/Client"
import {DataStoreSlice} from "../types/DataStore"
import {useModal} from "./Modal"

export const useEditModal = <EntityType extends Assessment | Client>({
  dataStoreSlice,
  refresh,
}: {
  dataStoreSlice: DataStoreSlice<EntityType>
  refresh: () => Promise<void>
}) =>
  useModal({
    onConfirm: useCallback(
      async (initialData?: EntityType, editedData?: EntityType) => {
        if (editedData) {
          if (initialData) {
            await dataStoreSlice.change(editedData)
          } else {
            await dataStoreSlice.add(editedData)
          }
          await refresh()
        }
      },
      [dataStoreSlice, refresh],
    ),
  })
