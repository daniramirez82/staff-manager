import { useState } from "react";
import NewSiteModal from "./newSiteModal/NewSiteModal";
import { Box, Button, Typography } from "@mui/material";
import { addSiteToClient } from "../clients/api";
import { setDocWithId } from "./api";
import { DAYS } from "../../../db/collections";
import { getCurrentDate } from "../../tools/dateTools";

const Today = () => {
  const [modalState, setModalState] = useState(false);
  const [sites, setSites] = useState([]);
  const date = getCurrentDate();

  const handleOpen = () => setModalState(true);
  const handleClose = () => setModalState(false);

  const handleAddSite = (client, siteName) => {
    
    addSiteToClient(client.id, siteName).then(()=>{
      setSites([...sites, {client, siteName}]); //este objeto es {{clientName, id}, siteName}
    }).then(()=> setDocWithId(DAYS, date, {client, siteName}))
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
