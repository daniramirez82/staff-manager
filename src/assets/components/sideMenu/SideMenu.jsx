import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import GroupIcon from "@mui/icons-material/Group";
import WorkIcon from "@mui/icons-material/Work";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import {
  CLIENTS,
  SUBCONTRACTORS,
  HOMEWORKERS,
  AWAYWORKERS,
} from "../../../db/collections";
import { useGlobalView } from "../../stores/globalView";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const SideMenu = ({ menuIsOpen, setMenuIsOpen }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const setGlobalView = useGlobalView((state) => state.updateView);

  const handleClick = () => {
    setMenuIsOpen((prevState) => !prevState);
  };

  const handleChangeView = (text) => {
    setGlobalView(text);
    handleClick();
  };

  const items = [
    { text: CLIENTS, icon: <GroupIcon /> , title:"Clientes"},
    { text: SUBCONTRACTORS, icon: <WorkIcon /> , title:"Contratas"},
    { text: HOMEWORKERS, icon: <HomeWorkIcon /> , title: "Trab. Cisa"},
    { text: AWAYWORKERS, icon: <SupervisorAccountIcon /> , title:"Trab. Externos"},
  ];

  return (
    <Drawer open={menuIsOpen} onClose={handleClick}>
      <DrawerHeader>
        <IconButton onClick={handleClick}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {items.map((item, index) => (
          <ListItem
            onClick={() => handleChangeView(item.text)}
            key={item.text}
            disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default SideMenu;
