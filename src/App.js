import React from "react";

import Container from "@mui/material/Container";
import NodesChart from "./components/Charts/NodesChart";
import SweepingChart from "./components/Charts/SweepingChart";
import RoutesChart from "./components/Charts/RoutesChart";

import NodeTable from "./components/NodeTable/NodeTable";
import LengthTable from "./components/LengthTable/LengthTable";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0a0a09",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        <Typography
          variant="h3"
          sx={{ textAlign: "center", color: "white", padding: "20px" }}
        >
          TSP Sweeping Algorithm{" "}
        </Typography>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", color: "white", padding: "20px" }}
        >
          Nodes{" "}
        </Typography>
        <NodesChart />
        <Typography
          variant="h5"
          sx={{ textAlign: "center", color: "white", padding: "20px" }}
        >
          Hamiltonian path{" "}
        </Typography>
        <SweepingChart />
        <Typography
          variant="h5"
          sx={{ textAlign: "center", color: "white", padding: "20px" }}
        >
          Routes{" "}
        </Typography>
        <RoutesChart />
        <Typography
          variant="h5"
          sx={{ textAlign: "center", color: "white", padding: "20px" }}
        >
          Input data{" "}
        </Typography>

        <NodeTable />
        <Typography
          variant="h5"
          sx={{ textAlign: "center", color: "white", padding: "20px" }}
        >
          Route length{" "}
        </Typography>
        <LengthTable />
      </Container>
    </ThemeProvider>
  );
}

export default App;
