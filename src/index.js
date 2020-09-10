import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import customTheme from "./theme";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { UserContextProvider } from "./context/User";
import LoginWrapper from "./components/Login";
import { LayoutContextProvider } from "./context/Layout";
import 'core-js/es/map';
import 'core-js/es/set';


//Raiz verdadera de la aplicacion. proveedores de los contextos, boilerplate de chakra y wrapper condicional de login
ReactDOM.render(
  //<React.StrictMode>
    <UserContextProvider>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        <LoginWrapper>
          <LayoutContextProvider>
            <App />
          </LayoutContextProvider>
        </LoginWrapper>
      </ThemeProvider>
    </UserContextProvider>
  //</React.StrictMode>,
  ,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
