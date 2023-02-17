import {i18n} from "@lingui/core"
import {I18nProvider} from "@lingui/react"
import {fireEvent, render, screen} from "@testing-library/react"
import {en} from "make-plural/plurals"
import {ReactNode} from "react"
import {act} from "react-dom/test-utils"
import {MemoryRouter} from "react-router-dom"
import {DataStoreContext, defaultSyncState} from "../../../contexts/DataStoreContext"
import {messages} from "../../../locales/en/messages"
import {dummyAssessment} from "../../../test/data/dummyAssessment"
import {renderForTest} from "../../../test/helpers"
import {DataStoreType} from "../../../types/DataStore"
import {InMemoryDataStore} from "../../api/InMemoryDataStore"
import {AssessmentsPage} from "./AssessmentsPage"

// @ts-ignore
global.IS_REACT_ACT_ENVIRONMENT = true

i18n.load({
  en: messages,
})
i18n.loadLocaleData({
  en: {plurals: en},
})

describe("Assessments page", () => {
  test("Should show title", async () => {
    await act(renderForTest(<AssessmentsPage />, {url: "/assessments?client_id=client1"}))
    expect(await screen.findByText("Assessments")).toBeInTheDocument()
  })

  test("Should show a list of assessments", async () => {
    const dataStore = new InMemoryDataStore(
      [
        {id: "client1", first: "Testor", middle: "T", last: "Testington"},
        {id: "client2", first: "Testina", middle: "A", last: "Testington"},
      ],
      [
        dummyAssessment({
          id: "assessment1",
          meta: {
            title: "Assessment #1",
            clientId: "client1",
          },
        }),
        dummyAssessment({
          id: "assessment2",
          meta: {
            title: "Assessment #2",
            clientId: "client2",
          },
        }),
      ],
    )
    await act(renderForTest(<AssessmentsPage />, {dataStore, url: "/assessments?client_id=client1"}))
    expect(screen.getByText("Assessment #1")).toBeInTheDocument()
    expect(screen.queryByText("Assessment #2")).not.toBeInTheDocument()
  })

  test("Should allow creating a new assessment", async () => {
    const dataStore = new InMemoryDataStore([{id: "client1", first: "Testor", middle: "T", last: "Testington"}])
    await act(renderForTest(<AssessmentsPage />, {dataStore, url: "/assessments?client_id=client1"}))

    expect(screen.queryByLabelText("Assessment row")).not.toBeInTheDocument()

    const newSessionButton = screen.getByText("New session")
    expect(newSessionButton).toBeInTheDocument()
    await act(async () => void fireEvent.click(newSessionButton))

    expect((await dataStore.assessments.list()).length).toEqual(1)
  })
})
