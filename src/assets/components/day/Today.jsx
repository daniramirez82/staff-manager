import { useState } from "react";
import NewSiteModal from "./newSiteModal/NewSiteModal";
import { Box, Button, Typography } from "@mui/material";
import { addSiteToClient } from "../clients/api";

const Today = () => {
  const [modalState, setModalState] = useState(false);
  const [sites, setSites] = useState([]);

  const handleOpen = () => setModalState(true);
  const handleClose = () => setModalState(false);

  const handleAddSite = (client, siteName) => {
    //todo hacer llamando a API de Clientes y agregar obra
    addSiteToClient(client.id, siteName).then(()=>{
      setSites([...sites, {client, siteName}]);
    })

  };

  return (
    <div className="p-6">
      <Button variant="contained" color="primary" onClick={handleOpen}>
        + Agregar nueva obra
      </Button>
      <NewSiteModal
        open={modalState}
        handleClose={handleClose}
        handleAddSite={handleAddSite}
      />
      <Box sx={{ mt: 4 }}>
        {sites.map((site, index) => (
          <Box
            key={index}
            sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
            <Typography variant="h6">{site.siteName}</Typography>
            <Typography variant="body1">{site.client.clientName}</Typography>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default Today;
