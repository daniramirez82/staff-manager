import React, { useState } from "react";
import { setDocWithId } from "../../../db/api.js";
import { CLIENTS } from "../../../db/collections.js";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import IconId from "../../ui/iconId.jsx";
import { BussinesIcon } from "../../icons/SvgIcons.jsx";
import { grey } from "@mui/material/colors";

const white = grey["A100"];

const ClientForm = ({ onSendNewClient }) => {
  const [nif, setNif] = useState("");
  const [name, setName] = useState("");
  const [nifError, setNifError] = useState("");

  // Expresión regular para validar NIF español (empieza con una letra y seguido de 8 dígitos)
  const nifRegex = /^[A-Z]\d{8}$/;

  const handleNifChange = (e) => {
    const value = e.target.value;
    setNif(value);
    if (!nifRegex.test(value)) {
      setNifError("El NIF debe tener el formato A12345678");
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
    let docAdded = await setDocWithId(CLIENTS, nif, {
      nif: nif,
      clientName: name,
    });
    if (docAdded.status === "ok") {
      alert("Cliente agregado con éxito");
      onSendNewClient(name);
      setNif("");
      setName("");
    } else {
      console.log("Error agregando cliente: ", docAdded.error);
      alert("Hubo un error agregando el cliente");
      setNif("");
      setName("");
    }
  };

  return (
    <div className="relative border-gray-300 rounded w-1/2 min-w-96 p-6 shadow-md bg-white">
      <IconId>
        <BussinesIcon sx={{ color: white, fontSize: 30 }} />
      </IconId>
      <h5 className="pl-20 pb-8 -mt-2 text-2xl tracking-tight text-stone-500 font-light">
        Ingresar nuevo cliente:
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
            onChange={handleNifChange}
            fullWidth
            required
            error={!!nifError}
            helperText={nifError}
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

export default ClientForm;
