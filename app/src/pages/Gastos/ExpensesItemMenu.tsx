import React from "react";
import { DynamicDrawerMenu } from "../../components/Layout";
import { UseDisclosureReturn } from "@chakra-ui/core/dist/useDisclosure";
import { IConfirmationMenu } from "../../context/Layout";
import { Expense } from "../../services/interfaces";

interface IExpensesItemMenuProps {
  //estado de este drawer
  listItemMenu: UseDisclosureReturn;
  //estado del drawer del formulario de modificar gastos
  expenseMenu: UseDisclosureReturn;
  //estado del drawer de "estas seguro?"
  confirmationMenu: UseDisclosureReturn;
  //datos del expenseo clickeado
  expenseData: Expense;
  //dispatch para abrir el drawer de confirmacion
  setConfirmationMenu: (confirmationMenu: IConfirmationMenu) => void;
}

const ExpensesItemMenu: React.FC<IExpensesItemMenuProps> = ({
  listItemMenu,
  expenseMenu,
  confirmationMenu,
  expenseData,
  setConfirmationMenu
}) => {
  const {description} = expenseData;
  return (
    <DynamicDrawerMenu
      isOpen={listItemMenu.isOpen}
      onClose={listItemMenu.onClose}
      title={`Menu: ${description}`}
      menu={[
        {
          name: "Modificar",
          action: () => /* alert(`Modificar ${name}`) */ expenseMenu.onOpen(),
        },
        {
          name: "Eliminar",
          action: () => {
            //manda titulo y funcion para ejecutar al drawer de confirmacion, y lo abre
            setConfirmationMenu({
              title: `eliminar ${description}`,
              action: () => alert(`${description} eliminado`),
            });
            confirmationMenu.onOpen();
          },
        },
      ]}
    />
  );
};

export default ExpensesItemMenu;
