import React, { useState, useContext } from "react";
import { Page, ActionButton } from "../../components/Layout";
import { FaUsers } from "react-icons/fa";
import { useDisclosure } from "@chakra-ui/core";
import { LayoutContext } from "../../context/Layout";
import { useContactsService } from "../../services";
import { ContactsFilterForm, ContactsList, ContactsItemMenu, ContactsMainMenu } from "./";
import ContactsDrawerForm from "./ContactsDrawerForm";

export interface IClickedItem {
  name: string;
  address: string;
  phone: string;
  money: number;
  contact_id: number;
}

const ClickedItemInitialState = {
  contact_id: 0,
  name: "",
  phone: "",
  money: 0,
  address: "",
};

export default function Contactos() {
  //guarda datos del contacto que clickeaste para usarlos en un formulario
  const [
    { name, address, phone, money, contact_id },
    setClickedItem,
  ] = useState<IClickedItem>(ClickedItemInitialState);

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
  });

  //menu de "estas seguro?"
  const { dispatch, confirmationMenuDisclosure } = useContext(LayoutContext);

  //almacena los datos del item clickeado y modifica el estado del formulario de contactos
  const onItemClick = (data: IClickedItem) => {
    setClickedItem({ ...data });
    setContactMenuFormState({ title: `Modificar: ${data.name}`, mode: "edit" });
    listItemMenu.onOpen();
  };

  //servicio que toma valores de los filtros, hace una peticion al server y devuelve datos
  const { result, count, updateFilters, loadMoreData } = useContactsService();

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
        confirmationMenu={confirmationMenuDisclosure}
        name={name}
        dispatch={dispatch}
      />
      {/* MENU PRINCIPAL */}
      <ContactsMainMenu actionButtonMenu={actionButtonMenu}/>
      {/* FORMULARIO DE MODIFICAR/ELIMINAR CONTACTOS */}
      <ContactsDrawerForm contactMenu={contactMenu} contactMenuFormState={contactMenuFormState} clickedItem={{name, address, phone, money, contact_id}}/>
    </Page>
  );
}
