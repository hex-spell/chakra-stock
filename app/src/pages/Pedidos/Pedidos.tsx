import React, { useState, useContext } from "react";
import { Page, ActionButton } from "../../components/Layout";
import { FaListUl } from "react-icons/fa";
import { useDisclosure } from "@chakra-ui/core";
import { LayoutContext } from "../../context/Layout";
import { useOrdersService } from "../../services";
import {
  OrdersFilterForm,
  OrdersList,
  OrdersItemMenu,
  OrdersMainMenu,
} from "./";
import { Order } from "../../services/interfaces";

const ClickedItemInitialState: Order = {
  order_id: 0,
    completed: false,
    type: "",
    contact_id: 0,
    products_count: 0,
    paid: 0,
    sum: 0,
    delivered: false,
    contact: {
      name: "",
      address: "",
      phone: "",
      contact_id: 0,
    }
};

interface IOrdersMenuState {
  title: string;
  mode: "error" | "edit" | "create";
  category_id: number;
}

export default function Pedidos() {
  //guarda datos del gasto que clickeaste para usarlos en un formulario
  const [clickedItem, setClickedItem] = useState<Order>(
    ClickedItemInitialState
  );

  //menu de clickear gastos
  const listItemDrawerState = useDisclosure();

  //menu de action button
  const actionButtonDrawerState = useDisclosure();

  //menu de crear/modifcar gasto
  const orderDrawerState = useDisclosure();


  //define si el formulario de gastos va a ser usado para modificar uno existente o agregar uno nuevo
  const [orderDrawerFormState, setOrderMenuFormState] = useState({
    title: "error",
    mode: "error",
  });

  //menu de "estas seguro?"
  const { confirmationDrawerState, setConfirmationMenuData } = useContext(
    LayoutContext
  );

  //almacena los datos del item clickeado y modifica el estado del formulario de gastos
  const onItemClick = (data:Order) => {
    setClickedItem(data);
    setOrderMenuFormState({
      title: `Modificar pedido de ${data.contact.name}`,
      mode: "edit",
    });
    listItemDrawerState.onOpen();
  };

  //funcion ejecutada por los botones de agregar
  const onAddOrderClick = (title: string) => {
    //meto en el clickeditem los datos del estado inicial
    setClickedItem({ ...ClickedItemInitialState });
    setOrderMenuFormState({ title, mode: "create" });
    orderDrawerState.onOpen();
  };

  //servicio que toma valores de los filtros, hace una peticion al server y devuelve datos
  const {
    result,
    count,
    updateFilters,
    loadMoreData,
    postOrUpdateOrder,
    deleteOrderById,
  } = useOrdersService();

  return (
    <Page title="Pedidos">
      {/* DROPDOWNS Y BARRA DE BUSQUEDA */}
      <OrdersFilterForm
        updateFilters={updateFilters}
      />
      {/* LISTA DE GASTOS */}
      <OrdersList
        result={result}
        count={count}
        onItemClick={onItemClick}
        loadMoreData={loadMoreData}
      />
      {/* BOTON DE MENU */}
      <ActionButton
        icon={FaListUl}
        ariaLabel="Menu: Gastos"
        action={() => actionButtonDrawerState.onOpen()}
      />
      {/* MENU DE GASTO ESPECIFICO */}
      <OrdersItemMenu
        listItemDrawerState={listItemDrawerState}
        orderDrawerState={orderDrawerState}
        confirmationDrawerState={confirmationDrawerState}
        orderData={clickedItem}
        setConfirmationMenuData={setConfirmationMenuData}
        deleteFunction={deleteOrderById}
      />
      {/* MENU PRINCIPAL */}
      <OrdersMainMenu
        actionButtonDrawerState={actionButtonDrawerState}
        onAddOrderClick={(title) => onAddOrderClick(title)}
      />
      {/* FORMULARIO DE MODIFICAR/ELIMINAR PEDIDOS */}
      {/* <OrdersDrawerForm
        orderDrawerState={orderDrawerState}
        orderDrawerFormState={orderDrawerFormState}
        submitFunction={(data: Order) => postOrUpdateOrder(data)}
        orderData={clickedItem}
      /> */}
    </Page>
  );
}
