import React, { useState, useContext } from "react";
import {
  Page,
  ActionButton,

  ListItemStack,
  DynamicDrawerMenu,
} from "../components/Layout";
import { FaUsers } from "react-icons/fa";
import { ContactsListItem } from "../components/ListItems";
import { contactsData } from "./";
import { useDisclosure } from "@chakra-ui/core";
import { LayoutContext, SET_CONFIRMATION_MENU } from "../context/Layout";
import { useContactsService } from "../services";
import { Contact } from "../services/interfaces";
import { ContactsFilter } from "../components/Filters";

export default function Contactos() {
  const [{ id, name }, setClickedItem] = useState({ id: 0, name: "error" });
  const listItemMenu = useDisclosure();
  const actionButtonMenu = useDisclosure();
  const { dispatch, confirmationMenuDisclosure } = useContext(LayoutContext);
  const onItemClick = (id: number, name: string) => {
    setClickedItem({ id, name });
    listItemMenu.onOpen();
  };
  const { result, search, role, setFilters } = useContactsService();
 
  return (
    <Page title="Contactos">
      <ContactsFilter setFilters={setFilters} search={search} role={role}/>
      <ListItemStack maxHeight="63vh">
        {result.payload && result.payload.map(({ name, address, phone, money, updated_at } : Contact) => (
          <ContactsListItem
            name={name}
            address={address}
            phone={phone}
            money={money}
            updatedAt={updated_at}
            onClick={() => onItemClick(id, name)}
          />
        ))}
      </ListItemStack>
      <ActionButton
        icon={FaUsers}
        ariaLabel="Agregar Contacto"
        action={() => actionButtonMenu.onOpen()}
      />
      <DynamicDrawerMenu
        isOpen={listItemMenu.isOpen}
        onClose={listItemMenu.onClose}
        title={`Menu: ${name}`}
        menu={[
          { name: "Modificar", action: () => alert(`Modificar ${name}`) },
          {
            name: "Saldar deuda",
            action: () => alert(`Saldar deuda de ${name}`),
          },
          {
            name: "Reiniciar el contador de dinero",
            action: () => {
              //manda titulo y funcion para ejecutar al drawer de confirmacion, y lo abre
              dispatch({
                type: SET_CONFIRMATION_MENU,
                payload: {
                  title: `reiniciar el contador de ${name}`,
                  action: () => alert(`${name} ahora se encuentra en $0`),
                },
              });
              confirmationMenuDisclosure.onOpen();
            },
          },
          {
            name: "Eliminar",
            action: () => {
              //manda titulo y funcion para ejecutar al drawer de confirmacion, y lo abre
              dispatch({
                type: SET_CONFIRMATION_MENU,
                payload: {
                  title: `eliminar a ${name}`,
                  action: () => alert(`${name} eliminado`),
                },
              });
              confirmationMenuDisclosure.onOpen();
            },
          },
        ]}
      />
      <DynamicDrawerMenu
        isOpen={actionButtonMenu.isOpen}
        onClose={actionButtonMenu.onClose}
        title="Menu: Contactos"
        menu={[
          {
            name: "Agregar nuevo contacto",
            action: () => {
              alert(`Agregar nuevo contacto`);
            },
          },
        ]}
      />
    </Page>
  );
}
