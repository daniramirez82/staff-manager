import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { getCollection } from "../../clients/api";
import { CLIENTS } from "../../../../db/collections";

// eslint-disable-next-line react/prop-types
export default function ClientsAutoComplete({ setClient }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const handleChange = (e,newValue) => {
    setClient(newValue);
  };

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const clientsList = await getCollection(CLIENTS);

      if (active) {
        setOptions([...clientsList]);
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
      id="clientsList"
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.clientAlias}
      options={options}
      loading={loading}
      onChange={(e,newValue)=> handleChange(e,newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Cliente"
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
