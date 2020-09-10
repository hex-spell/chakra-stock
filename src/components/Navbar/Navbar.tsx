import React, { useContext } from "react";
import { Flex } from "@chakra-ui/core";
import { IconButton, Text, Box } from "@chakra-ui/core";
import { FaBars } from "react-icons/fa";
import { LayoutContext } from "../../context/Layout";

interface INavbarProps {
  onMenuClick: () => void;
}

//Barra de navegacion que tiene un boton que activa el MainDrawer
//El header usa un context para obtener el titulo desde los botones del drawer (en realidad es un useEffect en las paginas, que se activa al renderizarlas)
const Navbar: React.FC<INavbarProps> = ({ onMenuClick }) => {
  const {
    store: { header },
  } = useContext(LayoutContext);
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      bg="teal.500"
      color="white"
      position="relative"
    >
      {/* ESTE HEADER TOMA EL ESTADO DE UN CONTEXT, QUE CAMBIA CON LOS BOTONES DEL MAINDRAWER */}
      <Box position="absolute" width="100%" textAlign="center">
        <Text fontSize="lg">{header}</Text>
      </Box>

      <IconButton
        isRound={true}
        aria-label="menu"
        icon={FaBars}
        variantColor="teal"
        size="lg"
        onClick={onMenuClick}
        m="0.5rem"
      />
    </Flex>
  );
};

export default Navbar;
