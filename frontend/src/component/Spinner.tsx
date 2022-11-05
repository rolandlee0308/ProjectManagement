import { CircularProgress } from "@mui/material";
import React from "react";

export default function Spinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </div>
  );
}
