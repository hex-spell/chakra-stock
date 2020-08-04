import React from "react";
import { DynamicDrawerMenu } from "../../components/Layout";
import { UseDisclosureReturn } from "@chakra-ui/core/dist/useDisclosure";
import { IConfirmationMenu } from "../../context/Layout";

interface IContactsItemMenuProps {
  listItemMenu: UseDisclosureReturn;
  contactMenu: UseDisclosureReturn;
  confirmationMenu: UseDisclosureReturn;
  name: string;
  setConfirmationMenu: (confirmationMenu: IConfirmationMenu) => void;
}

const ContactsItemMenu: React.FC<IContactsItemMenuProps> = ({
  listItemMenu,
  contactMenu,
  confirmationMenu,
  name,
  setConfirmationMenu,
}) => {
  return (
    <DynamicDrawerMenu
      isOpen={listItemMenu.isOpen}
      onClose={listItemMenu.onClose}
      title={`Menu: ${name}`}
      menu={[
        {
          name: "Modificar",
          action: () => /* alert(`Modificar ${name}`) */ contactMenu.onOpen(),
        },
        {
          name: "Saldar deuda",
          action: () => alert(`Saldar deuda de ${name}`),
        },
        {
          name: "Reiniciar el contador de dinero",
          action: () => {
            setConfirmationMenu({
              title: `reiniciar el contador de ${name}`,
              action: () => alert(`${name} ahora se encuentra en $0`),
            });
            confirmationMenu.onOpen();
          },
        },
        {
          name: "Eliminar",
          action: () => {
            //manda titulo y funcion para ejecutar al drawer de confirmacion, y lo abre
            setConfirmationMenu({
              title: `eliminar a ${name}`,
              action: () => alert(`${name} eliminado`),
            });
            confirmationMenu.onOpen();
          },
        },
      ]}
    />
  );
};

export default ContactsItemMenu;
