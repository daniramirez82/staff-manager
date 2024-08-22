import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { MenuItem } from '@mui/material';

const TypeMultiSelect = ({selectedOptions,setSelectedOptions}) => {

  const options = ['MV', 'LN', 'PI', 'SE', 'PL', 'CHO'];

  const handleSelectChange = (event, newValue) => {
    setSelectedOptions(newValue);
  };

  return (
    <div>
      <Autocomplete
        multiple
        id="multi-select"
        options={options}
        disableCloseOnSelect
        value={selectedOptions}
        onChange={handleSelectChange}
        renderOption={(props, option, { selected }) => (
          <MenuItem {...props}>
            <Checkbox
            key={props.tabIndex}
              checked={selected}
              style={{ marginRight: 8 }}
            />
            {option}
          </MenuItem>
        )}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Select Options" placeholder="Choose..." />
        )}
      />
      <div>
        <strong>Selected Options:</strong>
        {selectedOptions.length > 0 ? (
          <ul>
            {selectedOptions.map((option) => (
              <li key={option}>{option}</li>
            ))}
          </ul>
        ) : (
          <p>No options selected</p>
        )}
      </div>
    </div>
  );
};

export default TypeMultiSelect;
