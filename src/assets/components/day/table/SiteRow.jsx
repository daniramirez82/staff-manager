import PropTypes from 'prop-types';
import TypeSelectModal from './TypeSelectModal';
import { useState, useEffect } from 'react';
import { handleAddWorkerToSite, useSitesStore } from '../../../stores/dayStore';
import { addSiteToDailyEntry, editTypeSite } from '../api';
import { DAYS } from '../../../../db/collections';
import AddHomeWorkersSelector from './AddHomeWorkersSelector';

const SiteRow = ({ i, day, siteDayId, client, site, types, homeWorkers }) => {
  const [open, setOpen] = useState(false);
  const [homeWorkersOpen, setHomeWorkersOpen] = useState(false);
  const addSiteTypes = useSitesStore((state) => state.editSiteType);

  const handleAddWorkers = async (workers) => {
    try {
      // Lógica para agregar un trabajador al store y a la db
      const editedSite = await handleAddWorkerToSite(siteDayId, workers);
      addSiteToDailyEntry(DAYS, day, editedSite);
    } catch (err) {
      alert("No se pudieron realizar los cambios, recargue la pagina para comenzar de nuevo");
    }
  };

  // Manejo de la tecla 'Esc' para cerrar el selector
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setHomeWorkersOpen(false);
      }
    };

    if (homeWorkersOpen) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    // Limpieza del listener al desmontar o cuando el modal se cierra
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [homeWorkersOpen]);

  const handleAddTypes = (newTypes) => {
    // Actualizar estado global de los tipos recibidos
    addSiteTypes(siteDayId, newTypes);
    // Actualizar los tipos en la base de Datos
    editTypeSite(DAYS, day, siteDayId, newTypes);
  };

  return (
    <>
      <div className="border-b text-stone-600 border-stone-300 flex gap-1 w-full">
        <div className="text-sm flex justify-center items-center p-1 min-w-5 max-w-5 w-5 overflow-hidden">
          {i}
        </div>
        <div className="p-1 min-w-24 max-w-24 w-24 whitespace-nowrap overflow-hidden">{client}</div>
        <div className="p-1 min-w-56 max-w-56 w-56 whitespace-nowrap overflow-hidden">{site}</div>
        <div className="p-1 text-xs flex items-center min-w-12 max-w-12 w-12 flex-wrap overflow-hidden bg-orange-400" onClick={() => setOpen(true)}>
          {types && types.map((type, index) => (
            <span key={index}>
              {index === 0 ? type : `-${type}`}
            </span>
          ))}
        </div>
        <div className="p-1 flex items-center bg-red-600 relative pr-3">
          {homeWorkers && homeWorkers.map((worker) => (
            <div key={worker.workerAlias}>{worker.workerAlias}, </div>
          ))}
          <span className="absolute top-0 right-0 -mt-2 cursor-pointer" onClick={() => setHomeWorkersOpen(true)}>+</span>
          
          
        </div>
        <div className="w-1 relative z-50">
        {homeWorkersOpen && (
            <div className="absolute top-0 left-0 bg-white p-2">
              <button className='absolute right-0 top-0' onClick={() => setHomeWorkersOpen(false)} >
                X
              </button>
              <AddHomeWorkersSelector handleAddWorkers={handleAddWorkers} workersOnState={homeWorkers} />
            </div>)}
        </div>
        <div className="p-1">Outside Workers</div>
      </div>
      {open && <TypeSelectModal open={open} onClose={() => setOpen(false)} onSave={handleAddTypes} />}
    </>
  );
};

SiteRow.propTypes = {
  i: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  day: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  siteDayId: PropTypes.string.isRequired,
  client: PropTypes.string.isRequired,
  site: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.string),
  homeWorkers: PropTypes.arrayOf(PropTypes.object),
  outsideWorkers: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default SiteRow;
