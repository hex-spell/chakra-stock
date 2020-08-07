import React, { useState, useContext, useEffect } from "react";
import { Page, ActionButton } from "../../components/Layout";
import { FaBookOpen } from "react-icons/fa";
import { useDisclosure } from "@chakra-ui/core";
import { LayoutContext } from "../../context/Layout";
import { useExpensesService } from "../../services";
import {
  ExpensesFilterForm,
  ExpensesList,
  ExpensesItemMenu,
  ExpensesMainMenu,
  ExpenseCategoriesDrawerForm,
  ExpensesDrawerForm,
} from "./";
import { Expense, ExpenseCategory } from "../../services/interfaces";
import { MenuOption } from "../../components/Layout/FilterDropdown";

const ClickedItemInitialState: Expense = {
  expense_id: 0,
  category_id: 0,
  description: "",
  sum: 0,
};

interface IExpensesMenuState {
  title: string;
  mode: "error" | "edit" | "create";
  category_id: number;
}

export default function Gastos() {
  //guarda datos del gasto que clickeaste para usarlos en un formulario
  const [clickedItem, setClickedItem] = useState<Expense>(
    ClickedItemInitialState
  );

  //menu de clickear items
  const listItemMenu = useDisclosure();

  //menu de action button
  const actionButtonMenu = useDisclosure();

  //menu de crear/modifcar gasto
  const expenseMenu = useDisclosure();

  //menu de crear/modifcar categoría de gasto
  const expenseCategoryMenu = useDisclosure();

  //define si el formulario de gastos va a ser usado para modificar uno existente o agregar uno nuevo
  const [expenseMenuFormState, setExpenseMenuFormState] = useState({
    title: "error",
    mode: "error",
  });

  //menu de "estas seguro?"
  const { confirmationMenuDisclosure, setConfirmationMenu } = useContext(
    LayoutContext
  );

  //almacena los datos del item clickeado y modifica el estado del formulario de gastos
  const onItemClick = (data: Expense) => {
    setClickedItem({ ...data });
    setExpenseMenuFormState({
      title: `Modificar: ${data.description}`,
      mode: "edit",
    });
    listItemMenu.onOpen();
  };

  //funcion ejecutada por los botones de agregar
  const onAddExpenseClick = (title: string) => {
    //meto en el clickeditem los datos del estado inicial
    setClickedItem({ ...ClickedItemInitialState });
    setExpenseMenuFormState({ title, mode: "create" });
    expenseMenu.onOpen();
  };

  //servicio que toma valores de los filtros, hace una peticion al server y devuelve datos
  const {
    result,
    count,
    updateFilters,
    loadMoreData,
    postOrUpdateExpense,
    fetchExpenseCategories,
    postOrUpdateExpenseCategory,
    categories,
  } = useExpensesService();

  useEffect(() => {
    fetchExpenseCategories();
  }, [fetchExpenseCategories]);

  const [categoryDropdown, setCategoryDropdown] = useState<MenuOption[] | null>(
    null
  );

  useEffect(() => {
    if (categories) {
      setCategoryDropdown(
        categories.map(({ name, category_id }: ExpenseCategory) => ({
          name,
          value: category_id,
        }))
      );
    }
  }, [categories]);

  return (
    <Page title="Gastos">
      {/* DROPDOWNS Y BARRA DE BUSQUEDA */}
      <ExpensesFilterForm
        updateFilters={updateFilters}
        categories={categoryDropdown}
      />
      {/* LISTA DE GASTOS */}
      <ExpensesList
        result={result}
        count={count}
        onItemClick={onItemClick}
        loadMoreData={loadMoreData}
      />
      {/* BOTON DE MENU */}
      <ActionButton
        icon={FaBookOpen}
        ariaLabel="Menu: Gastos"
        action={() => actionButtonMenu.onOpen()}
      />
      {/* MENU DE GASTO ESPECIFICO */}
      <ExpensesItemMenu
        listItemMenu={listItemMenu}
        expenseMenu={expenseMenu}
        confirmationMenu={confirmationMenuDisclosure}
        expenseData={clickedItem}
        setConfirmationMenu={setConfirmationMenu}
      />
      {/* MENU PRINCIPAL */}
      <ExpensesMainMenu
        actionButtonMenu={actionButtonMenu}
        onAddExpenseClick={(title) => onAddExpenseClick(title)}
        onAddExpenseCategoryClick={expenseCategoryMenu}
      />
      {/* FORMULARIO DE MODIFICAR/ELIMINAR GASTOS */}
      <ExpensesDrawerForm
        categories={categoryDropdown}
        expenseMenu={expenseMenu}
        expenseMenuFormState={expenseMenuFormState}
        submitFunction={(data: Expense) => postOrUpdateExpense(data)}
        expenseData={clickedItem}
      />
      <ExpenseCategoriesDrawerForm
        submitFunction={postOrUpdateExpenseCategory}
        expenseCategoryMenu={expenseCategoryMenu}
        categories={categoryDropdown}
      />
    </Page>
  );
}
