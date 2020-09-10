import React, { useContext } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from "@chakra-ui/core";
import { UserContext, LOG_OUT } from "../../context/User";
import { IMainDrawerListItemProps, default as MainDrawerListItem} from "./MainDrawerListItem";
import { FaDoorOpen } from "react-icons/fa";

interface IMainDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  links: IMainDrawerListItemProps[];
}

//Drawer que muestra todas las rutas de la app con un icono, un boton de logout, y un header con tu username
const MainDrawer: React.FC<IMainDrawerProps> = ({ isOpen, onClose, links }) => {
  const {
    store: {
      user: { name }
    },
    dispatch
  } = useContext(UserContext);
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton/>
        <DrawerHeader>{name}</DrawerHeader>
       
        <DrawerBody overflowY="scroll" paddingX="0">
        {isOpen && links.map(({name,link,icon},index)=><MainDrawerListItem name={name} link={link} icon={icon} key={index}/>)}
        <MainDrawerListItem name="Salir" icon={FaDoorOpen} onClick={()=>dispatch({type:LOG_OUT})}/>
        </DrawerBody>

      </DrawerContent>
    </Drawer>
  );
};

export default MainDrawer;
