import React, { useState, useContext } from "react";
import { Page, ActionButton } from "../../components/Layout";
import { FaUsers } from "react-icons/fa";
import { useDisclosure } from "@chakra-ui/core";
import { LayoutContext } from "../../context/Layout";
import { useContactsService } from "../../services";
import {
  ContactsFilterForm,
  ContactsList,
  ContactsItemMenu,
  ContactsMainMenu,
} from "./";
import ContactsDrawerForm from "./ContactsDrawerForm";
import { Contact } from "../../services/interfaces";

const ClickedItemInitialState: Contact = {
  contact_id: 0,
  name: "",
  phone: "",
  money: 0,
  role: "c",
  address: "",
};

interface IContactsMenuState {
  title: string;
  mode: "error" | "edit" | "create";
  role: "c" | "p";
}

export default function Contactos() {
  //guarda datos del contacto que clickeaste para usarlos en un formulario
  const [
    clickedItem,
    setClickedItem,
  ] = useState<Contact>(ClickedItemInitialState);

  //menu de clickear items
  const listItemMenu = useDisclosure();

  //menu de action button
  const actionButtonMenu = useDisclosure();

  //menu de crear/modifcar contacto
  const contactMenu = useDisclosure();

  //define si el formulario de contactos va a ser usado para modificar uno existente o agregar uno nuevo
  const [contactMenuFormState, setContactMenuFormState] = useState({
    title: "error",
    mode: "error",
    role: "c",
  });

  //menu de "estas seguro?"
  const { confirmationDrawerState, setConfirmationMenuData } = useContext(
    LayoutContext
  );

  //almacena los datos del item clickeado y modifica el estado del formulario de contactos
  const onItemClick = (data: Contact) => {
    setClickedItem({ ...data });
    setContactMenuFormState({
      title: `Modificar: ${data.name}`,
      mode: "edit",
      role: data.role,
    });
    listItemMenu.onOpen();
  };

  //funcion ejecutada por los botones de agregar cliente/proveedor
  const onAddContactClick = (role: "c" | "p", title: string) => {
    //meto en el clickeditem los datos del estado inicial menos el rol, que lo saco de los parametros
    //esto es medio quilombo porque no describe bien lo que quiero hacer, en un futuro lo voy a cambiar
    setClickedItem({...ClickedItemInitialState, role});
    setContactMenuFormState({ title, mode: "create", role });
    contactMenu.onOpen();
  };

  //servicio que toma valores de los filtros, hace una peticion al server y devuelve datos
  const {
    result,
    count,
    updateFilters,
    loadMoreData,
    postOrUpdateContact,
    deleteContactById
  } = useContactsService();

  return (
    <Page title="Contactos">
      {/* DROPDOWNS Y BARRA DE BUSQUEDA */}
      <ContactsFilterForm updateFilters={updateFilters} />
      {/* LISTA DE CONTACTOS */}
      <ContactsList
        result={result}
        count={count}
        onItemClick={onItemClick}
        loadMoreData={loadMoreData}
      />
      {/* BOTON DE MENU */}
      <ActionButton
        icon={FaUsers}
        ariaLabel="Menu: Contactos"
        action={() => actionButtonMenu.onOpen()}
      />
      {/* MENU DE CONTACTO ESPECIFICO */}
      <ContactsItemMenu
        listItemMenu={listItemMenu}
        contactMenu={contactMenu}
        confirmationDrawerState={confirmationDrawerState}
        contactData={clickedItem}
        setConfirmationMenuData={setConfirmationMenuData}
        postOrUpdateContact={(data: Contact) => postOrUpdateContact(data)}
        deleteContactById={deleteContactById}
      />
      {/* MENU PRINCIPAL */}
      <ContactsMainMenu
        actionButtonMenu={actionButtonMenu}
        onAddContactClick={(role, title) => onAddContactClick(role, title)}
      />
      {/* FORMULARIO DE MODIFICAR/ELIMINAR CONTACTOS */}
      <ContactsDrawerForm
        contactMenu={contactMenu}
        contactMenuFormState={contactMenuFormState}
        submitFunction={(data: Contact) => postOrUpdateContact(data)}
        contactData={clickedItem}
      />
    </Page>
  );
}
