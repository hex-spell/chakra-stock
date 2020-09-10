import React from "react";
import { Box } from "@chakra-ui/core";


//se encarga de agregar margenes a los costados de la pagina, de forma responsiva
const Container: React.FC = ({ children }) => {
  return (
    <Box width="100%" display="flex" justifyContent="center">
      <Box
        width={[
          "95%", // base
          "90%", // 480px upwards
          "80%", // 768px upwards
          "80%", // 992px upwards
        ]}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Container;
