import React from "react";
import { Stack, Text, Heading } from "@chakra-ui/core";

interface IListItemStackProps {
  maxHeight: string;
  noResult?: boolean;
}

//abstraccion de contenedor de listas, tiene un tamaño maximo para hacer scroll en overflow
//el padding bottom es para que los action button no tapen detalles importantes
const ListItemStack: React.FC<IListItemStackProps> = ({ maxHeight, children, noResult }) => {
  return (
    <Stack
      spacing={1}
      shouldWrapChildren={true}
      maxHeight={maxHeight}
      overflowY="scroll"
      my="5px"
      p="10px"
      pb="80px"
      bg="white"
      shadow="md"
      rounded="md"
    >
      {children} {noResult && <Heading size="sm">Parece que no hay resultados :/</Heading>}
    </Stack>
  );
};

export default ListItemStack;
