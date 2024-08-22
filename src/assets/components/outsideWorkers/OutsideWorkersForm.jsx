import React, { useEffect, useState } from "react";
import { getCollection, setDocWithId } from "./api.js";
import { OUTSIDEWORKERS, SUBCONTRACTORS } from "../../../db/collections.js";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import IconId from "../../ui/iconId.jsx";
import { BussinesIcon } from "../../icons/SvgIcons.jsx"; //todo cambiar el icono por uno referente a trabajadores propios
import { grey } from "@mui/material/colors";
import SubContracAutoComplete from "./subContractorsAutoComp.jsx";
import { capitalize } from "../../tools/capitalize.js";

const white = grey["A100"];

const OutsideWorkersForm = ({ onSendNewWorker }) => {
  

  const [dni, setDni] = useState("");
  const [name, setName] = useState("");
  const [alias, setAlias] = useState("");
  const [company, setCompany] = useState("");
  const [dniError, setDniError] = useState("");

  // Expresión regular para validar nie y dni español (personas físicas nacionales y extrajeros)
  const dniRegex = /^[XYZ]?\d{7,8}[A-Z]$/;

  const handleDniChange = (e) => {
    const value = e.target.value;
    setDni(value);
    if (!dniRegex.test(value)) {
      setDniError("El NIF debe tener el formato Y1234567R o 12345678A");
    } else {
      setDniError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dniError) {
      alert("Por favor, corrige los errores antes de enviar.");
      return;
    }
    let docAdded = await setDocWithId(OUTSIDEWORKERS, dni, {
      dni: dni,
      workerName: capitalize(name),
      workerAlias: capitalize(alias),
      isActive: true,
      currentSite: {},
      lastSites: [],
      company: company,
    });
    if (docAdded.status === "ok") {
      alert("Trabajdor agregado con éxito");
      onSendNewWorker(name);
      setDni("");
      setName("");
      setAlias("");
      setCompany("");
    } else {
      console.log("Error agregando trabajador: ", docAdded.error);
      alert("Hubo un error agregando el trabajador, intentelo mas tarde");
      setDni("");
      setName("");
      setAlias("");
      setCompany("");
    }
  };

  return (
    <div className="mt-12 relative border-gray-300 rounded w-1/2 min-w-96 p-6 shadow-md bg-white">
      <IconId>
        <BussinesIcon sx={{ color: white, fontSize: 30 }} />
      </IconId>
      <h5 className="pl-20 pb-8 -mt-2 text-2xl tracking-tight text-stone-500 font-light">
        Ingresar nuevo Trabajador Ajeno:
      </h5>
      <form onSubmit={handleSubmit}>
        <div className="pb-4">
          <TextField
            label="Dni"
            color="primary"
            variant="standard"
            type="text"
            id="dni"
            value={dni}
            onChange={handleDniChange}
            fullWidth
            required
            error={!!dniError}
            helperText={dniError}
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
        <div className ="pb-4">
          <SubContracAutoComplete setCompany={setCompany}/>
        </div>

        <div className="text-stone-500 text-sm">*Requerido</div>
        <div className="flex items-center">
          <div className="min-w-20"></div>
          <div className="justify-end w-full flex">
            <Button variant="contained" type="submit">
              Agregar Trabajador
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OutsideWorkersForm;
