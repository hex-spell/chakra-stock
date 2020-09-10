import React, { useEffect } from "react";
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
import SubText from "./SubText";

type MenuOption = {
  name: string;
  action: () => void;
};

interface IDynamicDrawerMenuProps {
  title: string;
  subtitle?: string;
  menu: MenuOption[];
  isOpen: boolean;
  onClose: () => void;
}

/*drawer que recibe un arreglo llamado "menu", que vendrian a ser todas las opciones disponibles,
cada una tiene un nombre (que va en el boton) y una accion (que es la funcion que ejecutan)*/
//al tocar un boton cierra el drawer con onClose y ejecuta la funcion asignada en el arreglo "menu"
const DynamicDrawerMenu: React.FC<IDynamicDrawerMenuProps> = ({
  title,
  subtitle,
  menu,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    console.log(subtitle);
  }, [subtitle]);
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          {title} 
          <Text></Text>
          {subtitle && <SubText>{subtitle}</SubText>}
        </DrawerHeader>
        <DrawerBody>
          {isOpen &&
            menu.map(({ name, action }) => (
              <Button
                variant="ghost"
                size="lg"
                width="100%"
                justifyContent="left"
                alignItems="center"
                paddingLeft="25px"
                borderBottom="1px"
                borderColor="rgba(0,0,0,0.1);"
                onClick={() => {
                  onClose();
                  action();
                }}
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
