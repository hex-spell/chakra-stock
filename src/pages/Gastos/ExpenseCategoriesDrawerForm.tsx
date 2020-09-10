import React from "react";
import { DrawerForm } from "../../components/Forms";
import { UseDisclosureReturn } from "@chakra-ui/core/dist/useDisclosure";
import { Category } from "../../services/interfaces";
import { MenuOption } from "../../components/Layout/FilterDropdown";

interface IExpensesDrawerFormProps {
  categories: MenuOption[] | null;
  expenseCategoryDrawerState: UseDisclosureReturn;
  submitFunction: (data: Category) => void;
}

const ExpensesDrawerForm: React.FC<IExpensesDrawerFormProps> = ({
  expenseCategoryDrawerState,
  submitFunction,
  categories
}) => {
  return (
    <DrawerForm
      title={"Crear nueva categoría"}
      isOpen={expenseCategoryDrawerState.isOpen}
      onClose={expenseCategoryDrawerState.onClose}
      onFormSubmit={({ name, category_id }) =>
        submitFunction({ name, category_id })
      }
      inputs={[
        {
          name: "name",
          title: "Nombre",
          defaultValue: "",
          validationRules: {
            required: "Falta completar el nombre",
            minLength: {
              value: 5,
              message: "El nombre debe tener mínimo 5 caracteres",
            },
            maxLength: {
              value: 30,
              message: "El nombre debe tener máximo 30 caracteres",
            },
          },
        },
      ]}
    />
  );
};

export default ExpensesDrawerForm;
