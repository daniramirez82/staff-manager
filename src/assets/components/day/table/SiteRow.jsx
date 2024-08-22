import PropTypes from 'prop-types';
import TypeSelectModal from './TypeSelectModal';
import { useState } from 'react';
import { handleAddWorkersToSite, useSitesStore } from '../../../stores/dayStore';
import { addSiteToDailyEntry, editTypeSite } from '../api';
import { DAYS } from '../../../../db/collections';
import HomeWorkersCell from './homeWorkersCell/HomeWorkersCell';
import OutsideWorkersCell from './outsideWorkersCell/OutsideWorkersCell';

const SiteRow = ({ i, day, siteDayId, client, site, types, homeWorkers, outsideWorkers }) => {
  const [open, setOpen] = useState(false);
  const addSiteTypes = useSitesStore((state) => state.editSiteType);

  // Lógica para agregar un trabajador al store y a la db
  const handleAddWorkers = async (workers, company) => {
    try {
      const editedSite = await handleAddWorkersToSite(siteDayId, workers, company);
      addSiteToDailyEntry(DAYS, day, editedSite);
    } catch (err) {
      console.log(err)
      alert("No se pudieron realizar los cambios, recargue la pagina para comenzar de nuevo", {err});
    }
  };
//Lógica para cambiar los tipo de obra
  const handleAddTypes = (newTypes) => {
    // Actualizar estado global de los tipos recibidos
    addSiteTypes(siteDayId, newTypes);
    // Actualizar los tipos en la base de Datos
    editTypeSite(DAYS, day, siteDayId, newTypes);
  };

  return (
    <>
      <div key={siteDayId} className="border-b text-stone-600 border-stone-300 flex gap-1 w-full">
        <div className="text-sm flex justify-center items-center p-1 min-w-5 max-w-5 w-5 overflow-hidden">
          {i}
        </div>
        <div className="p-1 min-w-24 max-w-24 w-24 whitespace-nowrap overflow-hidden">{client}</div>
        <div className="p-1 min-w-56 max-w-56 w-56 whitespace-nowrap overflow-hidden">{site}</div>
        <div className="p-1 text-xs flex items-center min-w-12 max-w-12 w-12 flex-wrap overflow-hidden bg-stone-200 cursor-pointer" onClick={() => setOpen(true)}>
          {types && types.map((type, index) => (
            <span key={index}>
              {index === 0 ? type : `-${type}`}
            </span>
          ))}
        </div>
        <HomeWorkersCell handleAddWorkers={handleAddWorkers} homeWorkers={homeWorkers}/>
        <OutsideWorkersCell handleAddWorkers={handleAddWorkers} outsideWorkers={outsideWorkers} />
      </div>
      {open && <TypeSelectModal open={open} onClose={() => setOpen(false)} onSave={handleAddTypes} />}
    </>
  );
};

//Protoipos
SiteRow.propTypes = {
  i: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  day: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  siteDayId: PropTypes.string.isRequired,
  client: PropTypes.string.isRequired,
  site: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.string),
  homeWorkers: PropTypes.arrayOf(PropTypes.object),
  outsideWorkers: PropTypes.arrayOf(PropTypes.object),
};

export default SiteRow;
