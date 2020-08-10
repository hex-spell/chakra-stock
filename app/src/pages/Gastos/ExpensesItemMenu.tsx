import React from "react";
import { DynamicDrawerMenu } from "../../components/Layout";
import { UseDisclosureReturn } from "@chakra-ui/core/dist/useDisclosure";
import { IConfirmationMenu } from "../../context/Layout";
import { Expense } from "../../services/interfaces";

interface IExpensesItemMenuProps {
  //estado de este drawer
  listItemDrawerState: UseDisclosureReturn;
  //estado del drawer del formulario de modificar gastos
  expenseDrawerState: UseDisclosureReturn;
  //estado del drawer de "estas seguro?"
  confirmationDrawerState: UseDisclosureReturn;
  //datos del expenseo clickeado
  expenseData: Expense;
  //dispatch para abrir el drawer de confirmacion
  setConfirmationMenuData: (confirmationDrawerState: IConfirmationMenu) => void;
  //funcion de eliminar gasto por id
  deleteFunction: (expense_id:number)=>void;
}

const ExpensesItemMenu: React.FC<IExpensesItemMenuProps> = ({
  listItemDrawerState,
  expenseDrawerState,
  confirmationDrawerState,
  expenseData,
  setConfirmationMenuData,
  deleteFunction
}) => {
  const {description, expense_id} = expenseData;
  return (
    <DynamicDrawerMenu
      isOpen={listItemDrawerState.isOpen}
      onClose={listItemDrawerState.onClose}
      title={`Menu: ${description}`}
      menu={[
        {
          name: "Modificar",
          action: () => expenseDrawerState.onOpen(),
        },
        {
          name: "Eliminar",
          action: () => {
            //manda titulo y funcion para ejecutar al drawer de confirmacion, y lo abre
            setConfirmationMenuData({
              title: `eliminar ${description}`,
              action: () => deleteFunction(expense_id),
            });
            confirmationDrawerState.onOpen();
          },
        },
      ]}
    />
  );
};

export default ExpensesItemMenu;
