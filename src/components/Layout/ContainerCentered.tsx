import React from "react";
import { Box } from "@chakra-ui/core";

//se encarga de centrar en la pantalla todos los componentes wrappeados
const ContainerCentered: React.FC = ({ children }) => {
  return (
    <Box
      width="100vw"
      height="90vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="absolute"
      top="0"
      left="0"
    >
      <Box p="20px" bg="white" rounded="md">{children}</Box>
    </Box>
  );
};

export default ContainerCentered;
