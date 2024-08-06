import { useState } from "react";
import NewSiteModal from "./newSiteModal/NewSiteModal";
import { Button, } from "@mui/material";
import { addSiteToClient } from "../clients/api";
import { setDocWithId } from "./api";
import { DAYS } from "../../../db/collections";
import { getCurrentDate } from "../../tools/dateTools";

const Today = () => {
  const [modalState, setModalState] = useState(false);
  const [sites, setSites] = useState([]);
  const date = getCurrentDate();

  const handleOpen = () => setModalState(true);
  const handleClose = () => setModalState(false);

  console.log("sites en Today: " , sites)

  //esta funcion deberia 1 actualizar el estado global de la lista
  const handleAddSite = (client, siteName) => {
    
    addSiteToClient(client.id, siteName).then(()=>{
      setSites([...sites, {client, siteName}]); 
    }).then(()=> setDocWithId(DAYS, date, {client, siteName}))
    console.log("sites en today ",sites)
  };

  return (
    <div className="p-6">
      <Button variant="contained" color="primary" onClick={handleOpen}>
        + Agregar nueva obra
      </Button>
      <NewSiteModal
        open={modalState}
        handleClose={handleClose}
        handleAddSite={handleAddSite}
      />
     

    </div>
  );
};

export default Today;
