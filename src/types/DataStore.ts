import {Assessment} from "./Assessment"
import {Client} from "./Client"

export type DataStoreSlice<EntityType extends Assessment | Client> = {
  add: (...items: EntityType[]) => Promise<void>
  find: (id: string) => Promise<EntityType | undefined>
  list: () => Promise<EntityType[]>
  remove: (...items: EntityType[]) => Promise<void>
  set: (...items: EntityType[]) => Promise<void>
  change: (data: Partial<EntityType> & {id: string}) => Promise<void>
}

export type DataStoreType = {
  assessments: DataStoreSlice<Assessment>
  clients: DataStoreSlice<Client>
}
