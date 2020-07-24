import React from "react";
import { Stack } from "@chakra-ui/core";

interface IListItemStackProps {
  maxHeight: string;
}

//abstraccion de contenedor de listas, tiene un tamaño maximo para hacer scroll en overflow
const ListItemStack: React.FC<IListItemStackProps> = ({ maxHeight, children }) => {
  return (
    <Stack
      spacing={1}
      shouldWrapChildren={true}
      maxHeight={maxHeight}
      overflowY="scroll"
      py="2"
    >
      {children}
    </Stack>
  );
};

export default ListItemStack;
