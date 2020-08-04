import React from "react";
import { DrawerForm } from "../../components/Forms";
import { UseDisclosureReturn } from "@chakra-ui/core/dist/useDisclosure";
import { IClickedItem } from "./Contactos";

interface IContactsDrawerFormProps {
  contactMenu: UseDisclosureReturn;
  contactMenuFormState: {
    title: string;
    mode: string;
  };
  clickedItem: IClickedItem;
}

const ContactsDrawerForm: React.FC<IContactsDrawerFormProps> = ({
  contactMenu,
  contactMenuFormState,
  clickedItem,
}) => {
  return (
    <DrawerForm
      title={contactMenuFormState.title}
      isOpen={contactMenu.isOpen}
      onClose={contactMenu.onClose}
      onFormSubmit={(values) => console.log(values)}
      inputs={[
        {
          name: "name",
          title: "Nombre",
          defaultValue: clickedItem.name,
        },
        {
          name: "phone",
          title: "Teléfono",
          defaultValue: clickedItem.phone,
        },
        {
          name: "address",
          title: "Dirección",
          defaultValue: clickedItem.address,
        },
        {
          name: "money",
          title: "Dinero",
          defaultValue: clickedItem.money,
        },
      ]}
    />
  );
};

export default ContactsDrawerForm;
