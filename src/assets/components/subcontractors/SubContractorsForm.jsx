import React, { useState } from "react";
import { setDocWithId } from "./api.js";
import { SUBCONTRACTORS } from "../../../db/collections.js";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import IconId from "../../ui/iconId.jsx";
import { BussinesIcon } from "../../icons/SvgIcons.jsx";
import { grey } from "@mui/material/colors";

const white = grey["A100"];

const SubContractorsForm = ({ onSendNewSub }) => {
  const [nif, setNif] = useState("");
  const [name, setName] = useState("");
  const [alias, setAlias] = useState("");
  const [nifError, setNifError] = useState("");

  // Expresión regular para validar NIF español (empresas y personas físicas)
  const nifRegex = /^([A-Z]\d{8}|\d{8}[A-Z])$/;

  const handleNifChange = (e) => {
    const value = e.target.value;
    setNif(value);
    if (!nifRegex.test(value)) {
      setNifError("El NIF debe tener el formato A12345678 o 12345678A");
    } else {
      setNifError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nifError) {
      alert("Por favor, corrige los errores antes de enviar.");
      return;
    }
    let docAdded = await setDocWithId(SUBCONTRACTORS, nif, {
      nif: nif,
      subName: name,
      subAlias: alias,
      isActive: true,
      workers: [],
    });
    if (docAdded.status === "ok") {
      alert("Subcontrata agregada con éxito");
      onSendNewSub(name);
      setNif("");
      setName("");
      setAlias("");
    } else {
      console.log("Error agregando Subcontrata: ", docAdded.error);
      alert("Hubo un error agregando la Subcontrata");
      setNif("");
      setName("");
    }
  };

  return (
    <div className="mt-12 relative border-gray-300 rounded w-1/2 min-w-96 p-6 shadow-md bg-white">
      <IconId>
        <BussinesIcon sx={{ color: white, fontSize: 30 }} />
      </IconId>
      <h5 className="pl-20 pb-8 -mt-2 text-2xl tracking-tight text-stone-500 font-light">
        Ingresar nueva subcontrata:
      </h5>
      <form onSubmit={handleSubmit}>
        <div className="pb-4">
          <TextField
            label="Nif"
            color="primary"
            variant="standard"
            type="text"
            id="nif"
            value={nif}
            onChange={handleNifChange}
            fullWidth
            required
            error={!!nifError}
            helperText={nifError}
          />
        </div>
        <div className="pb-4">
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
        <div className="pb-4">
          <TextField
            label="Alias"
            variant="standard"
            fullWidth
            type="text"
            id="alias"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            required
          />
        </div>

        <div className="text-stone-500 text-sm">*Requerido</div>
        <div className="flex items-center">
          <div className="min-w-20"></div>
          <div className="justify-end w-full flex">
            <Button variant="contained" type="submit">
              Agregar Subcontrata
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SubContractorsForm;
