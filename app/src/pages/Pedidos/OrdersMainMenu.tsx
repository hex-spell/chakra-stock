import React from "react";
import { DynamicDrawerMenu } from "../../components/Layout";
import { UseDisclosureReturn } from "@chakra-ui/core/dist/useDisclosure";

interface IOrdersMainMenuProps {
  actionButtonDrawerState: UseDisclosureReturn;
  onAddOrderClick: (title: string) => void;
}

const OrdersMainMenu: React.FC<IOrdersMainMenuProps> = ({
  actionButtonDrawerState,
  onAddOrderClick,
}) => {
  return (
    <DynamicDrawerMenu
      isOpen={actionButtonDrawerState.isOpen}
      onClose={actionButtonDrawerState.onClose}
      title="Menu: Pedidos"
      menu={[
        {
          name: "Registrar nuevo pedido",
          action: () => {
            onAddOrderClick("Registrar nuevo pedido");
          },
        },
      ]}
    />
  );
};

export default OrdersMainMenu;
