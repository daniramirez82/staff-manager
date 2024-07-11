import TableFrame from "../../ui/TableFrame";
import ClientsForm from "./ClientsForm";
import { getCollection } from "../../../db/api";
import { CLIENTS } from "../../../db/collections";

getCollection(CLIENTS);

export const ClientList = () => {
  return (
    <div className="w-full h-full bg-stone-100 p-3 flex-col items-center justify-center">
      <ClientsForm />
      <TableFrame title={"Clientes"}></TableFrame>
    </div>
  );
};
