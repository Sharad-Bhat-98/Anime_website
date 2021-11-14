import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import "./index.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import yellow from "@material-ui/core/colors/yellow";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: yellow[400],
    },
    background: {
      paper: "#212020",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper
        style={{
          height: "100%",
        }}
      >
        <Routes />
      </Paper>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
serviceWorkerRegistration.register();
