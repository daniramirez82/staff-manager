import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { getCollection } from "../subcontractors/api";
import { SUBCONTRACTORS } from "../../../db/collections";

export default function SubContracAutoComplete({ setCompany }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const handleChange = (e,newValue) => {
    const {id, subName} = newValue;
    setCompany({id, subName});
  };

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const subContList = await getCollection(SUBCONTRACTORS);

      if (active) {
        setOptions([...subContList]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="subCOntractList"
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.subAlias}
      options={options}
      loading={loading}
      onChange={(e,newValue)=> handleChange(e,newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Empresa"
          variant="standard"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
