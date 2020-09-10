import React from "react";
import { DynamicDrawerMenu } from "../../components/Layout";
import { UseDisclosureReturn } from "@chakra-ui/core/dist/useDisclosure";

interface IContactsMainMenuProps {
  actionButtonMenu:UseDisclosureReturn;
  onAddContactClick:(role:"c"|"p",title:string)=>void;
}

const ContactsMainMenu: React.FC<IContactsMainMenuProps> = ({actionButtonMenu,onAddContactClick}) => {
  return (
    <DynamicDrawerMenu
      isOpen={actionButtonMenu.isOpen}
      onClose={actionButtonMenu.onClose}
      title="Menu: Contactos"
      menu={[
        {
          name: "Registrar nuevo cliente",
          action: () => {
            onAddContactClick("c","Registrar nuevo cliente");
          },
        },
        {
          name: "Registrar nuevo proveedor",
          action: () => {
            onAddContactClick("p","Registrar nuevo proveedor");
          },
        },
      ]}
    />
  );
};

export default ContactsMainMenu;
