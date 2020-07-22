import React from "react";
import { IconType } from "react-icons/lib/cjs";
import { Box, Button, Text } from "@chakra-ui/core";
import { Link } from "react-router-dom";

//Boton de drawer, si tiene link en props wrappea el componente en un Link de react-router
//Se puede pasar funcion onClick (yo lo uso para hacer dispatch de cerrar sesion)
//El onclick va a hacer dispatch para el nombre en el header

interface IMainDrawerButtonProps {
  name: string;
  icon: IconType;
  onClick?: () => void;
}

export interface IMainDrawerListItemProps extends IMainDrawerButtonProps {
  link?: string;
}

const MainDrawerButton: React.FC<IMainDrawerButtonProps> = ({ name, icon, onClick }) => {
  return (
    <Button
      variant="ghost"
      size="lg"
      width="100%"
      justifyContent="left"
      alignItems="center"
      paddingLeft="25px"
      borderBottom="1px"
      borderColor="rgba(0,0,0,0.1);"
      onClick={onClick}
    >
      <Box as={icon} marginRight="25px" />
      <Text fontWeight="lighter" fontSize="smaller">
        {name}
      </Text>
    </Button>
  );
};

//Componente que agrega de forma condicional wrapper Link
const MainDrawerListItem: React.FC<IMainDrawerListItemProps> = ({
  link,
  name,
  icon,
  onClick,
}) => {
  const MainDrawerButtonWithProps = () => (
    <MainDrawerButton name={name} icon={icon} onClick={onClick} />
  );
  return link ? (
    <Link to={link}>
      <MainDrawerButtonWithProps />
    </Link>
  ) : (
    <MainDrawerButtonWithProps />
  );
};

export default MainDrawerListItem;
