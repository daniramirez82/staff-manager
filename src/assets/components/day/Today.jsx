import { useState } from "react";
import NewSiteModal from "./newSiteModal/NewSiteModal";
import { Button, } from "@mui/material";
import { addSiteToClient } from "../clients/api";
import { addSiteToDailyEntry } from "./api";
import { DAYS } from "../../../db/collections";
import { getCurrentDate } from "../../tools/dateTools";
import SiteList from "./table/SiteList";

const Today = () => {
  const [modalState, setModalState] = useState(false);
  const [sites, setSites] = useState([]);
  const date = getCurrentDate();

  const handleOpen = () => setModalState(true);
  const handleClose = () => setModalState(false);


  //esta funcion deberia 1 actualizar el estado global de la lista
  const handleAddSite = (client, site) => {
    
    addSiteToClient(client.id, site).then(()=>{//agregamos el sitio nuevo al cliente
      setSites([...sites, {client, site}]); //Actualizamos el estado TODO: hacerlo global con Zustand
    }).then(()=> {//agregamos el sitio nuevo al dia 
      const siteName = site.siteName;     
      addSiteToDailyEntry(DAYS, date, {client, siteName})})
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
     <SiteList data={sites}/>

    </div>
  );
};

export default Today;
