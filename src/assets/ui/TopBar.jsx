import { IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Toolbar } from "@mui/material";

const TopBar = ({ menuIsOpen, setMenuIsOpen }) => {
  const handleClick = () => {
    // pasar es estado a abierto
    setMenuIsOpen((prevState) => !prevState);
  };
  return (
    <Toolbar variant="dense">
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleClick}
        edge="start"
        sx={{
          mr: 2,
        }}>
        <MenuIcon />
      </IconButton>
      <Typography>Staff Manager</Typography>
    </Toolbar>
  );
};

export default TopBar;
