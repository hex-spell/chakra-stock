import React from "react";
import { DynamicDrawerMenu } from "../../components/Layout";
import { UseDisclosureReturn } from "@chakra-ui/core/dist/useDisclosure";

interface IExpensesMainMenuProps {
  actionButtonMenu: UseDisclosureReturn;
  onAddExpenseClick: (title: string) => void;
  onAddExpenseCategoryClick: UseDisclosureReturn;
  onModifyExpenseCategoryClick: UseDisclosureReturn;
}

const ExpensesMainMenu: React.FC<IExpensesMainMenuProps> = ({
  actionButtonMenu,
  onAddExpenseClick,
  onAddExpenseCategoryClick,
  onModifyExpenseCategoryClick
}) => {
  return (
    <DynamicDrawerMenu
      isOpen={actionButtonMenu.isOpen}
      onClose={actionButtonMenu.onClose}
      title="Menu: Gastos"
      menu={[
        {
          name: "Registrar nueva categoría",
          action: () => {
            onAddExpenseCategoryClick.onOpen();
          },
        },
        {
          name: "Modificar categoría existente",
          action: () => {
            onModifyExpenseCategoryClick.onOpen();
          },
        },
        {
          name: "Registrar nuevo gasto",
          action: () => {
            onAddExpenseClick("Registrar nuevo gasto");
          },
        },
      ]}
    />
  );
};

export default ExpensesMainMenu;
