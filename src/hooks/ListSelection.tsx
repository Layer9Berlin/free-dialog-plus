import {useCallback, useState} from "react"
import {Assessment} from "../types/Assessment"
import {Client} from "../types/Client"

export type ExportOrDeleteSelectionType = "none" | "export" | "delete"

export type ListSelection<EntityType extends Assessment | Client> = {
  selection: EntityType[]
  isSelected: (item: EntityType) => boolean
  toggle: (item: EntityType) => void
  none: () => void
  all: () => void
}

export const useListSelection = <EntityType extends Assessment | Client>({items}: {items: EntityType[]}) => {
  const [selection, setSelection] = useState<EntityType[]>([])
  const isSelected = useCallback((item: EntityType) => selection.some((_item) => _item.id === item.id), [selection])

  return {
    selection,
    isSelected,
    toggle: useCallback(
      (item: EntityType) => {
        setSelection((selection) => {
          if (isSelected(item)) {
            return selection.filter((_item) => _item.id !== item.id)
          } else {
            return [...selection, item]
          }
        })
      },
      [isSelected],
    ),
    none: () => {
      setSelection([])
    },
    all: useCallback(() => {
      setSelection(items)
    }, [items]),
  }
}
