import * as localforage from "localforage"
import {localStorageDatabaseName} from "../../constants"
import {Assessment} from "../../types/Assessment"
import {Client} from "../../types/Client"
import {DataStoreSlice} from "../../types/DataStore"
import {NotFoundError} from "./DataStore"

export class LocalDataStore {
  public readonly saveKey: string
  private readonly assessmentsInstance: LocalForage
  private readonly clientsInstance: LocalForage

  constructor(saveKey: string = localStorageDatabaseName) {
    this.assessmentsInstance = localforage.createInstance({
      name: saveKey,
      storeName: "assessments",
      description: "DIALOG+ assessments data",
    })
    this.clientsInstance = localforage.createInstance({
      name: saveKey,
      storeName: "clients",
      description: "DIALOG+ clients data",
    })
    this.saveKey = saveKey
  }

  public static haveData = async (): Promise<boolean> => {
    return (
      (await localforage
        .createInstance({
          name: localStorageDatabaseName,
          storeName: "assessments",
          description: "DIALOG+ assessments data",
        })
        .length()) > 0
    )
  }

  get assessments(): DataStoreSlice<Assessment> {
    const database = this.assessmentsInstance
    if (!database) {
      return uninitializedOperations<Assessment>()
    }
    return databaseOperations<Assessment>(database)
  }

  get clients(): DataStoreSlice<Client> {
    const database = this.clientsInstance
    if (!database) {
      return uninitializedOperations<Client>()
    }
    return databaseOperations<Client>(database)
  }
}

const databaseOperations = <EntityType extends Assessment | Client>(database: LocalForage) => ({
  add: async (item: EntityType): Promise<void> => {
    await database.setItem(item.id, item)
  },
  find: async (id: string): Promise<EntityType> => {
    const result = await database.getItem<EntityType>(id)
    if (!result) {
      return Promise.reject(new NotFoundError())
    }
    return result
  },
  list: async (): Promise<EntityType[]> => {
    const result: EntityType[] = []
    await database.iterate<EntityType, void>((item, key) => {
      result.push(item)
    })
    return result
  },
  remove: async (...items: EntityType[]): Promise<void> => {
    for (const item of items) {
      await database.setItem(item.id, {id: item.id, deletedAt: new Date()})
    }
  },
  set: async (...items: EntityType[]): Promise<void> => {
    await database.clear()
    for (const item of items) {
      await database.setItem(item.id, item)
    }
  },
  change: async (item: Partial<EntityType> & {id: string}): Promise<void> => {
    await database.setItem(item.id, item)
  },
})

const uninitializedOperations = <T extends any>() => ({
  add: () => Promise.reject<void>(new Error("DB not initialized")),
  find: () => Promise.reject<T>(new Error("DB not initialized")),
  list: () => Promise.reject<T[]>(new Error("DB not initialized")),
  remove: () => Promise.reject<void>(new Error("DB not initialized")),
  set: () => Promise.reject<void>(new Error("DB not initialized")),
  change: () => Promise.reject<void>(new Error("DB not initialized")),
})
