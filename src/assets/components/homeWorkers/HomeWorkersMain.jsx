import TableFrame from "../../ui/TableFrame";
import { useEffect, useState, useCallback } from "react";
import HomeWorkersForm from "./HomeWorkersForm";
import { getCollection, deleteWithId } from "./api";
import { HOMEWORKERS } from "../../../db/collections";
import HomeWorkersRow from "./HomeWorkersRow";
import FirstRow from "../../ui/FirstRow";

export const HomeWorkersMain = () => {
  const [lastWorker, setLastWorker] = useState(1);
  const [listWorkers, setListWorkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWorkers = async () => {
    try {
      const list = await getCollection(HOMEWORKERS);
      setListWorkers(list);
      setIsLoading(false);
    } catch (e) {
      console.error("Error fetching home workers", e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, [lastWorker]);

  const deleteWorker = useCallback(async (workerDni, collection) => {
    try {
      // Eliminar trabajador de la lista localmente
      setListWorkers((prevList) =>
        prevList.filter((worker) => worker.dni !== workerDni)
      );

      // Llamar a la API para eliminar el trabajador
      await deleteWithId(workerDni, collection);

      // Actualizar la lista de clientes después de la eliminación
      setLastWorker((prev) => prev + 1);
    } catch (e) {
      console.error("Error deleting worker", e);
    }
  }, []);

  const reloadList = useCallback(() => {
    setLastWorker((prev) => prev + 1);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full bg-stone-100 p-3 flex-col items-center justify-center">
        Cargando Trabajadores Propios
      </div>
    );
  }

  return (
    <div className="w-full p-3 gap-10 flex flex-col lg:flex-row items-center">
      <HomeWorkersForm onSendNewWorker={setLastWorker} />
     <div className="w-3/4 lg:self-start lg:pt-14">
      <TableFrame title={"Trabajadores Propios"}>
        <ul>
        <li>
              <FirstRow table={"Trabajador"} />
            </li>
          {listWorkers.map((worker) => (
            <li key={worker.id} datatype={worker.id}>
              <HomeWorkersRow
                workerName={worker.workerName}
                workerDni={worker.dni}
                isActive ={worker.isActive}
                deleteWorker={deleteWorker}
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
