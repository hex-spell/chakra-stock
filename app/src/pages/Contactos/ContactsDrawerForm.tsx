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
  contactData: Contact;
  submitFunction: (data: Contact) => void;
}

const ContactsDrawerForm: React.FC<IContactsDrawerFormProps> = ({
  contactMenu,
  contactMenuFormState,
  contactData,
  submitFunction,
}) => {
  const { contact_id, role } = contactData;
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
          defaultValue: contactData.name,
          validationRules: {
            required: "Falta completar el nombre",
            minLength: {
              value: 5,
              message: "El nombre debe tener mínimo 5 caracteres",
            },
            maxLength: {
              value: 30,
              message: "El nombre debe tener máximo 30 caracteres",
            },
          },
        },
        {
          name: "phone",
          title: "Teléfono",
          defaultValue: contactData.phone,
          validationRules: {
            required: "Falta completar el teléfono",
            minLength: {
              value: 10,
              message: "El telefono debe tener mínimo 10 caracteres",
            },
            maxLength: {
              value: 30,
              message: "El telefono debe tener máximo 30 caracteres",
            },
            pattern: {
              value: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/,
              message: "El teléfono debe ser válido para Argentina",
            },
          },
        },
        {
          name: "address",
          title: "Dirección",
          defaultValue: contactData.address,
          validationRules: {
            required: "Falta completar la dirección",
            minLength: {
              value: 5,
              message: "La dirección debe tener mínimo 5 caracteres",
            },
            maxLength: {
              value: 30,
              message: "La dirección debe tener máximo 30 caracteres",
            },
          },
        },
        {
          name: "money",
          title: "Dinero",
          defaultValue: contactData.money,
          validationRules: {
            required: false,
            pattern: {
              value: /^-?[0-9]*$/,
              message: "El dinero debe ser numérico",
            },
          },
        },
      ]}
    />
  );
};

export default ContactsDrawerForm;
