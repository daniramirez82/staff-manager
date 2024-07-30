import TableFrame from "../../ui/TableFrame";
import { useEffect, useState, useCallback } from "react";
import SubContractorsForm from "./SubContractorsForm";
import { getCollection, deleteWithId } from "./api";
import { SUBCONTRACTORS } from "../../../db/collections";
import SubContractorsRow from "./SubContractorsRow";
import FirstRow from "../../ui/FirstRow";

export const SubContractorsMain = () => {
  const [lastSub, setLastSub] = useState(1);
  const [listSubs, setListSubs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSubs = async () => {
    try {
      const list = await getCollection(SUBCONTRACTORS);
      setListSubs(list);
      setIsLoading(false);
    } catch (e) {
      console.error("Error fetching subcontractors", e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubs();
  }, [lastSub]);

  const deleteSub = useCallback(async (subNif, collection) => {
    try {
      // Eliminar subcontratista de la lista localmente
      setListSubs((prevList) =>
        prevList.filter((sub) => sub.nif !== subNif)
      );

      // Llamar a la API para eliminar el cliente
      await deleteWithId(subNif, collection);

      // Actualizar la lista de clientes después de la eliminación
      setLastSub((prev) => prev + 1);
    } catch (e) {
      console.error("Error deleting subcontractor", e);
    }
  }, []);

  const reloadList = useCallback(() => {
    setLastSub((prev) => prev + 1);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full bg-stone-100 p-3 flex-col items-center justify-center">
        Cargando Subcontratistas
      </div>
    );
  }

  return (
    <div className="w-full p-3 gap-10 flex flex-col lg:flex-row items-center">
      <SubContractorsForm onSendNewSub={setLastSub} />
     <div className="w-3/4 lg:self-start lg:pt-14">
      <TableFrame title={"Subcontratistas"}>
        <ul>
        <li>
              <FirstRow table={"SubContrata"} />
            </li>
          {listSubs.map((sub) => (
            <li key={sub.id} datatype={sub.id}>
              <SubContractorsRow
                subName={sub.subName}
                subNif={sub.nif}
                isActive ={sub.isActive}
                deleteSub={deleteSub}
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
