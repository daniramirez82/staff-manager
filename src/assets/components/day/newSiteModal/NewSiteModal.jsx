import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Backdrop,
  Typography,
} from "@mui/material";
import ClientsAutoComplete from "./ClientsAutoComp";
import SitesAutoComplete from "./SitesAutoComp";

const NewSiteModal = ({ open, handleClose, handleAddSite }) => {
  const [client, setClient] = useState("");
  const [siteName, setSiteName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddSite(client, {siteName:siteName}); 
    setClient("");
    setSiteName("");
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Agregar Nueva Obra
        </Typography>
        <form onSubmit={handleSubmit}>
          <ClientsAutoComplete setClient={setClient} />
          <SitesAutoComplete clientId={client.id} onChange={setSiteName}/>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" color="primary" type="submit">
              Aceptar
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default NewSiteModal;
