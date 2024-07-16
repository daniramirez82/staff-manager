import TableFrame from "../../ui/TableFrame";
import { useEffect, useState, useCallback } from "react";
import ClientsForm from "./ClientsForm";
import { getCollection, deleteWithId } from "../../../db/api";
import { CLIENTS } from "../../../db/collections";
import ClientRow from "./ClientsRow";

export const ClientList = () => {
  const [lastClient, setLastClient] = useState("");
  const [listClients, setListClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchingClients = async () => {
      try {
        const list = await getCollection(CLIENTS);
        setListClients(list);
        setIsLoading(false);
      } catch (e) {
        console.error("Error fetching clients", e);
        setIsLoading(false);
      }
    };
    fetchingClients();
  }, [lastClient]);

  // Memoizar deleteClient
  const deleteClient = useCallback(
    async (clientNif, collection) => {
      try {
        await deleteWithId(clientNif, collection);
        // Actualizar la lista de clientes después de la eliminación
        setLastClient((prev) => prev + 1);
      } catch (e) {
        console.error("Error deleting client", e);
      }
    },
    []
  );

  // Memoizar onDeleteAClient
  const onDeleteAClient = useCallback(
    (clientNif) => {
      setLastClient((prev) => prev + 1);
    },
    []
  );

  if (isLoading) {
    return (
      <div className="w-full h-full bg-stone-100 p-3 flex-col items-center justify-center">
        {" "}
        Cargando Clientes{" "}
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-stone-100 p-3 flex-col items-center justify-center">
      <ClientsForm onSendNewClient={setLastClient} />
      <TableFrame title={"Clientes"}>
        <ul>
          {listClients.map((client) => (
            <li key={client.id} datatype={client.id}>
              <ClientRow
                clientName={client.clientName}
                clientNif={client.nif}
                deleteClient={deleteClient}
                onDeleteAClient={onDeleteAClient}
              />
            </li>
          ))}
        </ul>
      </TableFrame>
    </div>
  );
};
