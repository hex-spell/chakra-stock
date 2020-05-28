import React from "react";
import { Flex } from "@chakra-ui/core";
import { IconButton } from "@chakra-ui/core";
import { FaBars } from "react-icons/fa";

interface INavbarProps {
    onMenuClick: () => void;
}


//Barra de navegacion que tiene un boton que activa el MainDrawer
const Navbar : React.FC<INavbarProps> = ({onMenuClick}) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="0.5rem"
      bg="teal.500"
      color="white"
    >
      <IconButton aria-label="menu" icon={FaBars} variantColor="teal" size="lg" onClick={onMenuClick}/>
    </Flex>
  );
};

export default Navbar;
