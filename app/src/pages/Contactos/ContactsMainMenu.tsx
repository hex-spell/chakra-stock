import React from "react";
import { DynamicDrawerMenu } from "../../components/Layout";
import { UseDisclosureReturn } from "@chakra-ui/core/dist/useDisclosure";

interface IContactsMainMenuProps {
  actionButtonMenu:UseDisclosureReturn;
}

const ContactsMainMenu: React.FC<IContactsMainMenuProps> = ({actionButtonMenu}) => {
  return (
    <DynamicDrawerMenu
      isOpen={actionButtonMenu.isOpen}
      onClose={actionButtonMenu.onClose}
      title="Menu: Contactos"
      menu={[
        {
          name: "Agregar nuevo cliente",
          action: () => {
            alert(`Agregar nuevo cliente`);
          },
        },
        {
          name: "Agregar nuevo proveedor",
          action: () => {
            alert(`Agregar nuevo proveedor`);
          },
        },
      ]}
    />
  );
};

export default ContactsMainMenu;
