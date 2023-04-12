import {Assessment} from "../../types/Assessment"
import {Client} from "../../types/Client"
import {DataStoreSlice, DataStoreType} from "../../types/DataStore"

export class MissingEncryptionKeyError extends Error {
  constructor() {
    super()
    this.name = "missing encryption key"
  }
}

export class NotFoundError extends Error {
  constructor() {
    super()
    this.name = "not found"
  }
}

export class NotImplementedError extends Error {
  constructor() {
    super()
    this.name = "not implemented"
  }
}

const NoopStoreSlice = {
  add: () => {
    return Promise.reject(new NotImplementedError())
  },
  find: () => {
    return Promise.reject(new NotImplementedError())
  },
  list: () => {
    return Promise.reject(new NotImplementedError())
  },
  remove: () => {
    return Promise.reject(new NotImplementedError())
  },
  set: () => {
    return Promise.reject(new NotImplementedError())
  },
  change: () => {
    return Promise.reject(new NotImplementedError())
  },
}

export const NoopStore: DataStoreType = {
  assessments: NoopStoreSlice as DataStoreSlice<Assessment>,
  clients: NoopStoreSlice as DataStoreSlice<Client>,
}
