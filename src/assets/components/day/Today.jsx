import { useState, useEffect } from "react";
import NewSiteModal from "./newSiteModal/NewSiteModal";
import { Button, } from "@mui/material";
import { addSiteToClient } from "../clients/api";
import { addSiteToDailyEntry, getSitesFromDailyEntry } from "./api";
import { DAYS } from "../../../db/collections";
import { getCurrentDate } from "../../tools/dateTools";
import SiteList from "./table/SiteList";

const Today = () => {
  const [modalState, setModalState] = useState(false);
  const [sites, setSites] = useState([]);
  const date = getCurrentDate();

  const handleOpen = () => setModalState(true);
  const handleClose = () => setModalState(false);

  useEffect(() => {
    const fechSitesFromDB = async () => {
      const sitesFromDB = await getSitesFromDailyEntry(DAYS, date);
      setSites(sitesFromDB.sites)
    }

    fechSitesFromDB();

  }, [date])

  //esta funcion deberia 1 actualizar el estado global de la lista
  const handleAddSite = (client, site) => {

    const siteName = site.siteName; //extraemos del objeto solo el nombre del sitio

    addSiteToClient(client.id, site).then(() => {//agregamos el sitio nuevo al cliente en la BD
      //organizamos el array de sitios con el sitio nuevo,  alfabeticamnte por el nombre del cliente:
      const newSites = [...sites, { client, siteName }];

      const sortedNewSites = newSites.sort((a, b) =>
        a.client.clientName.localeCompare(b.client.clientName)
      );
      //Actualizamos el estado,  TODO: hacerlo global con Zustand
      setSites(sortedNewSites);
    }).then(() => {//agregamos el sitio nuevo al dia en la BD 
      addSiteToDailyEntry(DAYS, date, { client, siteName })
    })
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
      <SiteList data={sites} />

    </div>
  );
};

export default Today;
