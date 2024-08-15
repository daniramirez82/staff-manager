import * as React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { getSitesForClient } from "../../clients/api"; // Importa tu función para obtener sitios

const filter = createFilterOptions();

const SitesAutoComplete = ({ clientId, onChange }) => {
  const [value, setValue] = useState(null);
  const [sites, setSites] = useState([]);

  const handleChange = (event, newValue) => {
    if (typeof newValue === "string") {
      setSites((prevSites) => [...prevSites, { siteName: newValue }]);
      setValue({ siteName: newValue });
      onChange({ siteName: newValue });
    } else if (newValue && newValue.inputValue) {
      setSites((prevSites) => [...prevSites, { siteName: newValue.inputValue }]);
      setValue({ siteName: newValue.inputValue });
      onChange({ siteName: newValue.inputValue });
    } else {
      setValue(newValue);
      onChange(newValue);
    }
  };

  useEffect(() => {
    const fetchSites = async () => {
      if (clientId) {
        const sitesFromDB = await getSitesForClient(clientId);
        const siteNames = sitesFromDB.map((site)=> site.siteName)
        setSites(siteNames);
      } else {
        setSites([]);
      }
    };

    fetchSites();
  }, [clientId]);

  return (
    <Autocomplete
      value={value}
      key={value}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) => option.title === value.title}
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
        if (typeof option.siteName === "string") {
          return option.siteName;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.siteName || ""; 
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      renderOption={(props, option) => {
        const { key, ...rest } = props;
        return (
          <li {...rest} key = {option.title}>
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
