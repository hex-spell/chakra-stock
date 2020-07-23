import React from "react";
import { Box } from "@chakra-ui/core";

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
