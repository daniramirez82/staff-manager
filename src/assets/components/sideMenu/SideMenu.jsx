import * as React from "react";
import { styled, useTheme } from '@mui/material/styles';
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GroupIcon from "@mui/icons-material/Group";
import WorkIcon from "@mui/icons-material/Work";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { CLIENTS, SUBCONTRACTORS, HOMEWORKERS, AWAYWORKERS } from "../../../db/collections";


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));





const SideMenu = ({ menuIsOpen, setMenuIsOpen }) => {
    const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setMenuIsOpen((prevState) => !prevState);
  };

  const items = [
    { text: CLIENTS, icon: <GroupIcon /> },
    { text: SUBCONTRACTORS, icon: <WorkIcon /> },
    { text: HOMEWORKERS, icon: <HomeWorkIcon /> },
    { text: AWAYWORKERS, icon: <SupervisorAccountIcon /> },
  ];



  return (
    <Drawer open={menuIsOpen} onClose={handleClick}>
        <DrawerHeader>
          <IconButton onClick={handleClick}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
      <List>
        {items.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default SideMenu;
