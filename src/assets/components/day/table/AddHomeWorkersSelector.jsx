import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { Chip, MenuItem } from "@mui/material";
import { HOMEWORKERS } from "../../../../db/collections";
import { getCollection } from "../../homeWorkers/api";
import PropTypes from "prop-types";

const AddHomeWorkersSelector = ({ handleAddWorkers }) => {
  const [options, setOptions] = useState([]);
  const [selectedWorkers, setSelectedWorkers] = useState([]);

  useEffect(() => {
    const fetchHomeWorkers = async () => {
      // Tomar de la DB todos los trabajadores home workers que no tengan una site asignado
      const homeWorkers = await getCollection(HOMEWORKERS);
      console.log(
        "en el add homworkers selector llegan todos los home worker",
        homeWorkers
      );
      const availableHomeWorkers = homeWorkers.filter(
        (worker) => Object.keys(worker.currentSite).length === 0
      );

      setOptions(availableHomeWorkers);
    };

    fetchHomeWorkers();
  }, []);

  const handleWorkerSelection = (event, newValue) => {
    setSelectedWorkers(newValue); //añadir la seleccion al estado del componente
    handleAddWorkers(newValue); // anadir la seleccion al estado global y a la bd
  };

  return (
    <Autocomplete
      multiple
      id="home-workers-multi-select"
      options={options}
      getOptionLabel={(option) => option.workerAlias}
      value={selectedWorkers}
      onChange={handleWorkerSelection}
      renderOption={(props, option, { selected }) => (
        <MenuItem  {...props} key={option.workerAlias}>
          <Checkbox checked={selected}  key={option.workerAlias} style={{ marginRight: 8 }} />
          {option.workerAlias}
        </MenuItem>
      )}
      renderTags={(tagValue, getTagProps) => {
        return tagValue.map((option, index) => (
          <Chip {...getTagProps({ index })} key={option.dni} label={option.workerAlias} />
        ))
      }}
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
};

export default AddHomeWorkersSelector;
