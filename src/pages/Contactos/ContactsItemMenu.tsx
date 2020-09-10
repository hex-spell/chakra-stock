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
  deleteContactById: (id:number) => void;
}

const ContactsItemMenu: React.FC<IContactsItemMenuProps> = ({
  listItemMenu,
  contactMenu,
  confirmationDrawerState,
  contactData,
  setConfirmationMenuData,
  postOrUpdateContact,
  deleteContactById
}) => {
  const {name} = contactData;
  return (
    <DynamicDrawerMenu
      isOpen={listItemMenu.isOpen}
      onClose={listItemMenu.onClose}
      title={`Menu: ${name}`}
      menu={[
        {
          name:"Llamar",
          action: () => {window.open(`tel:+540${contactData.phone}`, '_blank');}
        },
        {
          name: "Modificar",
          action: () => contactMenu.onOpen(),
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
              action: () => deleteContactById(contactData.contact_id),
            });
            confirmationDrawerState.onOpen();
          },
        },
      ]}
    />
  );
};

export default ContactsItemMenu;
