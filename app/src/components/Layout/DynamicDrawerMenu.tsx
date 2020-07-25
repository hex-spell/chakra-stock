import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Text,
} from "@chakra-ui/core";

type MenuOption = {
  name: string;
  action: () => void;
};

interface IDynamicDrawerMenuProps {
  title: string;
  menu: MenuOption[];
  isOpen: boolean;
  onClose: () => void;
}

//mapea un array de nombres con valores, va a ser usado para hacer requests al servidor filtrando datos
//por ahi utilizo un wrapper para manejar el estado
//al tocar un boton cierra el drawer con onClose y ejecuta la funcion asignada en el arreglo "menu"
const DynamicDrawerMenu: React.FC<IDynamicDrawerMenuProps> = ({
  title,
  menu,
  isOpen,
  onClose,
}) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{title}</DrawerHeader>
        <DrawerBody>
          {menu.map(({ name, action }) => (
            <Button
              variant="ghost"
              size="lg"
              width="100%"
              justifyContent="left"
              alignItems="center"
              paddingLeft="25px"
              borderBottom="1px"
              borderColor="rgba(0,0,0,0.1);"
              onClick={()=>{onClose();action()}}
            >
              <Text fontWeight="lighter" fontSize="smaller">
                {name}
              </Text>
            </Button>
          ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DynamicDrawerMenu;
