import { useState } from "react";
import NewSiteModal from "./newSiteModal/NewSiteModal";
import { Box, Button, Typography } from "@mui/material";
import { addSiteToClient } from "../clients/api";
import { addSiteToDailyEntry } from "./api";
import { DAYS } from "../../../db/collections";
import { getCurrentDate } from "../../tools/dateTools";

const Today = () => {
  const [modalState, setModalState] = useState(false);
  const [sites, setSites] = useState([]);
  const date = getCurrentDate();

  console.log("sites en Today: " , sites)

  const handleOpen = () => setModalState(true);
  const handleClose = () => setModalState(false);

  const handleAddSite = (client, siteName) => {
    
    addSiteToClient(client.id, siteName).then(()=>{//agregamos el sitio nuevo al cliente
      setSites([...sites, {client, siteName}]); //Actualizamos el estado TODO: hacerlo global con Zustand
    }).then(()=> {//agregamos el sitio nuevo al dia

      const { siteName: { siteName } } = siteName;
      
      addSiteToDailyEntry(DAYS, date, {client, siteName})})
    console.log("sites en today ",sites)
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
