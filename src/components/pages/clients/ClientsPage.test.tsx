import {i18n} from "@lingui/core"
import {fireEvent, screen, within} from "@testing-library/react"
import {en} from "make-plural/plurals"
import {act} from "react-dom/test-utils"
import {Route, Routes} from "react-router-dom"
import {messages} from "../../../locales/en/messages"
import {renderForTest} from "../../../test/helpers"
import {InMemoryDataStore} from "../../api/InMemoryDataStore"
import {ClientsPage} from "./ClientsPage"

// @ts-ignore
global.IS_REACT_ACT_ENVIRONMENT = true

i18n.load({
  en: messages,
})
i18n.loadLocaleData({
  en: {plurals: en},
})

describe("Clients page", () => {
  test("Should show title", async () => {
    await act(renderForTest(<ClientsPage />, {url: "/clients"}))
    expect(await screen.findByText("Clients")).toBeInTheDocument()
  })

  test("Should show list of clients", async () => {
    const dataStore = new InMemoryDataStore([
      {id: "test1", first: "Testor", middle: "T", last: "Testington"},
      {id: "test2", first: "Testina", middle: "A", last: "Testington"},
    ])
    await act(renderForTest(<ClientsPage />, {dataStore, url: "/clients"}))
    expect(await screen.findByText("Testor T Testington")).toBeInTheDocument()
    expect(await screen.findByText("Testina A Testington")).toBeInTheDocument()
  })

  test("Should show newly created client", async () => {
    const dataStore = new InMemoryDataStore([{id: "test1", first: "Testor", middle: "T", last: "Testington"}])
    await act(renderForTest(<ClientsPage />, {dataStore, url: "/clients"}))
    expect(screen.getByText("Testor T Testington")).toBeInTheDocument()
    expect(screen.queryByText("Testina A Testington")).not.toBeInTheDocument()

    const newClientButton = screen.getByText("New client")
    expect(newClientButton).toBeInTheDocument()
    await act(async () => void fireEvent.click(newClientButton))

    const modal = await screen.findByRole("dialog")
    expect(modal).toBeInTheDocument()

    const firstNameInput: HTMLInputElement = within(modal).getByLabelText("First name")
    expect(firstNameInput).toBeInTheDocument()
    firstNameInput.value = "Testina"

    const middleNameInput: HTMLInputElement = within(modal).getByLabelText("Middle name")
    expect(middleNameInput).toBeInTheDocument()
    middleNameInput.value = "A"

    const lastNameInput: HTMLInputElement = within(modal).getByLabelText("Last name")
    expect(lastNameInput).toBeInTheDocument()
    lastNameInput.value = "Testington"

    const confirmCreateButton = within(modal).getByText("Create")
    expect(confirmCreateButton).toBeInTheDocument()
    await act(() => void fireEvent.click(confirmCreateButton))

    expect(screen.getByText("Testor T Testington")).toBeInTheDocument()
    expect(screen.getByText("Testina A Testington")).toBeInTheDocument()
  })

  test("Should reflect client edits", async () => {
    const dataStore = new InMemoryDataStore([{id: "test1", first: "Testor", middle: "T", last: "Testington"}])
    await act(renderForTest(<ClientsPage />, {dataStore, url: "/clients"}))

    expect(screen.queryByText("Testina A Testington")).toBeNull()

    const editRowButton = screen.getByLabelText("Edit row")
    expect(editRowButton).toBeInTheDocument()
    await act(() => void fireEvent.click(editRowButton))

    const modal = await screen.findByRole("dialog")
    expect(modal).toBeInTheDocument()

    const firstNameInput: HTMLInputElement = within(modal).getByLabelText("First name")
    expect(firstNameInput).toBeInTheDocument()
    firstNameInput.value = "Testina"

    const middleNameInput: HTMLInputElement = within(modal).getByLabelText("Middle name")
    expect(middleNameInput).toBeInTheDocument()
    middleNameInput.value = "A"

    const lastNameInput: HTMLInputElement = within(modal).getByLabelText("Last name")
    expect(lastNameInput).toBeInTheDocument()
    lastNameInput.value = "Testington"

    const confirmEditButton = within(modal).getByText("Edit")
    expect(confirmEditButton).toBeInTheDocument()
    await act(() => void fireEvent.click(confirmEditButton))

    expect(await screen.findByText("Testina A Testington")).toBeInTheDocument()
  })

  test("Should remove deleted client", async () => {
    const dataStore = new InMemoryDataStore([
      {id: "test1", first: "Testor", middle: "T", last: "Testington"},
      {id: "test2", first: "Testina", middle: "A", last: "Testington"},
    ])
    await act(renderForTest(<ClientsPage />, {dataStore, url: "/clients"}))

    expect(screen.getByText("Testor T Testington")).toBeInTheDocument()
    expect(screen.getByText("Testina A Testington")).toBeInTheDocument()

    const deleteRowButton = screen.getAllByLabelText("Delete row")?.[1]
    expect(deleteRowButton).toBeInTheDocument()
    await act(() => void fireEvent.click(deleteRowButton))

    const modal = await screen.findByRole("dialog")
    expect(modal).toBeInTheDocument()

    const confirmDeleteButton = within(modal).getByText("Delete")
    expect(confirmDeleteButton).toBeInTheDocument()
    await act(() => void fireEvent.click(confirmDeleteButton))

    expect(screen.getByText("Testor T Testington")).toBeInTheDocument()
    expect(screen.queryByText("Testina A Testington")).not.toBeInTheDocument()
  })

  test("Should continue to show client when delete is cancelled", async () => {
    const dataStore = new InMemoryDataStore([
      {id: "test1", first: "Testor", middle: "T", last: "Testington"},
      {id: "test2", first: "Testina", middle: "A", last: "Testington"},
    ])
    await act(renderForTest(<ClientsPage />, {dataStore, url: "/clients"}))

    expect(screen.getByText("Testor T Testington")).toBeInTheDocument()
    expect(screen.getByText("Testina A Testington")).toBeInTheDocument()

    const deleteRowButton = screen.getAllByLabelText("Delete row")?.[1]
    expect(deleteRowButton).toBeInTheDocument()
    await act(() => void fireEvent.click(deleteRowButton))

    const modal = await screen.findByRole("dialog")
    expect(modal).toBeInTheDocument()

    const cancelDeleteButton = within(modal).getByText("Cancel")
    expect(cancelDeleteButton).toBeInTheDocument()
    await act(() => void fireEvent.click(cancelDeleteButton))

    expect(screen.getByText("Testor T Testington")).toBeInTheDocument()
    expect(screen.getByText("Testina A Testington")).toBeInTheDocument()
  })

  test("Should continue to show client when delete modal is closed", async () => {
    const dataStore = new InMemoryDataStore([
      {id: "test1", first: "Testor", middle: "T", last: "Testington"},
      {id: "test2", first: "Testina", middle: "A", last: "Testington"},
    ])
    await act(renderForTest(<ClientsPage />, {dataStore, url: "/clients"}))

    expect(screen.getByText("Testor T Testington")).toBeInTheDocument()
    expect(screen.getByText("Testina A Testington")).toBeInTheDocument()

    const deleteRowButton = screen.getAllByLabelText("Delete row")?.[1]
    expect(deleteRowButton).toBeInTheDocument()
    await act(() => void fireEvent.click(deleteRowButton))

    const modal = await screen.findByRole("dialog")
    expect(modal).toBeInTheDocument()

    const closeModalButton = within(modal).getByLabelText("Close")
    expect(closeModalButton).toBeInTheDocument()
    await act(() => void fireEvent.click(closeModalButton))

    expect(screen.getByText("Testor T Testington")).toBeInTheDocument()
    expect(screen.getByText("Testina A Testington")).toBeInTheDocument()
  })

  test("Should navigate to assessments page", async () => {
    const dataStore = new InMemoryDataStore([
      {id: "test1", first: "Testor", middle: "T", last: "Testington"},
      {id: "test2", first: "Testina", middle: "A", last: "Testington"},
    ])
    await act(
      renderForTest(
        <Routes>
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/assessments" element={<h1>Assessments</h1>} />
        </Routes>,
        {dataStore, url: "/clients"},
      ),
    )

    expect(screen.getByText("Testor T Testington")).toBeInTheDocument()
    expect(screen.getByText("Testina A Testington")).toBeInTheDocument()

    const clientRow = screen.getAllByLabelText("Client row")?.[0]
    expect(clientRow).toBeInTheDocument()
    await act(() => void fireEvent.click(clientRow))

    expect(await screen.findByText("Assessments")).toBeInTheDocument()
  })
})
