import * as React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { getClientSites } from "../../clients/api"; // Importa tu función para obtener sitios

const filter = createFilterOptions();

const SitesAutoComplete = ({ clientId, onChange }) => {
  const [value, setValue] = useState(null);
  const [sites, setSites] = useState([]);

  const handleChange = (event, newValue) => {
    if (typeof newValue === 'string') {
      setSites((prevSites) => [...prevSites, newValue]);
      setValue(newValue);
      onChange(newValue);
    } else if (newValue && newValue.inputValue) {
      setSites((prevSites) => [...prevSites, newValue.inputValue]);
      setValue(newValue.inputValue);
      onChange(newValue.inputValue);
    } else {
      setValue(newValue);
      onChange(newValue);
    }
  };

  useEffect(() => {
    const fetchSites = async () => {
      if (clientId) {
        const sitesFromDB = await getClientSites(clientId);
        setSites(sitesFromDB);
      } else {
        setSites([]);
      }
    };

    fetchSites();
  }, [clientId]);

  return (
    <Autocomplete
      value={value}
      onChange={handleChange}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        if (params.inputValue !== "") {
          filtered.push({
            inputValue: params.inputValue,
            title: `Add "${params.inputValue}"`
          });
        }

        return filtered;
      }}
      id="sites-autocomplete"
      options={sites}
      getOptionLabel={(option) => {
        // value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      renderOption={(props, option) => {
        const { key, ...rest } = props;
        return (
          <li {...rest} key={option.inputValue || option}>
            {typeof option === "string" ? option : option.title}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} label="Select Site" variant="standard" />
      )}
    />
  );
};

export default SitesAutoComplete;
