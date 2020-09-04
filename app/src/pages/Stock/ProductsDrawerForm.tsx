import React from "react";
import { DrawerForm } from "../../components/Forms";
import { UseDisclosureReturn } from "@chakra-ui/core/dist/useDisclosure";
import { Product, PostProduct } from "../../services/interfaces";
import { MenuOption } from "../../components/Layout/FilterDropdown";

interface IProductsDrawerFormProps {
  categories: MenuOption[] | null;
  productDrawerState: UseDisclosureReturn;
  productDrawerFormState: {
    title: string;
    mode: string;
  };
  productData: Product;
  submitFunction: (data: PostProduct) => void;
}

const ProductsDrawerForm: React.FC<IProductsDrawerFormProps> = ({
  productDrawerState,
  productDrawerFormState,
  productData,
  submitFunction,
  categories,
}) => {
  const { product_id } = productData;
  return (
    <DrawerForm
      title={productDrawerFormState.title}
      isOpen={productDrawerState.isOpen}
      onClose={productDrawerState.onClose}
      onFormSubmit={({ name, buy_price, sell_price, stock, category_id }) => {
        submitFunction({
          name,
          buy_price,
          sell_price,
          stock,
          category_id,
          product_id
        });
      }}
      inputs={[
        {
          name: "category_id",
          title: "Categoría",
          defaultValue: productData.category_id,
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
          name: "name",
          title: "Nombre",
          defaultValue: productData.name,
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
          name: "buy_price",
          title: "Precio de compra",
          defaultValue: productData.buy_price,
          validationRules: {
            required: "Falta completar el precio de venta",
            pattern: {
              value: /^-?[0-9]*$/,
              message: "El dinero debe ser numérico",
            },
          },
        },
        {
          name: "sell_price",
          title: "Precio de venta",
          defaultValue: productData.sell_price,
          validationRules: {
            required: "Falta completar el precio de compra",
            pattern: {
              value: /^-?[0-9]*$/,
              message: "El dinero debe ser numérico",
            },
          },
        },
        {
          name: "stock",
          title: "Cantidad en stock",
          defaultValue: productData.stock,
          validationRules: {
            required: "Falta completar el número en stock",
            pattern: {
              value: /^-?[0-9]*$/,
              message: "El stock debe ser numérico",
            },
          },
        },
      ]}
    />
  );
};

export default ProductsDrawerForm;
