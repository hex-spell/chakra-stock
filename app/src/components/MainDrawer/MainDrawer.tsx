import React from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Input,
    Button,
  } from "@chakra-ui/core";

interface IMainDrawerProps {
    isOpen:boolean;
    onClose: () => void;
}

//Drawer que va a mostrar todas las rutas de la app, y un boton de logout
const MainDrawer : React.FC<IMainDrawerProps> = ({isOpen,onClose}) => {
    return (
        <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button color="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
}

export default MainDrawer;