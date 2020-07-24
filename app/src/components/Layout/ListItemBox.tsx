import React from "react";
import { Box } from "@chakra-ui/core";


//caja para los contenidos de los listitems, da el borde, el relleno y el flex

const ListItemBox: React.FC = ({ children }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      borderWidth="1px"
      rounded="md"
      px="5"
      py="2"
    >
      {children}
    </Box>
  );
};

export default ListItemBox;
