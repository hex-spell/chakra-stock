import React from "react";
import { DrawerForm } from "../../components/Forms";
import { UseDisclosureReturn } from "@chakra-ui/core/dist/useDisclosure";
import { ExpenseCategory } from "../../services/interfaces";
import { MenuOption } from "../../components/Layout/FilterDropdown";
import { IConfirmationMenu } from "../../context/Layout";

interface IModifyExpensesDrawerFormProps {
  categories: MenuOption[] | null;
  modifyExpenseCategoryMenu: UseDisclosureReturn;
  submitFunction: (data: ExpenseCategory) => void;
  deleteExpenseCategoryById: (id: number) => void;
  selectedCategory: number;
  //dispatch para dar datos al drawer de confirmacion
  setConfirmationMenu: (confirmationMenu: IConfirmationMenu) => void;
  //estado del drawer de "estas seguro?"
  confirmationMenu: UseDisclosureReturn;
}

const ModifyExpensesDrawerForm: React.FC<IModifyExpensesDrawerFormProps> = ({
  modifyExpenseCategoryMenu,
  submitFunction,
  categories,
  deleteExpenseCategoryById,
  selectedCategory,
  setConfirmationMenu,
  confirmationMenu,
}) => {
  return (
    <DrawerForm
      title={"Modificar categoría existente"}
      isOpen={modifyExpenseCategoryMenu.isOpen}
      onClose={modifyExpenseCategoryMenu.onClose}
      onFormSubmit={({ name, category_id }) => {
        submitFunction({ name, category_id });
      }}
      deleteFunction={(id: number) => {
        setConfirmationMenu({
          title: `eliminar la categoría seleccionada`,
          subtitle: "Todos los gastos que son de esta categoría serán eliminados en el proceso.",
          action: () => deleteExpenseCategoryById(id),
        });
        confirmationMenu.onOpen();
      }}
      deleteFieldName="category_id"
      inputs={[
        {
          name: "category_id",
          title: "Categoría",
          defaultValue: selectedCategory,
          options: categories,
          validationRules: {
            required: "Debes elegir una categoría",
            pattern: {
              value: /^[0-9]*$/,
              message: "La categoría debe ser un numero",
            },
          },
        },
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

export default ModifyExpensesDrawerForm;
