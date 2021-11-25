import {Trans} from "@lingui/macro"
import React, {MouseEventHandler, useCallback, useEffect, useState} from "react"
import {NavLink} from "react-router-dom"
import {useAssessmentExporter} from "../../../hooks/Exporter"
import {ExportOrDeleteSelectionType, useListSelection} from "../../../hooks/ListSelection"
import {useRerouter} from "../../../hooks/Rerouter"
import {Client} from "../../../types/Client"
import {DataStoreType} from "../../../types/DataStore"
import {DataStoreContext} from "../../api/DataStore"
import {Checkbox} from "../../buttons/Checkbox"
import {CloseButton} from "../../buttons/CloseButton"
import {ResponsiveButton} from "../../buttons/ResponsiveButton"
import {PersonIcon} from "../../icons/BootstrapIcons"
import {Footer} from "../../menu/Footer"
import {DeleteClientsModal} from "../../modals/DeleteClientsModal"
import {ExportPasswordModal, useExportPasswordModal} from "../../modals/ExportPasswordModal"
import {NewClientModal} from "../../modals/NewClientModal"
import {TitleText} from "../../text/TitleText"
import {LoginContext} from "../../app/LoginComponent"

const ClientsLoader = ({
  dataStore,
  setClients,
}: {
  dataStore: DataStoreType
  setClients: (clients: Client[]) => void
}) => {
  useEffect(() => {
    dataStore.clients.list().then((clients) => setClients(clients))
  }, [dataStore.clients, setClients])
  return <></>
}

const ClientRow = ({
  client,
  link,
  onClick,
  selectMode,
  isSelected,
}: {
  client: Client
  link: string
  onClick?: MouseEventHandler
  selectMode: ExportOrDeleteSelectionType
  isSelected?: boolean
}) => {
  return (
    <NavLink
      className={
        "p-3 border-bottom text-decoration-none overflow-hidden d-flex align-items-center" +
        (selectMode === "delete" ? " link-danger" : "")
      }
      to={link}
      onClick={onClick}
    >
      {selectMode === "none" && <PersonIcon className="me-2" />}
      {selectMode !== "none" && <Checkbox selected={isSelected ?? false} />}
      <span className="d-inline-block text-truncate">
        {[client.first, client.middle, client.last].filter((component) => component?.length).join(" ")}
      </span>
    </NavLink>
  )
}

export const ClientsPage = () => {
  const exporter = useAssessmentExporter()
  const reroute = useRerouter()

  const [clients, setClients] = useState<Client[]>([])

  const [selectMode, setSelectMode] = useState<ExportOrDeleteSelectionType>("none")
  const {
    selection,
    isSelected,
    toggle: toggleSelection,
    all: selectAll,
    none: selectNone,
  } = useListSelection<Client>({items: clients})
  const selectedAssessments = useCallback(
    async (dataStore: DataStoreType) => {
      const allAssessments = await dataStore.assessments.list()
      return allAssessments.filter((assessment) => selection.some((client) => client.id === assessment.meta.clientId))
    },
    [selection],
  )

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const closeDeleteModal = () => {
    setShowDeleteModal(false)
    setSelectMode("none")
  }
  const confirmDelete = (dataStore: DataStoreType) => async () => {
    closeDeleteModal()
    // need to delete all assessments belonging to the selected clients, too
    await dataStore.assessments.remove(...(await selectedAssessments(dataStore)))
    // now the clients themselves
    await dataStore.clients.remove(...selection)
    setClients(await dataStore.clients.list())
  }

  const [showNewClientModal, setShowNewClientModal] = useState(false)
  const closeNewClientModal = () => setShowNewClientModal(false)
  const confirmNewClient = (dataStore: DataStoreType) => async (clientData: Omit<Client, "id">) => {
    closeNewClientModal()
    const newClient = (await dataStore.clients.add(clientData))?.[0]
    if (newClient) {
      reroute.to({page: `/assessments`, params: {client_id: newClient.id}})
    }
  }

  const exportSelected = useCallback(
    async (dataStore: DataStoreType, password?: string) => {
      await exporter.export(await selectedAssessments(dataStore), clients, password)
      setSelectMode("none")
    },
    [clients, exporter, selectedAssessments],
  )

  const exportPasswordModal = useExportPasswordModal()

  return (
    <DataStoreContext.Consumer>
      {(dataStore) => (
        <>
          <ClientsLoader dataStore={dataStore} setClients={setClients} />

          <DeleteClientsModal
            show={showDeleteModal}
            close={closeDeleteModal}
            confirm={confirmDelete(dataStore)}
            count={selection.length}
          />
          <NewClientModal show={showNewClientModal} close={closeNewClientModal} confirm={confirmNewClient(dataStore)} />

          <div className="d-flex flex-column" style={{minHeight: "100vh"}}>
            <div className="d-flex justify-content-between align-items-center border-bottom border-muted h-64">
              <LoginContext.Consumer>
                {({logOut}) => (
                  <ResponsiveButton onClick={() => logOut?.()} icon="box-arrow-left" variant="danger" outline={true}>
                    <Trans>Log out</Trans>
                  </ResponsiveButton>
                )}
              </LoginContext.Consumer>
              <TitleText>
                <Trans>Clients</Trans>
              </TitleText>
              {selectMode === "none" && (
                <ResponsiveButton onClick={() => setShowNewClientModal(true)} icon="person-plus">
                  <Trans>New client</Trans>
                </ResponsiveButton>
              )}
              {selectMode !== "none" && <CloseButton onClick={() => setSelectMode("none")} />}
            </div>
            <div className="flex-grow-1 d-flex flex-column">
              {clients?.map((client, index) => (
                <ClientRow
                  key={index}
                  client={client}
                  link={reroute.link({page: `/assessments`, params: {client_id: client.id}})}
                  onClick={
                    selectMode !== "none"
                      ? (event) => {
                          toggleSelection(client)
                          event.preventDefault()
                        }
                      : undefined
                  }
                  isSelected={isSelected(client)}
                  selectMode={selectMode}
                />
              ))}
            </div>
            <ExportPasswordModal {...exportPasswordModal.props} />
            <Footer
              disabled={clients.length === 0}
              onImport={(file) => {
                exportPasswordModal.requestPasswordForImport((password) => {
                  if (password) {
                    exporter.import(file, password)
                  }
                })
              }}
              onExport={() => {
                exportPasswordModal.requestPasswordForExport((password) => {
                  if (password) {
                    exportSelected(dataStore, password)
                  }
                })
              }}
              onDelete={() => setShowDeleteModal(true)}
              selectMode={selectMode}
              setSelectMode={(newSelectMode: ExportOrDeleteSelectionType) => {
                switch (newSelectMode) {
                  case "export": {
                    selectAll()
                    break
                  }
                  case "delete": {
                    selectNone()
                    break
                  }
                }
                setSelectMode(newSelectMode)
              }}
            />
          </div>
        </>
      )}
    </DataStoreContext.Consumer>
  )
}
