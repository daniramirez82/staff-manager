import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { Chip, MenuItem } from "@mui/material";
import { HOMEWORKERS } from "../../../../db/collections";
import { getCollection } from "../../homeWorkers/api";
import PropTypes from "prop-types";

const AddHomeWorkersSelector = ({ handleAddWorkers, workersOnState }) => {
  const [options, setOptions] = useState([]);
  const [selectedWorkers, setSelectedWorkers] = useState([]);

  useEffect(() => {
    const fetchHomeWorkers = async () => {
      // Tomar de la DB todos los trabajadores home workers que no tengan un site asignado
      const homeWorkers = await getCollection(HOMEWORKERS);
    
      const availableHomeWorkers = homeWorkers.filter(
        (worker) => Object.keys(worker.currentSite).length === 0
      );

      setOptions(availableHomeWorkers);
    };

    fetchHomeWorkers();
  }, []);

  // Cargar la prop workersOnState en selectedWorkers solo una vez
  useEffect(() => {
    if (selectedWorkers.length === 0 && workersOnState) {
      setSelectedWorkers(workersOnState);
    }
  }, [selectedWorkers, workersOnState]);

  const handleWorkerSelection = (event, newValue) => {
    setSelectedWorkers(newValue); // Añadir la selección al estado del componente
    handleAddWorkers(newValue); // Añadir la selección al estado global y a la BD
  };

  return (
    <Autocomplete
      multiple
      id="home-workers-multi-select"
      options={options}
      getOptionLabel={(option) => option.workerAlias}
      value={selectedWorkers}
      onChange={handleWorkerSelection}
      isOptionEqualToValue={(option, value) => option.dni === value.dni} 
      renderOption={(props, option, { selected }) => (
        <MenuItem {...props} key={option.workerAlias}>
          <Checkbox checked={selected} key={option.workerAlias} style={{ marginRight: 8 }} />
          {option.workerAlias}
        </MenuItem>
      )}
      renderTags={(tagValue, getTagProps) => 
        tagValue.map((option, index) => (
          <Chip {...getTagProps({ index })} key={option.dni} label={option.workerAlias} />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Select Home Workers"
          placeholder="Choose workers..."
        />
      )}
    />
  );
};

AddHomeWorkersSelector.propTypes = {
  handleAddWorkers: PropTypes.func.isRequired,
  workersOnState: PropTypes.array, // Debe ser un array, no un objeto
};

export default AddHomeWorkersSelector;
