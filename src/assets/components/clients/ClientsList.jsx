import TableFrame from "../../ui/TableFrame";
import { useEffect, useState, useCallback } from "react";
import ClientsForm from "./ClientsForm";
import { getCollection, deleteWithId } from "../../../db/api";
import { CLIENTS } from "../../../db/collections";
import ClientRow from "./ClientsRow";

export const ClientList = () => {
  const [lastClient, setLastClient] = useState(1);
  const [listClients, setListClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchClients = async () => {
    try {
      const list = await getCollection(CLIENTS);
      setListClients(list);
      setIsLoading(false);
    } catch (e) {
      console.error("Error fetching clients", e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [lastClient]);

  const deleteClient = useCallback(async (clientNif, collection) => {
    try {
      // Eliminar cliente de la lista localmente
      setListClients((prevList) =>
        prevList.filter((client) => client.nif !== clientNif)
      );

      // Llamar a la API para eliminar el cliente
      await deleteWithId(clientNif, collection);

      // Actualizar la lista de clientes después de la eliminación
      setLastClient((prev) => prev + 1);
    } catch (e) {
      console.error("Error deleting client", e);
    }
  }, []);

  const reloadList = useCallback(() => {
    setLastClient((prev) => prev + 1);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full bg-stone-100 p-3 flex-col items-center justify-center">
        Cargando Clientes
      </div>
    );
  }

  return (
    <div className="w-full bg-pink-600 p-3 gap-10 flex flex-col items-center">
      <ClientsForm onSendNewClient={setLastClient} />
     <div className="w-3/4">
      <TableFrame title={"Clientes"}>
        <ul>
          {listClients.map((client) => (
            <li key={client.id} datatype={client.id}>
              <ClientRow
                clientName={client.clientName}
                clientNif={client.nif}
                isActive ={client.isActive}
                deleteClient={deleteClient}
                onChange={reloadList}
              />
            </li>
          ))}
        </ul>
      </TableFrame>
      </div>
    </div>
  );
};
