import {i18n} from "@lingui/core"
import {I18nProvider} from "@lingui/react"
import {render} from "@testing-library/react"
import {ReactNode} from "react"
import {MemoryRouter} from "react-router-dom"
import {InMemoryDataStore} from "../components/api/InMemoryDataStore"
import {DataStoreContext, defaultSyncState} from "../contexts/DataStoreContext"
import {DataStoreType} from "../types/DataStore"

export const renderForTest =
  (node: ReactNode, {dataStore, url}: {dataStore?: DataStoreType; url?: string}) =>
  async () => {
    i18n.activate("en")
    render(
      <I18nProvider i18n={i18n}>
        <DataStoreContext.Provider
          value={{dataStore: dataStore ?? new InMemoryDataStore(), syncState: defaultSyncState}}
        >
          <MemoryRouter initialEntries={[url ?? "/"]}>{node}</MemoryRouter>
        </DataStoreContext.Provider>
      </I18nProvider>,
    )
  }
