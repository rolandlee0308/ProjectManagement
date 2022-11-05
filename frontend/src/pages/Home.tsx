import { Box, Divider } from "@mui/material";
import React from "react";
import AddClient from "../component/AddClient";
import AddProject from "../component/AddProject";
import Clients from "../component/Clients";
import Projects from "../component/Projects";

export default function Home() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AddClient />
        <AddProject />
      </Box>
      <Projects />
      <Divider />
      <Clients />
    </>
  );
}
