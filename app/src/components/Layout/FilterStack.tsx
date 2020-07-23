import React from "react";
import { Stack } from "@chakra-ui/core";


//abstraccion de contenedor de listas
const FilterStack: React.FC = ({ children }) => {
  return (
    <Stack
      spacing={1}
      shouldWrapChildren={true}
      py="10px"
    >
      {children}
    </Stack>
  );
};

export default FilterStack;
