import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {Toolbar} from "@mui/material";
import { useState } from "react";

const TopBar = ({menuIsOpen, setMenuIsOpen}) => {


  const handleClick = () => {
    // pasar es estado a abierto
    setMenuIsOpen((prevState)=> !prevState)
  };
  return (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleClick}
        edge="start"
        sx={{
          marginRight: 5,
          ...(menuIsOpen && { backgroundColor: "red" }),
        }}>
        <MenuIcon />
      </IconButton>

      <div>Staff Manger</div>
    </Toolbar>
  );
};

export default TopBar;
