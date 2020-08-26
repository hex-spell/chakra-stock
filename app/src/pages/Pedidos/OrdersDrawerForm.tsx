import React from "react";
import { DrawerForm } from "../../components/Forms";
import { UseDisclosureReturn } from "@chakra-ui/core/dist/useDisclosure";
import { Order } from "../../services/interfaces";
import { MenuOption } from "../../components/Layout/FilterDropdown";

interface IOrdersDrawerFormProps {
  categories: MenuOption[] | null;
  orderDrawerState: UseDisclosureReturn;
  orderDrawerFormState: {
    title: string;
    mode: string;
  };
  orderData: Order;
  submitFunction: (data: string) => void;
}

const OrdersDrawerForm: React.FC<IOrdersDrawerFormProps> = ({
  orderDrawerState,
  orderDrawerFormState,
  orderData,
  submitFunction,
  categories,
}) => {
  const { order_id } = orderData;
  return (
    <DrawerForm
      title={orderDrawerFormState.title}
      isOpen={orderDrawerState.isOpen}
      onClose={orderDrawerState.onClose}
      onFormSubmit={({ sum, }) => {
        submitFunction(sum);
      }}
      inputs={[
        /* {
          name: "category_id",
          title: "Categoría",
          defaultValue: orderData.category_id,
          options: categories,
          validationRules: {
            required:
              "Parece que no has creado ninguna categoría, hace eso primero",
            pattern: {
              value: /^[1-9]\d*$/,
              message:
                "Parece que no has creado ninguna categoría, hace eso primero",
            },
          },
        },
        {
          name: "description",
          title: "Descripción",
          defaultValue: orderData.description,
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
        }, */
        {
          name: "sum",
          title: "Suma",
          defaultValue: orderData.sum,
          validationRules: {
            required: false,
            pattern: {
              value: /^-?[0-9]*$/,
              message: "El dinero debe ser numérico",
            },
          },
        },
      ]}
    />
  );
};

export default OrdersDrawerForm;
