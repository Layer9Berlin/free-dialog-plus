import {Assessment} from "./Assessment"
import {Client} from "./Client"

export type DataStoreSlice<EntityType extends Assessment | Client> = {
  add: (...items: Omit<EntityType, "id">[]) => Promise<EntityType[] | undefined>
  find: (id: string) => Promise<EntityType | undefined>
  list: () => Promise<EntityType[]>
  remove: (...items: EntityType[]) => Promise<boolean>
  replace: (...items: EntityType[]) => Promise<boolean>
}

export type DataStoreType = {
  assessments: DataStoreSlice<Assessment>
  clients: DataStoreSlice<Client>
}
