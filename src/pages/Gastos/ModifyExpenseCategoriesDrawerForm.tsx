import React from "react";
import { DrawerForm } from "../../components/Forms";
import {
  UseDisclosureReturn,
} from "@chakra-ui/core/dist/useDisclosure";
import { Category } from "../../services/interfaces";
import { MenuOption } from "../../components/Layout/FilterDropdown";
import { IConfirmationMenu } from "../../context/Layout";
import { DynamicDrawerMenu } from "../../components/Layout";

interface IModifyExpensesDrawerFormProps {
  categories: MenuOption[] | null;
  modifyExpenseCategoryDrawerState: UseDisclosureReturn;
  submitFunction: (data: Category) => void;
  deleteExpenseCategoryById: (id: number) => void;
  selectedCategory: number;
  //dispatch para dar datos al drawer de confirmacion
  setConfirmationMenuData: (confirmationDrawerState: IConfirmationMenu) => void;
  //estado del drawer de "estas seguro?"
  confirmationDrawerState: UseDisclosureReturn;
  expenseCategoryDrawerState: UseDisclosureReturn;
}

const ModifyExpensesDrawerForm: React.FC<IModifyExpensesDrawerFormProps> = ({
  modifyExpenseCategoryDrawerState,
  submitFunction,
  categories,
  deleteExpenseCategoryById,
  selectedCategory,
  setConfirmationMenuData,
  confirmationDrawerState,
  expenseCategoryDrawerState
}) => {
  return (
    <>
      {categories && categories.length !== 0 ? (
        <DrawerForm
          title={"Modificar categoría existente"}
          isOpen={modifyExpenseCategoryDrawerState.isOpen}
          onClose={modifyExpenseCategoryDrawerState.onClose}
          onFormSubmit={({ name, category_id }) => {
            submitFunction({ name, category_id });
          }}
          deleteFunction={(id: number) => {
            setConfirmationMenuData({
              title: `eliminar la categoría seleccionada`,
              subtitle:
                "• Todos los gastos que son de esta categoría serán eliminados en el proceso.",
              action: () => deleteExpenseCategoryById(id),
            });
            confirmationDrawerState.onOpen();
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
      ) : (
        <DynamicDrawerMenu
          isOpen={modifyExpenseCategoryDrawerState.isOpen}
          onClose={modifyExpenseCategoryDrawerState.onClose}
          title="Parece que no has creado ninguna categoría"
          subtitle="¿Desea crear una ahora mismo?"
          menu={[
            {
              name: "Chi que chi",
              action: () => expenseCategoryDrawerState.onOpen(),
            },
            { name: "Ño", action: () => modifyExpenseCategoryDrawerState.onClose() },
          ]}
        />
      )}
    </>
  );
};

export default ModifyExpensesDrawerForm;
