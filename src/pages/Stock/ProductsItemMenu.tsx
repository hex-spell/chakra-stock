import React from "react";
import { DynamicDrawerMenu } from "../../components/Layout";
import { UseDisclosureReturn } from "@chakra-ui/core/dist/useDisclosure";
import { IConfirmationMenu } from "../../context/Layout";
import { Product } from "../../services/interfaces";

interface IProductsItemMenuProps {
  //estado de este drawer
  listItemDrawerState: UseDisclosureReturn;
  //estado del drawer del formulario de modificar gastos
  productDrawerState: UseDisclosureReturn;
  //estado del drawer de "estas seguro?"
  confirmationDrawerState: UseDisclosureReturn;
  //datos del producto clickeado
  productData: Product;
  //dispatch para abrir el drawer de confirmacion
  setConfirmationMenuData: (confirmationDrawerState: IConfirmationMenu) => void;
  //funcion de eliminar gasto por id
  deleteFunction: (product_id:number)=>void;
}

const ProductsItemMenu: React.FC<IProductsItemMenuProps> = ({
  listItemDrawerState,
  productDrawerState,
  confirmationDrawerState,
  productData,
  setConfirmationMenuData,
  deleteFunction
}) => {
  const {name, product_id} = productData;
  return (
    <DynamicDrawerMenu
      isOpen={listItemDrawerState.isOpen}
      onClose={listItemDrawerState.onClose}
      title={`Menu: ${name}`}
      menu={[
        {
          name: "Modificar",
          action: () => productDrawerState.onOpen(),
        },
        {
          name: "Eliminar",
          action: () => {
            //manda titulo y funcion para ejecutar al drawer de confirmacion, y lo abre
            setConfirmationMenuData({
              title: `eliminar ${name}`,
              action: () => deleteFunction(product_id),
            });
            confirmationDrawerState.onOpen();
          },
        },
      ]}
    />
  );
};

export default ProductsItemMenu;
