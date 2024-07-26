import React from "react";
import { SUBCONTRACTORS } from "../../../db/collections";
import { useState } from "react";
import { Checkbox } from "@mui/material";
import { changeCheked } from "./api";
import { TrashIcon } from "../../icons/SvgIcons";

const SubContractorsRow = ({
  subName,
  subNif,
  isActive,
  deleteSub,
  onChange,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [checked, setChecked] = useState(isActive);

  const handleChecked = async (e) => {
    setChecked(e.target.checked);
    await changeCheked(subNif, SUBCONTRACTORS, e.target.checked);
    onChange();
  };

  const handleDelete = async () => {
    let deleting = confirm("¿Desea eliminar el cliente permanentemente?");

    if (deleting) {
      setIsDeleting(true);
      try {
        await deleteSub(subNif, SUBCONTRACTORS);
        onChange();
        setIsDeleting(false);
      } catch (error) {
        console.error("Error deleting subcontractor:", error);
        setIsDeleting(false);
        alert("hubo un error eliminando la subcontrata");
      }
      deleting=false;
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
          {subName && subName.charAt(0).toUpperCase()}
        </div>
      </div>
      <div className="w-9/12 flex-col pl-2">
        <div className="text-stone-700">{subName}</div>
        <div className="font-light text-sm text-stone-500">{subNif}</div>
      </div>
      {/* status */}
      <div className="w-1/12 flex justify-center items-center ">
        <Checkbox checked={checked} onChange={handleChecked} />
      </div>
      <div
        className="w-1/12 flex justify-center cursor-pointer items-center "
        onClick={handleDelete}>
        <TrashIcon />
      </div>
    </div>
  );
};

export default React.memo(SubContractorsRow);
