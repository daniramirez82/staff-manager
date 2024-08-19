import { useState, useEffect } from "react";
import NewSiteModal from "./newSiteModal/NewSiteModal";
import { Button, } from "@mui/material";
import { addSiteToClient } from "../clients/api";
import { addSiteToDailyEntry, getSitesFromDailyEntry } from "./api";
import { DAYS, HOMEWORKERS } from "../../../db/collections";
import { getCurrentDate } from "../../tools/dateTools";
import SiteList from "./table/SiteList";
import { useSitesStore, useWorkersStore } from "../../stores/dayStore";
import { genUniqueId } from "../../tools/ids";
import { getCollection } from "../homeWorkers/api";
import WorkersTable from "./wokersTables/WorkersTable";

const Today = () => {
  const [modalState, setModalState] = useState(false);
  const { addSite } = useSitesStore.getState();
  const sitesFromStore = useSitesStore((state) => state.sites);
  const addSites = useSitesStore((state) => state.addSites);
  const addAvailableHomeWorker = useWorkersStore((state) => state.addAvailableHomeWorker);

  const date = getCurrentDate();

  const handleOpen = () => setModalState(true);
  const handleClose = () => setModalState(false);

  console.log("actual sites en el Store",sitesFromStore)

  useEffect(() => {
    //alcanza todos los sitios ya guardados en la BD con el dia de hoy y los actualiza en el estado global
    const fechSitesFromDB = async () => {
      const sitesFromDB = await getSitesFromDailyEntry(DAYS, date);
      addSites(sitesFromDB.sites)
    }
    fechSitesFromDB();

    //alcanza todos los trabajadores disponibles en el día 
    const fechAvailableWorkers = async () => {
      const availableHomeWorkers = await getCollection(HOMEWORKERS) //alcanzo todos los trabajadores de casa desde la BD
      addAvailableHomeWorker(availableHomeWorkers); //agrego los trabajadores de casa disponibles al estado global
      console.log("en today se agrega al estado global los trabajadores disponibles", availableHomeWorkers);
    }
    fechAvailableWorkers();


  }, [date])

  //agregar un sitio nuevo al estado global y a la BD, 
  const handleAddSite = async (client, site) => {
    try {
      const siteName = site.siteName; // Extraemos el nombre del sitio
      const siteDayId = genUniqueId();

      //Aqui estructuramos el objeto Site para un dia especifico
      //el type lo asingamos MV por defecto.
      const newSite = { siteDayId, client, siteName, types: ["MV"] };

      // Agregamos el sitio al cliente en la BD
      await addSiteToClient(client.id, site);

      // Actualizamos el estado local con la lista de sitios ordenada
      addSite(newSite);

      // Agregamos el sitio nuevo al documento del día en la BD
      await addSiteToDailyEntry(DAYS, date, newSite);

    } catch (error) {
      console.error("Error adding site:", error);
      alert("Hubo un error al agregar el sitio.");
    }
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
      <div className="flex">
        <div className="w-2/3">

        <SiteList data={sitesFromStore} day={date} />
        </div>
        <div className="w-1/3">

        <WorkersTable />
        </div>
      </div>

    </div>
  );
};

export default Today;
