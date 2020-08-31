import React from "react";
import { DrawerForm } from "../../components/Forms";
import {
  UseDisclosureReturn,
} from "@chakra-ui/core/dist/useDisclosure";
import { Category } from "../../services/interfaces";
import { MenuOption } from "../../components/Layout/FilterDropdown";
import { IConfirmationMenu } from "../../context/Layout";
import { DynamicDrawerMenu } from "../../components/Layout";

//ESTE TAMBIEN ES IGUAL AL DE LOS GASTOS, PUEDO USAR EL MISMO

interface IModifyProductsDrawerFormProps {
  categories: MenuOption[] | null;
  modifyProductCategoryDrawerState: UseDisclosureReturn;
  submitFunction: (data: Category) => void;
  deleteProductCategoryById: (id: number) => void;
  selectedCategory: number;
  //dispatch para dar datos al drawer de confirmacion
  setConfirmationMenuData: (confirmationDrawerState: IConfirmationMenu) => void;
  //estado del drawer de "estas seguro?"
  confirmationDrawerState: UseDisclosureReturn;
  productCategoryDrawerState: UseDisclosureReturn;
}

const ModifyProductsDrawerForm: React.FC<IModifyProductsDrawerFormProps> = ({
  modifyProductCategoryDrawerState,
  submitFunction,
  categories,
  deleteProductCategoryById,
  selectedCategory,
  setConfirmationMenuData,
  confirmationDrawerState,
  productCategoryDrawerState
}) => {
  return (
    <>
      {categories && categories.length !== 0 ? (
        <DrawerForm
          title={"Modificar categoría existente"}
          isOpen={modifyProductCategoryDrawerState.isOpen}
          onClose={modifyProductCategoryDrawerState.onClose}
          onFormSubmit={({ name, category_id }) => {
            submitFunction({ name, category_id });
          }}
          deleteFunction={(id: number) => {
            setConfirmationMenuData({
              title: `eliminar la categoría seleccionada`,
              subtitle:
                "• Todos los productos que son de esta categoría serán eliminados en el proceso.",
              action: () => deleteProductCategoryById(id),
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
          isOpen={modifyProductCategoryDrawerState.isOpen}
          onClose={modifyProductCategoryDrawerState.onClose}
          title="Parece que no has creado ninguna categoría"
          subtitle="¿Desea crear una ahora mismo?"
          menu={[
            {
              name: "Chi que chi",
              action: () => productCategoryDrawerState.onOpen(),
            },
            { name: "Ño", action: () => modifyProductCategoryDrawerState.onClose() },
          ]}
        />
      )}
    </>
  );
};

export default ModifyProductsDrawerForm;
