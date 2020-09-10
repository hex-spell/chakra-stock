import React, { useState, useContext } from "react";
import { Page } from "../../components/Layout";
import { useDisclosure } from "@chakra-ui/core";
import { LayoutContext } from "../../context/Layout";
import { useTransactionsService } from "../../services";
import {
  TransactionsFilterForm,
  TransactionsList,
  TransactionsItemMenu,
} from "./";
import TransactionsDrawerForm from "./TransactionsDrawerForm";
import { Transaction, UpdateTransaction } from "../../services/interfaces";

const ClickedItemInitialState: Transaction = {
  transaction_id: 0,
  name: "",
  sum: 0,
  type: "b",
  order_id: 0,
  contact_id: 0,
};

interface ITransactionsMenuState {
  title: string;
  mode: "error" | "edit" | "create";
  type: "c" | "p";
}

export default function Transactionos() {
  //guarda datos del transactiono que clickeaste para usarlos en un formulario
  const [
    clickedItem,
    setClickedItem,
  ] = useState<Transaction>(ClickedItemInitialState);

  //menu de clickear items
  const listItemMenu = useDisclosure();

  //menu de crear/modifcar transactiono
  const transactionMenu = useDisclosure();

  //menu de "estas seguro?"
  const { confirmationDrawerState, setConfirmationMenuData } = useContext(
    LayoutContext
  );

  //almacena los datos del item clickeado y modifica el estado del formulario de transactionos
  const onItemClick = (data: Transaction) => {
    setClickedItem({ ...data });
    listItemMenu.onOpen();
  };

  //servicio que toma valores de los filtros, hace una peticion al server y devuelve datos
  const {
    result,
    count,
    updateFilters,
    loadMoreData,
    UpdateTransactionByID,
  } = useTransactionsService();

  return (
    <Page title="Transacciones">
      {/* DROPDOWNS Y BARRA DE BUSQUEDA */}
      <TransactionsFilterForm updateFilters={updateFilters} />
      {/* LISTA DE CONTACTOS */}
      <TransactionsList
        result={result}
        count={count}
        onItemClick={onItemClick}
        loadMoreData={loadMoreData}
      />
      {/* MENU DE CONTACTO ESPECIFICO */}
      <TransactionsItemMenu
        listItemMenu={listItemMenu}
        transactionMenu={transactionMenu}
        confirmationDrawerState={confirmationDrawerState}
        transactionData={clickedItem}
        setConfirmationMenuData={setConfirmationMenuData}
      />
      {/* FORMULARIO DE MODIFICAR/ELIMINAR CONTACTOS */}
      <TransactionsDrawerForm
        transactionMenu={transactionMenu}
        submitFunction={(data: UpdateTransaction) => UpdateTransactionByID(data)}
        transactionData={clickedItem}
      />
    </Page>
  );
}
