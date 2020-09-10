import React from "react";
import { Stack } from "@chakra-ui/core";

interface IListItemStackProps {
  maxHeight: string;
}

//abstraccion de contenedor de listas, tiene un tamaño maximo para hacer scroll en overflow
//el padding bottom es para que los action button no tapen detalles importantes
const ListItemStack: React.FC<IListItemStackProps> = ({ maxHeight, children }) => {
  return (
    <Stack
      spacing={1}
      shouldWrapChildren={true}
      maxHeight={maxHeight}
      overflowY="scroll"
      pt="2"
      pb="85px"
    >
      {children}
    </Stack>
  );
};

export default ListItemStack;
