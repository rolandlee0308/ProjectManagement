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

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", height: '100vh' }}>
        <Header />
        <Paper sx={{ flexGrow: 1 }} square>
          <Container>
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
