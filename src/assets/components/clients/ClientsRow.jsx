import { CLIENTS } from "../../../db/collections";

const ClientRow = ({ clientName, clientNif, deleteClient }) => {
  return (
    <div className="w-full flex gap-2 py-2 border-t-2 border-stone-200">
      {/* avatar */}
      <div className="w-1/12 flex justify-center items-center">
        <div className="w-6 h-6 text-stone-200 rounded-full font-bold bg-blue-400 flex justify-center items-center">
          {clientName.charAt(0).toUpperCase()}
        </div>
      </div>
      <div className="w-9/12 flex-col pl-2">
        <div className="text-stone-700">{clientName}</div>
        <div className="font-light text-sm text-stone-500">{clientNif}</div>
      </div>
      {/* status */}
      <div className="w-1/12 flex justify-center items-center ">check</div>
      <div className="w-1/12 flex justify-center cursor-pointer items-center " onClick={()=>deleteClient(clientNif, CLIENTS)}>delte</div>
    </div>
  );
};

export default ClientRow;
