// ClientRow.js
import React from "react";
import { CLIENTS } from "../../../db/collections";
import { useState } from "react";
import { Checkbox } from "@mui/material";
import { changeCheked } from "./api";

const ClientRow = ({
  clientName,
  clientNif,
  isActive,
  deleteClient,
  onChange,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [checked, setChecked] = useState(isActive);

  const handleChecked = async (e) => {
    setChecked(e.target.checked);
    await changeCheked(clientNif, CLIENTS, e.target.checked);
    onChange();
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteClient(clientNif, CLIENTS);
      onChange();
      setIsDeleting(false);
    } catch (error) {
      console.error("Error deleting client:", error);
      setIsDeleting(false);
      alert("hubo un error eliminando el cliente");
    }
  };

  if (isDeleting) {
    return <div>Borrando</div>;
  }

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
      <div className="w-1/12 flex justify-center items-center ">
        <Checkbox checked={checked}  onChange={handleChecked} />
      </div>
      <div
        className="w-1/12 flex justify-center cursor-pointer items-center "
        onClick={handleDelete}>
        delete
      </div>
    </div>
  );
};

export default React.memo(ClientRow);
