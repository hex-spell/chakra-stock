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
  ModifyExpenseCategoriesDrawerForm,
} from "./";
import { Expense, Category } from "../../services/interfaces";
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

  //menu de clickear gastos
  const listItemDrawerState = useDisclosure();

  //menu de action button
  const actionButtonDrawerState = useDisclosure();

  //menu de crear/modifcar gasto
  const expenseDrawerState = useDisclosure();

  //menu de crear categoría de gasto
  const expenseCategoryDrawerState = useDisclosure();

  //menu de modifcar categoría de gasto
  const modifyExpenseCategoryDrawerState = useDisclosure();

  //define si el formulario de gastos va a ser usado para modificar uno existente o agregar uno nuevo
  const [expenseDrawerFormState, setExpenseMenuFormState] = useState({
    title: "error",
    mode: "error",
  });

  //menu de "estas seguro?"
  const { confirmationDrawerState, setConfirmationMenuData } = useContext(
    LayoutContext
  );

  //almacena los datos del item clickeado y modifica el estado del formulario de gastos
  const onItemClick = (data: Expense) => {
    setClickedItem({ ...data });
    setExpenseMenuFormState({
      title: `Modificar: ${data.description}`,
      mode: "edit",
    });
    listItemDrawerState.onOpen();
  };

  //funcion ejecutada por los botones de agregar
  const onAddExpenseClick = (title: string) => {
    //meto en el clickeditem los datos del estado inicial
    setClickedItem({ ...ClickedItemInitialState });
    setExpenseMenuFormState({ title, mode: "create" });
    expenseDrawerState.onOpen();
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
    deleteExpenseCategoryById,
    deleteExpenseById,
    categories,
    category_id
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
        categories.map(({ name, category_id }: Category) => ({
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
        action={() => actionButtonDrawerState.onOpen()}
      />
      {/* MENU DE GASTO ESPECIFICO */}
      <ExpensesItemMenu
        listItemDrawerState={listItemDrawerState}
        expenseDrawerState={expenseDrawerState}
        confirmationDrawerState={confirmationDrawerState}
        expenseData={clickedItem}
        setConfirmationMenuData={setConfirmationMenuData}
        deleteFunction={deleteExpenseById}
      />
      {/* MENU PRINCIPAL */}
      <ExpensesMainMenu
        actionButtonDrawerState={actionButtonDrawerState}
        onAddExpenseClick={(title) => onAddExpenseClick(title)}
        onAddExpenseCategoryClick={expenseCategoryDrawerState}
        onModifyExpenseCategoryClick={modifyExpenseCategoryDrawerState}
      />
      {/* FORMULARIO DE MODIFICAR/ELIMINAR GASTOS */}
      <ExpensesDrawerForm
        categories={categoryDropdown}
        expenseDrawerState={expenseDrawerState}
        expenseDrawerFormState={expenseDrawerFormState}
        submitFunction={(data: Expense) => postOrUpdateExpense(data)}
        expenseData={clickedItem}
      />
      {/* FORMULARIO DE CREAR CATEGORIA DE GASTOS */}
      {/* NO OLVIDARME DE HACER ERROR HANDLING PARA NOMBRES REPETIDOS */}
      <ExpenseCategoriesDrawerForm
        submitFunction={postOrUpdateExpenseCategory}
        expenseCategoryDrawerState={expenseCategoryDrawerState}
        categories={categoryDropdown}
      />
      {/* FORMULARIO DE MODIFICAR/ELIMINAR CATEGORIA DE GASTOS */}
      <ModifyExpenseCategoriesDrawerForm
        submitFunction={postOrUpdateExpenseCategory}
        modifyExpenseCategoryDrawerState={modifyExpenseCategoryDrawerState}
        categories={categoryDropdown}
        selectedCategory={category_id}
        deleteExpenseCategoryById={deleteExpenseCategoryById}
        confirmationDrawerState={confirmationDrawerState}
        setConfirmationMenuData={setConfirmationMenuData}
        expenseCategoryDrawerState={expenseCategoryDrawerState}
      />
    </Page>
  );
}
