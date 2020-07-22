import React from "react";
import { Box } from "@chakra-ui/core";

//se encarga de agregar margenes a los costados de la pagina, de forma responsiva
const ContainerCentered: React.FC = ({ children }) => {
  return (
    <Box
      width="100vw"
      height="90vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box>{children}</Box>
    </Box>
  );
};

export default ContainerCentered;
