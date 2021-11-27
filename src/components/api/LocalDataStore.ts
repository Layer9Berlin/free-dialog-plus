import * as CryptoJS from "crypto-js"
import {localStorageAssessmentsKey, localStorageClientsKey} from "../../constants"
import {Assessment, LocalStorageAssessment} from "../../types/Assessment"
import {Client} from "../../types/Client"
import {DataStoreType} from "../../types/DataStore"
import {v4 as uuid} from "uuid"

export const localDataStore = (encryptionKey?: string): DataStoreType => ({
  assessments: {
    add: async (...assessments: Omit<Assessment, "id">[]) => {
      if (!encryptionKey) {
        return undefined
      }
      const newAssessments = assessments.map((assessment) => ({
        id: uuid(),
        ...assessment,
      }))
      saveAssessments([...loadAssessments(encryptionKey), ...newAssessments], encryptionKey)
      return newAssessments
    },
    find: async (id: string) => {
      if (!encryptionKey) {
        return undefined
      }
      return loadAssessments(encryptionKey).find((assessment) => assessment.id === id)
    },
    list: async () => {
      if (!encryptionKey) {
        return []
      }
      return loadAssessments(encryptionKey)
    },
    remove: async (...assessments: Assessment[]) => {
      if (!encryptionKey) {
        return false
      }
      const allIds = new Set(assessments.map((assessment) => assessment.id))
      saveAssessments(
        loadAssessments(encryptionKey).filter((assessment) => !allIds.has(assessment.id)),
        encryptionKey,
      )
      return true
    },
    replace: async (...items: Assessment[]) => {
      if (!encryptionKey) {
        return false
      }
      saveAssessments(items, encryptionKey)
      return true
    },
  },
  clients: {
    add: async (...clients: Omit<Client, "id">[]) => {
      if (!encryptionKey) {
        return undefined
      }
      const newClients = clients.map((client) => ({
        id: uuid(),
        ...client,
      }))
      saveClients([...loadClients(encryptionKey), ...newClients], encryptionKey)
      return newClients
    },
    find: async (id: string) => {
      if (!encryptionKey) {
        return undefined
      }
      return loadClients(encryptionKey).find((client) => client.id === id)
    },
    list: async () => {
      if (!encryptionKey) {
        return []
      }
      return loadClients(encryptionKey)
    },
    remove: async (...clients: Client[]) => {
      if (!encryptionKey) {
        return false
      }
      const allIds = new Set(clients.map((client) => client.id))
      saveClients(
        loadClients(encryptionKey).filter((client) => !allIds.has(client.id)),
        encryptionKey,
      )
      return true
    },
    replace: async (...items: Client[]) => {
      if (!encryptionKey) {
        return false
      }
      saveClients(items, encryptionKey)
      return true
    },
  },
})

export const saveAssessments = (assessments: Assessment[], encryptionKey: string) => {
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(assessments), encryptionKey)
  localStorage.setItem(localStorageAssessmentsKey, encryptedData.toString())
}

export const loadAssessments = (encryptionKey: string): Assessment[] => {
  const encryptedBytes = localStorage.getItem(localStorageAssessmentsKey)
  if (!encryptedBytes) {
    return []
  }
  const decryptedData = CryptoJS.AES.decrypt(encryptedBytes, encryptionKey)
  if (!decryptedData) {
    return []
  }
  try {
    const jsonData = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8))
    return (jsonData as LocalStorageAssessment[]).map((assessment) => ({
      ...assessment,
      meta: {
        ...assessment.meta,
        date: new Date(assessment.meta.date),
        lastUpdated: new Date(assessment.meta.lastUpdated),
      },
    }))
  } catch (err) {
    console.log(`Failed to parse assessments: ${err}`)
    return []
  }
}

export const saveClients = (clients: Client[], encryptionKey: string) => {
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(clients), encryptionKey)
  localStorage.setItem(localStorageClientsKey, encryptedData.toString())
}

export const loadClients = (encryptionKey: string): Client[] => {
  const encryptedBytes = localStorage.getItem(localStorageClientsKey)
  if (!encryptedBytes) {
    return []
  }
  const decryptedData = CryptoJS.AES.decrypt(encryptedBytes, encryptionKey)
  if (!decryptedData) {
    return []
  }
  try {
    const jsonData = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8))
    return jsonData as Client[]
  } catch (err) {
    console.log(`Failed to parse clients: ${err}`)
    return []
  }
}
