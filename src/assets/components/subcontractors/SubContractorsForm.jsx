import React, { useState } from "react";
import { setDocWithId } from "../../../db/api.js";
import { SUBCONTRACTORS } from "../../../db/collections.js";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import IconId from "../../ui/iconId.jsx";
import { BussinesIcon } from "../../icons/SvgIcons.jsx";
import { grey } from "@mui/material/colors";

const white = grey["A100"];

const SubContractorsForm = () => {
  const [nif, setNif] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let docAdded = await setDocWithId(SUBCONTRACTORS, nif, {
      nif: nif,
      clientName: name,
    });
    if (docAdded.status === "ok") {
      setNif("");
      setName("");
      alert("Subcontrata agregada con éxito.");
      docAdded = "";
    } else {
      console.log("Error agregando cliente: ");
      alert("Hubo un error agregando el cliente Componente");
      setNif("");
      setName("");
    }
  };

  return (
    <div className=" relative border-gray-300 rounded w-1/2 min-w-96 p-6 shadow-md bg-white">
      <IconId>
        <BussinesIcon sx={{ color: white, fontSize:30 }} />
      </IconId>
      <h5 className="pl-20 pb-8 -mt-2 text-2xl tracking-tight text-stone-500 font-light">
        Ingresar nuevo subcontrata:
      </h5>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center pb-4">
          <TextField
            label="Nif"
            color="primary"
            variant="standard"
            type="text"
            id="nif"
            value={nif}
            onChange={(e) => setNif(e.target.value)}
            fullWidth
            required
          />
        </div>
        <div className="flex items-center pb-4">
          <TextField
            label="Nombre"
            variant="standard"
            fullWidth
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="text-stone-500">*Requerido</div>
        <div className="flex items-center">
          <div className="min-w-20"></div>
          <div className="justify-end w-full flex">
            <Button variant="contained" type="submit">
              Agregar Cliente
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SubContractorsForm;
