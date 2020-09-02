import React from "react";
import { DynamicDrawerMenu } from "../../components/Layout";
import { UseDisclosureReturn } from "@chakra-ui/core/dist/useDisclosure";
import { IConfirmationMenu } from "../../context/Layout";
import { Order, PostMarkCompleted } from "../../services/interfaces";

interface IOrdersItemMenuProps {
  //estado de este drawer
  listItemDrawerState: UseDisclosureReturn;
  //estado del drawer del formulario de modificar items de pedido
  orderProductsDrawerState: UseDisclosureReturn;
  //estado del drawer de "estas seguro?"
  confirmationDrawerState: UseDisclosureReturn;
  //datos del ordero clickeado
  orderData: Order;
  deliveredProductsDrawerState: UseDisclosureReturn;
  orderTransactionDrawerState: UseDisclosureReturn;
  //dispatch para abrir el drawer de confirmacion
  setConfirmationMenuData: (confirmationDrawerState: IConfirmationMenu) => void;
  //funcion de eliminar gasto por id
  deleteFunction: (order_id: number) => void;
  markCompleted: (data:PostMarkCompleted) => void;
}

const OrdersItemMenu: React.FC<IOrdersItemMenuProps> = ({
  listItemDrawerState,
  orderProductsDrawerState,
  confirmationDrawerState,
  deliveredProductsDrawerState,
  orderData,
  setConfirmationMenuData,
  orderTransactionDrawerState,
  markCompleted,
  deleteFunction,
}) => {
  const {
    contact: { name },
    order_id,
  } = orderData;
  return (
    <DynamicDrawerMenu
      isOpen={listItemDrawerState.isOpen}
      onClose={listItemDrawerState.onClose}
      title={`Menu: pedido de ${name}`}
      menu={[
        {
          name: "Ver productos",
          action: () => orderProductsDrawerState.onOpen(),
        },
        ...(!orderData.completed ? [{
          name: "Registrar entrega",
          action: () => deliveredProductsDrawerState.onOpen(),
        }] : []),
        ...(!orderData.completed ? [{
          name: "Registrar cobro",
          action: () => orderTransactionDrawerState.onOpen(),
        }] : []),
        ...(!orderData.completed ? [{
          name: "Finalizar pedido",
          action: () => {
            //manda titulo y funcion para ejecutar al drawer de confirmacion, y lo abre
            setConfirmationMenuData({
              title: `finalizar este pedido de ${name}`,
              subtitle: "No se podran realizarle más modificaciones",
              action: () => markCompleted({order_id}),
            });
            confirmationDrawerState.onOpen();
          },
        }] : []),
        {
          name: "Eliminar",
          action: () => {
            //manda titulo y funcion para ejecutar al drawer de confirmacion, y lo abre
            setConfirmationMenuData({
              title: `eliminar este pedido de ${name}`,
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
