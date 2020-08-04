import React from "react";
import { DrawerForm } from "../../components/Forms";
import { UseDisclosureReturn } from "@chakra-ui/core/dist/useDisclosure";
import { Contact } from "../../services/interfaces";

interface IContactsDrawerFormProps {
  contactMenu: UseDisclosureReturn;
  contactMenuFormState: {
    title: string;
    mode: string;
  };
  clickedItem: Contact;
  submitFunction: (data: Contact) => void;
}

const ContactsDrawerForm: React.FC<IContactsDrawerFormProps> = ({
  contactMenu,
  contactMenuFormState,
  clickedItem,
  submitFunction,
}) => {
  const { contact_id, role } = clickedItem;
  return (
    <DrawerForm
      title={contactMenuFormState.title}
      isOpen={contactMenu.isOpen}
      onClose={contactMenu.onClose}
      onFormSubmit={({ address, money, name, phone }) =>
        submitFunction({ address, money, name, phone, contact_id, role })
      }
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
