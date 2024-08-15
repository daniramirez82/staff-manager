import PropTypes from 'prop-types';
import TypeSelectModal from './TypeSelectModal'; 
import { useState } from 'react';
import {useSitesStore} from '../../../stores/dayStore';
import { editTypeSite } from '../api';
import { DAYS } from '../../../../db/collections';

const SiteRow = ({ i, day, siteDayId, client, site, types, homeWorkers, outsideWorkers }) => {
  const [open, setOpen] = useState(false);
  const addSiteTypes = useSitesStore((state) => state.editSiteType);


  const handleAddTypes = (newTypes) => {
    //actualizar estado global de los tipos recibidos
    addSiteTypes(siteDayId, newTypes)
    //actualizar los tipos en la base de Datos
    editTypeSite(DAYS, day, siteDayId, newTypes);
  }

  return (
    <>
      <div className="border-b text-stone-600 border-stone-300 flex gap-1 w-full">
        <div className="divide-y text-sm flex justify-center items-center p-1">
          {i}
        </div>
        <div className="divide-y p-1 min-w-24">{client}</div>
        <div className="divide-y p-1 min-w-36">{site}</div>
        <div className="divide-y p-1 text-xs flex items-center" onClick={() => setOpen(true)}>
          {types && types.map((type, index) => (
            <span key={index}>
              {index === 0 ? type : `-${type}`}
            </span>
          ))}
        </div>
        <div className="divide-y p-1">{homeWorkers}</div>
        <div className="divide-y p-1">{outsideWorkers}</div>
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
  homeWorkers: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  outsideWorkers: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default SiteRow;
