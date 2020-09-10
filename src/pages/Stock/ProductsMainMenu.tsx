import React from "react";
import { DynamicDrawerMenu } from "../../components/Layout";
import { UseDisclosureReturn } from "@chakra-ui/core/dist/useDisclosure";

interface IProductsMainMenuProps {
  actionButtonDrawerState: UseDisclosureReturn;
  onAddProductClick: (title: string) => void;
  onAddProductCategoryClick: UseDisclosureReturn;
  onModifyProductCategoryClick: UseDisclosureReturn;
}

const ProductsMainMenu: React.FC<IProductsMainMenuProps> = ({
  actionButtonDrawerState,
  onAddProductClick,
  onAddProductCategoryClick,
  onModifyProductCategoryClick
}) => {
  return (
    <DynamicDrawerMenu
      isOpen={actionButtonDrawerState.isOpen}
      onClose={actionButtonDrawerState.onClose}
      title="Menu: Stock"
      menu={[
        {
          name: "Registrar nueva categoría",
          action: () => {
            onAddProductCategoryClick.onOpen();
          },
        },
        {
          name: "Modificar categoría existente",
          action: () => {
            onModifyProductCategoryClick.onOpen();
          },
        },
        {
          name: "Registrar nuevo producto",
          action: () => {
            onAddProductClick("Registrar nuevo producto");
          },
        },
      ]}
    />
  );
};

export default ProductsMainMenu;
