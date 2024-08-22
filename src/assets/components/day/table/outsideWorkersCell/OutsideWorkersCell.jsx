import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AddHomeWorkersSelector from "./AddOutsideWorkersSelector";

const OutsideWorkersCell = ({ outsideWorkers, handleAddWorkers }) => {
  const [outsideWorkersOpen, setOutsideWorkersOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOutsideWorkersOpen(false);
      }
    };

    if (outsideWorkersOpen) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [outsideWorkersOpen]);

  return (
    <>
      <div className="p-1 flex items-center relative pr-3 min-w-44 max-w-44 w-44 flex-wrap border-r">
        {outsideWorkers && outsideWorkers.map((worker) => (
          <div className="pl-1 pr-1 border-stone-400" key={worker.workerAlias}>{worker.workerAlias}</div>
        ))}
        <span className="absolute top-0 right-0 -mt-2 cursor-pointer text-stone-300" onClick={() => setOutsideWorkersOpen(true)}>+</span>
      </div>
      <div className="w-1 relative z-50">
        {outsideWorkersOpen && (
          <div className="absolute top-0 left-0 bg-white p-2">
            <button className='absolute right-0 top-0' onClick={() => setOutsideWorkersOpen(false)}>
              X
            </button>
            <AddHomeWorkersSelector handleAddWorkers={handleAddWorkers} workersOnState={outsideWorkers} />
          </div>
        )}
      </div>
    </>
  );
};

OutsideWorkersCell.propTypes = {
  outsideWorkers: PropTypes.arrayOf(PropTypes.shape({
    workerAlias: PropTypes.string.isRequired,
  })).isRequired,
  handleAddWorkers: PropTypes.func.isRequired,
};

export default OutsideWorkersCell;
