import React from "react";
import { DrawerForm } from "../../components/Forms";
import { UseDisclosureReturn } from "@chakra-ui/core/dist/useDisclosure";
import { Expense } from "../../services/interfaces";
import { MenuOption } from "../../components/Layout/FilterDropdown";

interface IExpensesDrawerFormProps {
  categories: MenuOption[] | null;
  expenseMenu: UseDisclosureReturn;
  expenseMenuFormState: {
    title: string;
    mode: string;
  };
  expenseData: Expense;
  submitFunction: (data: Expense) => void;
}

const ExpensesDrawerForm: React.FC<IExpensesDrawerFormProps> = ({
  expenseMenu,
  expenseMenuFormState,
  expenseData,
  submitFunction,
  categories
}) => {
  const { expense_id } = expenseData;
  return (
    <DrawerForm
      title={expenseMenuFormState.title}
      isOpen={expenseMenu.isOpen}
      onClose={expenseMenu.onClose}
      onFormSubmit={({ description, sum, category_id }) =>{
        submitFunction({ description, sum, category_id, expense_id })}
      }
      inputs={[
        {
          name: "description",
          title: "Descripción",
          defaultValue: expenseData.description,
          validationRules: {
            required: "Falta completar la descripcion",
            minLength: {
              value: 5,
              message: "La descripcion debe tener mínimo 5 caracteres",
            },
            maxLength: {
              value: 30,
              message: "La descripcion debe tener máximo 30 caracteres",
            },
          },
        },
        {
          name: "sum",
          title: "Suma",
          defaultValue: expenseData.sum,
          validationRules: {
            required: false,
            pattern: {
              value: /^-?[0-9]*$/,
              message: "El dinero debe ser numérico",
            },
          },
        },
        {
          name: "category_id",
          title: "Categoría",
          defaultValue: expenseData.category_id,
          options: categories,
          validationRules: {
            required: 'Debes elegir una categoría',
            pattern: {
              value: /^[0-9]*$/,
              message: "La categoría debe ser un numero",
            },
          },
        },
      ]}
    />
  );
};

export default ExpensesDrawerForm;
