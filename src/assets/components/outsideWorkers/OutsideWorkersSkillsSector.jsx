import { MenuItem, Checkbox, ListItemText, Select, InputLabel } from '@mui/material';
import { useState } from 'react';

const options = ['Lana', 'Mortero', 'Sellado', 'Pintura', 'Chorro', 'Placa', 'Ayudante'];

const OutsideWorkersSkillSelector = ({ onChangeSkills }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = (event) => {
        setSelectedOptions(event.target.value);
        onChangeSkills(event.target.value);
    };


    return (
        <div>
            <InputLabel id="multi-select-label">Seleccionar Habilidades</InputLabel>
            <Select
                labelId="multi-select-label"
                multiple
                value={selectedOptions}
                onChange={handleChange}
                renderValue={(selected) => selected.join(', ')}
            >
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        <Checkbox checked={selectedOptions.indexOf(option) > -1} />
                        <ListItemText primary={option} />
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};

export default OutsideWorkersSkillSelector;

