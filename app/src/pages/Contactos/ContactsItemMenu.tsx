import React from "react";
import { DynamicDrawerMenu } from "../../components/Layout";
import { UseDisclosureReturn } from "@chakra-ui/core/dist/useDisclosure";
import { IConfirmationMenu } from "../../context/Layout";
import { Contact } from "../../services/interfaces";

interface IContactsItemMenuProps {
  //estado de este drawer
  listItemMenu: UseDisclosureReturn;
  //estado del drawer del formulario de modificar contactos
  contactMenu: UseDisclosureReturn;
  //estado del drawer de "estas seguro?"
  confirmationDrawerState: UseDisclosureReturn;
  //datos del contacto clickeado
  contactData: Contact;
  //dispatch para abrir el drawer de confirmacion
  setConfirmationMenuData: (confirmationDrawerState: IConfirmationMenu) => void;
  //funcion de actualizar contactos, la uso para reiniciar el contador de dinero a 0
  postOrUpdateContact: (data: Contact) => void;
}

const ContactsItemMenu: React.FC<IContactsItemMenuProps> = ({
  listItemMenu,
  contactMenu,
  confirmationDrawerState,
  contactData,
  setConfirmationMenuData,
  postOrUpdateContact
}) => {
  const {name} = contactData;
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
            setConfirmationMenuData({
              title: `reiniciar el contador de ${name}`,
              action: () => postOrUpdateContact({...contactData, money:0}),
            });
            confirmationDrawerState.onOpen();
          },
        },
        {
          name: "Eliminar",
          action: () => {
            //manda titulo y funcion para ejecutar al drawer de confirmacion, y lo abre
            setConfirmationMenuData({
              title: `eliminar a ${name}`,
              action: () => alert(`${name} eliminado`),
            });
            confirmationDrawerState.onOpen();
          },
        },
      ]}
    />
  );
};

export default ContactsItemMenu;
