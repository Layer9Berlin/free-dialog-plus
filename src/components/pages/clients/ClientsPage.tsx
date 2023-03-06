import {useCallback, useContext, useState} from "react"
import {DataStoreContext} from "../../../contexts/DataStoreContext"
import {useClients} from "../../../hooks/Clients"
import {useDeleteClientModal} from "../../../hooks/DeleteClientModal"
import {useEditModal} from "../../../hooks/EditModal"
import {useAssessmentExporter} from "../../../hooks/Exporter"
import {useListSelection} from "../../../hooks/ListSelection"
import {useRerouter} from "../../../hooks/Rerouter"
import {Client} from "../../../types/Client"
import {PageLayout} from "../../layouts/PageLayout"
import {ClientDataModal} from "../../modals/ClientDataModal"
import {DeleteClientsModal} from "../../modals/DeleteClientsModal"
import {ExportPasswordModal, useExportPasswordModal} from "../../modals/ExportPasswordModal"
import {ClientRow} from "./partials/ClientRow"
import {ClientsFooter} from "./partials/ClientsFooter"
import {ClientsHeader} from "./partials/ClientsHeader"

export const ClientsPage = () => {
  const dataStore = useContext(DataStoreContext)
  const {clients, refresh} = useClients({dataStore})

  const exporter = useAssessmentExporter()
  const reroute = useRerouter()

  const [selectModeActive, setSelectModeActive] = useState<boolean>(false)
  const {
    selection,
    isSelected,
    all: selectAll,
    toggle: toggleSelection,
    none: selectNone,
  } = useListSelection<Client>({items: clients})
  const selectedAssessments = useCallback(async () => {
    const assessments = await dataStore.assessments.list()
    return assessments.filter((assessment) => selection.some((client) => client.id === assessment.meta.clientId))
  }, [dataStore.assessments, selection])

  const clientDataModal = useEditModal({
    dataStoreSlice: dataStore.clients,
    refresh,
  })

  const deleteClientsModal = useDeleteClientModal({refresh})
  const exportPasswordModal = useExportPasswordModal()

  return (
    <>
      <DeleteClientsModal {...deleteClientsModal.props} />
      <ClientDataModal {...clientDataModal.props} />
      <ExportPasswordModal {...exportPasswordModal.props} />

      <PageLayout
        header={
          <ClientsHeader
            isSelectingRows={selectModeActive}
            onCreateClient={() => clientDataModal.show(undefined)}
            stopSelectingRows={() => setSelectModeActive(false)}
          />
        }
        body={clients?.map((client) => (
          <ClientRow
            key={client.id}
            client={client}
            link={reroute?.link({page: `/assessments`, params: {client_id: client.id}}) ?? "/"}
            isSelected={isSelected(client)}
            onDeleteClicked={() => deleteClientsModal.show(client)}
            onEditClicked={() => clientDataModal.show(client)}
            onToggleSelected={() => toggleSelection(client)}
            selectModeActive={selectModeActive}
          />
        ))}
        footer={
          <ClientsFooter
            exportDisabled={clients.length === 0}
            onExport={async () => {
              if (selectModeActive) {
                await exporter.export(await selectedAssessments(), clients)
                selectNone()
                setSelectModeActive(false)
              } else {
                selectAll()
                setSelectModeActive(true)
              }
            }}
            onImport={async () => {}}
            exportSelectionModeActive={selectModeActive}
          />
        }
      />
    </>
  )
}
