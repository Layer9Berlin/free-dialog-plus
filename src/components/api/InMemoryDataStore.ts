import {Assessment, DeletedRecord} from "../../types/Assessment"
import {Client} from "../../types/Client"
import {DataStoreSlice, DataStoreType} from "../../types/DataStore"

export class InMemoryDataStore implements DataStoreType {
  private _assessments: (Assessment | DeletedRecord)[] = []
  private _clients: (Client | DeletedRecord)[] = []

  constructor(clients: Client[] = [], assessments: Assessment[] = []) {
    this._assessments = assessments
    this._clients = clients
  }

  public assessments: DataStoreSlice<Assessment> = {
    add: async (assessment: Assessment) => {
      this._assessments.push(assessment)
    },
    find: async (id: string) => {
      const assessment = this._assessments.find((assessment) => assessment.id === id)
      return assessment && recordIsVisible(assessment) ? assessment : undefined
    },
    list: async () => [...this._assessments.filter(recordIsVisible)],
    remove: async (...assessmentsToBeRemoved: Assessment[]) => {
      const assessmentIdsToBeRemoved = assessmentsToBeRemoved.map((assessment) => assessment.id)
      this._assessments = this._assessments.map((assessment) =>
        assessmentIdsToBeRemoved.includes(assessment.id) ? {id: assessment.id, deletedAt: new Date()} : assessment,
      )
    },
    set: async (...assessments: Assessment[]) => {
      this._assessments = assessments
    },
    change: async (data: Partial<Assessment> & {id: string}) => {
      this._assessments = this._assessments.map((assessment) => {
        if (assessment.id !== data.id) {
          return assessment
        }
        return {...assessment, ...data}
      })
    },
  }

  public clients: DataStoreSlice<Client> = {
    add: async (client: Client) => {
      this._clients.push(client)
    },
    find: async (id: string) => {
      const client = this._clients.find((client) => client.id === id)
      return client && recordIsVisible(client) ? client : undefined
    },
    list: async () => [...this._clients.filter(recordIsVisible)],
    remove: async (...clientsToBeRemoved: Client[]) => {
      const clientIdsToBeRemoved = clientsToBeRemoved.map((assessment) => assessment.id)
      this._clients = this._clients.map((client) =>
        clientIdsToBeRemoved.includes(client.id) ? {id: client.id, deletedAt: new Date()} : client,
      )
    },
    set: async (...clients: Client[]) => {
      this._clients = clients
    },
    change: async (data: Partial<Client> & {id: string}) => {
      this._clients = this._clients.map((client) => {
        if (client.id !== data.id) {
          return client
        }
        return {...client, ...data}
      })
    },
  }
}

const recordIsVisible = <T extends Assessment | Client>(record: T | DeletedRecord): record is T => {
  return !("deletedAt" in record)
}
