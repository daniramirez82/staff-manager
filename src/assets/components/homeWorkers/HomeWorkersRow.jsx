import React, { useState } from "react";
import { HOMEWORKERS } from "../../../db/collections";
import { Checkbox } from "@mui/material";
import { changeCheked } from "./api";
import { TrashIcon } from "../../icons/SvgIcons";

const HomeWorkerRow = ({
  workerName,
  workerDni,
  skills,
  isActive,
  deleteWorker,
  onChange,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [checked, setChecked] = useState(isActive);

  const handleChecked = async (e) => {
    setChecked(e.target.checked);
    await changeCheked(workerDni, HOMEWORKERS, e.target.checked);
    onChange();
  };

  const handleDelete = async () => {
    let deleting = confirm("¿Desea eliminar el trabajador permanentemente?");

    if (deleting) {
      setIsDeleting(true);
      try {
        await deleteWorker(workerDni, HOMEWORKERS);
        onChange();
        setIsDeleting(false);
      } catch (error) {
        console.error("Error deleting worker:", error);
        setIsDeleting(false);
        alert("hubo un error eliminando el trabajador");
      }
      deleting = false;
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
          {workerName && workerName.charAt(0).toUpperCase()}
        </div>
      </div>
      <div className="w-9/12 flex-col pl-2">
        <div className="text-stone-700">{workerName}</div>
        <div className="font-light text-sm text-stone-500">{workerDni}</div>
        <div>
          {skills && skills.map((skill, i) => (
            i === 0 ? (
              <span key={i}>{skill}</span>
            ) : (
              <span key={i}>-{skill}</span>
            )
          ))}
        </div>
      </div>
      <div className="w-1/12 flex justify-center items-center">
        <Checkbox checked={checked} onChange={handleChecked} />
      </div>
      <div
        className="w-1/12 flex justify-center cursor-pointer items-center"
        onClick={handleDelete}
      >
        <TrashIcon />
      </div>
    </div>
  );
};

export default React.memo(HomeWorkerRow);
