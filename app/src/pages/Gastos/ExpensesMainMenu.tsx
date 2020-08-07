import React from "react";
import { DynamicDrawerMenu } from "../../components/Layout";
import { UseDisclosureReturn } from "@chakra-ui/core/dist/useDisclosure";

interface IExpensesMainMenuProps {
  actionButtonMenu: UseDisclosureReturn;
  onAddExpenseClick: (title: string) => void;
  onAddExpenseCategoryClick: UseDisclosureReturn;
}

const ExpensesMainMenu: React.FC<IExpensesMainMenuProps> = ({
  actionButtonMenu,
  onAddExpenseClick,
  onAddExpenseCategoryClick,
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
