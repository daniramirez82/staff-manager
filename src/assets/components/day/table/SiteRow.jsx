import PropTypes from "prop-types";
import TypeSelectModal from "./TypeSelectModal";
import { useEffect, useState } from "react";
import {
  handleAddWorkersToSite,
  useSitesStore,
  useWorkersStore,
} from "../../../stores/dayStore";
import {
  addSiteToDailyEntry,
  editTypeSite,
  saveAvailableWorkers,
} from "../api";
import { DAYS, HOMEWORKERS } from "../../../../db/collections";
import HomeWorkersCell from "./homeWorkersCell/HomeWorkersCell";
import OutsideWorkersCell from "./outsideWorkersCell/OutsideWorkersCell";

const SiteRow = ({ i, day, siteDayId, client, site, types }) => {
  const [open, setOpen] = useState(false);
  const [homeWorkers, setHomeWorkers] = useState([]); 
  const [outsideWorkers, setOutsideWorkers] = useState([]); 

  const addSiteTypes = useSitesStore((state) => state.editSiteType);
  const updateAvailableHomeWorkers = useWorkersStore(
    (state) => state.updateAvailableHomeWorkers
  );
  const updateAvailableOutsideWorkers = useWorkersStore(
    (state) => state.updateAvailableOutsideWorkers
  );
  const availableHomeWorkers = useWorkersStore(
    (state) => state.availableHomeWorkers
  );
  const availableOutsideWorkers = useWorkersStore(
    (state) => state.availableOutsideWorkers
  );

  console.log("Trabajadores en el store Home",availableHomeWorkers);

  useEffect(() => {
    const filteredHomeWorkers = availableHomeWorkers.filter(
      (worker) => worker.currentSite.siteDayId === siteDayId
    );
    setHomeWorkers(filteredHomeWorkers); 

    const filteredOutsideWorkers = availableOutsideWorkers.filter(
      (worker) => worker.currentSite.siteDayId === siteDayId
    );
    setOutsideWorkers(filteredOutsideWorkers); 
  }, [availableHomeWorkers, availableOutsideWorkers, siteDayId]); 


  // Lógica para agregar un trabajador a un sitio en el store y a la db
  const handleAddWorkers = async (workers, typeOfWorker) => {
    // Se asigna a cada trabajador el sitio actual 
    const signedWorkersToSite = workers.map((worker) => ({...worker, currentSite: {siteDayId, site}}));
    let homeWorkersForDB = [];
    try {
      // Actualiza el sitio asignado a cada trabajador en el estado global
      if (typeOfWorker === HOMEWORKERS) {
        //actualizo el Store
       const homeWorkersForDB = await updateAvailableHomeWorkers(signedWorkersToSite, siteDayId);
       console.log("los home workes devueltos por el store es", homeWorkersForDB);
        // Actualiza los trabajadores que se les asignó un sitio en la BD
        await saveAvailableWorkers(DAYS, day, homeWorkersForDB);
      } else {
        //actualizo el store
        const outsideWorkersForDB = await updateAvailableOutsideWorkers(signedWorkersToSite, siteDayId);
        // Actualiza los trabajadores que se les asignó un sitio en la BD
        await saveAvailableWorkers(DAYS, day, undefined, outsideWorkersForDB);
      }
  
    } catch (err) {
      console.log(err);
      alert(
        "No se pudieron realizar los cambios, recargue la página para comenzar de nuevo",
        { err }
      );
    }
  };

  // Lógica para cambiar los tipos de obra
  const handleAddTypes = (newTypes) => {
    // Actualizar estado global de los tipos recibidos
    addSiteTypes(siteDayId, newTypes);
    // Actualizar los tipos en la base de Datos
    editTypeSite(DAYS, day, siteDayId, newTypes);
  };

  return (
    <>
      <div
        key={siteDayId}
        className="border-b text-stone-600 border-stone-300 flex gap-1 w-full"
      >
        <div className="text-sm flex justify-center items-center p-1 min-w-5 max-w-5 w-5 overflow-hidden">
          {i}
        </div>
        <div className="p-1 min-w-24 max-w-24 w-24 whitespace-nowrap overflow-hidden">
          {client}
        </div>
        <div className="p-1 min-w-56 max-w-56 w-56 whitespace-nowrap overflow-hidden">
          {site}
        </div>
        <div
          className="p-1 text-xs flex items-center min-w-12 max-w-12 w-12 flex-wrap overflow-hidden bg-stone-200 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          {types &&
            types.map((type, index) => (
              <span key={index}>{index === 0 ? type : `-${type}`}</span>
            ))}
        </div>
        <HomeWorkersCell
          handleAddWorkers={handleAddWorkers}
          homeWorkers={homeWorkers}
        />
        <OutsideWorkersCell
          handleAddWorkers={handleAddWorkers}
          outsideWorkers={outsideWorkers}
        />
      </div>
      {open && (
        <TypeSelectModal
          open={open}
          onClose={() => setOpen(false)}
          onSave={handleAddTypes}
        />
      )}
    </>
  );
};

// PropTypes
SiteRow.propTypes = {
  i: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  day: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  siteDayId: PropTypes.string.isRequired,
  client: PropTypes.string.isRequired,
  site: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.string),
};

export default SiteRow;
