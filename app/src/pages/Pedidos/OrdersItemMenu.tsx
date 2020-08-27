import React from "react";
import { DynamicDrawerMenu } from "../../components/Layout";
import { UseDisclosureReturn } from "@chakra-ui/core/dist/useDisclosure";
import { IConfirmationMenu } from "../../context/Layout";
import { Order } from "../../services/interfaces";

interface IOrdersItemMenuProps {
  //estado de este drawer
  listItemDrawerState: UseDisclosureReturn;
  //estado del drawer del formulario de modificar items de pedido
  orderProductsDrawerState: UseDisclosureReturn;
  //estado del drawer de "estas seguro?"
  confirmationDrawerState: UseDisclosureReturn;
  //datos del ordero clickeado
  orderData: Order;
  //dispatch para abrir el drawer de confirmacion
  setConfirmationMenuData: (confirmationDrawerState: IConfirmationMenu) => void;
  //funcion de eliminar gasto por id
  deleteFunction: (order_id:number)=>void;
}

const OrdersItemMenu: React.FC<IOrdersItemMenuProps> = ({
  listItemDrawerState,
  orderProductsDrawerState,
  confirmationDrawerState,
  orderData,
  setConfirmationMenuData,
  deleteFunction
}) => {
  const {contact:{name}, order_id} = orderData;
  return (
    <DynamicDrawerMenu
      isOpen={listItemDrawerState.isOpen}
      onClose={listItemDrawerState.onClose}
      title={`Menu: pedido de ${name}`}
      menu={[
        {
          name: "Agregar Productos",
          action: () => orderProductsDrawerState.onOpen(),
        },
        {
          name: "Eliminar",
          action: () => {
            //manda titulo y funcion para ejecutar al drawer de confirmacion, y lo abre
            setConfirmationMenuData({
              title: `eliminar pedido de ${name}`,
              action: () => deleteFunction(order_id),
            });
            confirmationDrawerState.onOpen();
          },
        },
      ]}
    />
  );
};

export default OrdersItemMenu;
