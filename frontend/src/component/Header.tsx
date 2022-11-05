import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useContext } from "react";
import { Context as GlobalContext } from "../context/Global";
import { Link } from "react-router-dom";

export default function Header() {
  const theme = useTheme();
  const { toggleColor } = useContext(GlobalContext);
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            sx={{ flexGrow: 1, textDecoration: "none" }}
            color="inherit"
            to="/"
          >
            ProjectMgmt
          </Typography>
          <IconButton sx={{ ml: 1 }} onClick={toggleColor} color="inherit">
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
