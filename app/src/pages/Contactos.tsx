import React, { useState, useContext } from "react";
import {
  Page,
  ActionButton,
  FilterStack,
  FilterDropdown,
  ListItemStack,
  DynamicDrawerMenu,
} from "../components/Layout";
import { FaUsers } from "react-icons/fa";
import { Searchbar } from "../components/Searchbar";
import { ContactsListItem } from "../components/ListItems";
import { contactsData } from "./";
import { useDisclosure } from "@chakra-ui/core";
import { LayoutContext, SET_CONFIRMATION_MENU } from "../context/Layout";

export default function Contactos() {
  const [{ id, name }, setClickedItem] = useState({ id: 0, name: "error" });
  const listItemMenu = useDisclosure();
  const actionButtonMenu = useDisclosure();
  const { dispatch, confirmationMenuDisclosure } = useContext(LayoutContext);
  const onItemClick = (id: number, name: string) => {
    setClickedItem({ id, name });
    listItemMenu.onOpen();
  };
  return (
    <Page title="Contactos">
      <FilterStack>
        <Searchbar />
        <FilterDropdown
          menu={[
            { name: "Clientes", value: "clientes" },
            { name: "Proveedores", value: "proveedores" },
          ]}
        />
        <FilterDropdown
          menu={[
            { name: "Ordenar por nombre", value: "ordenarPorNombre" },
            { name: "Ordenar por deuda", value: "ordenarPorDeuda" },
            {
              name: "Ordenar por fecha de ult. Actualización",
              value: "ordenarPorFecha",
            },
          ]}
        />
      </FilterStack>
      <ListItemStack maxHeight="63vh">
        {contactsData.map(({ name, address, phone, money, lastUpdateDate }) => (
          <ContactsListItem
            name={name}
            address={address}
            phone={phone}
            money={money}
            lastUpdateDate={lastUpdateDate}
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
