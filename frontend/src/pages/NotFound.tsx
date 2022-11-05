import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: 1,
      }}
    >
      <h1>404</h1>
      <ErrorOutlineIcon fontSize="large" />
      <p>Page Not Found</p>
      <Link component={RouterLink} to="/">
        Go Back
      </Link>
    </Box>
  );
}
