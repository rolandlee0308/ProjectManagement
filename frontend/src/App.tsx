import {
  Box,
  Container,
  createTheme,
  Paper,
  ThemeProvider,
} from "@mui/material";
import React, { useContext, useMemo } from "react";
import Header from "./component/Header";
import { Context as GlobalContext } from "./context/Global";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Clients from "./component/Clients";
import AddClient from "./component/AddClient";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache
});

function App() {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Header />
        <Paper sx={{ flexGrow: 1 }} square>
          <Container sx={{ height: 1 }}>
            <AddClient />
            <Clients />
          </Container>
        </Paper>
      </Box>
    </>
  );
}

const Root = () => {
  const {
    state: { color },
  } = useContext(GlobalContext);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: color,
        },
      }),
    [color]
  );

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default Root;
