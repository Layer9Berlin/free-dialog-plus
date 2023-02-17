import {SyncState} from "../../contexts/DataStoreContext"
import {DataStoreType} from "../../types/DataStore"

export type LoadState = {loaded: boolean; loggedIn?: boolean; hasAccount?: boolean}

export class CombinedDataStore implements DataStoreType {
  private layers: DataStoreType[] = []
  private changeCallback: (dataStore: CombinedDataStore) => void

  constructor(layers: DataStoreType[], changeCallback: (dataStore: CombinedDataStore) => void) {
    this.layers = layers
    this.changeCallback = changeCallback
  }

  public get state(): SyncState {
    return {text: "test", icon: "arrow-repeat", color: "danger"}
  }

  public get assessments() {
    return this.layers?.[0]?.assessments
  }

  public get clients() {
    return this.layers?.[0]?.clients
  }
}
