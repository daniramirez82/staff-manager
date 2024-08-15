import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import TypeMultiSelect from './TypeMultiSelect';
import { useState } from 'react';

const TypeSelectModal = ({ open, onClose, onSave }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSave = () => {
    onSave(selectedOptions);
    onClose();
  };

  return (
    <Backdrop open={open} style={{ zIndex: 1300 }}>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="type-select-modal"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="type-select-modal">Select Site Types</DialogTitle>
        <DialogContent>
          <TypeMultiSelect
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Backdrop>
  );
};

TypeSelectModal.propTypes = {
  open: PropTypes.bool.isRequired,           
  onClose: PropTypes.func.isRequired,        
  onSave: PropTypes.func.isRequired,    
};

export default TypeSelectModal;
