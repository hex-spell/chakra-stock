import React from "react";
import { DynamicDrawerMenu } from "../../components/Layout";
import { UseDisclosureReturn } from "@chakra-ui/core/dist/useDisclosure";
import { IConfirmationMenu } from "../../context/Layout";
import { Transaction } from "../../services/interfaces";

interface ITransactionsItemMenuProps {
  //estado de este drawer
  listItemMenu: UseDisclosureReturn;
  //estado del drawer del formulario de modificar transactionos
  transactionMenu: UseDisclosureReturn;
  //estado del drawer de "estas seguro?"
  confirmationDrawerState: UseDisclosureReturn;
  //datos del transactiono clickeado
  transactionData: Transaction;
  //dispatch para abrir el drawer de confirmacion
  setConfirmationMenuData: (confirmationDrawerState: IConfirmationMenu) => void;
}

const TransactionsItemMenu: React.FC<ITransactionsItemMenuProps> = ({
  listItemMenu,
  transactionMenu,
  confirmationDrawerState,
  transactionData,
  setConfirmationMenuData
}) => {
  const {name} = transactionData;
  return (
    <DynamicDrawerMenu
      isOpen={listItemMenu.isOpen}
      onClose={listItemMenu.onClose}
      title={`Menu: ${name}`}
      menu={[
        {
          name: "Modificar",
          action: () => transactionMenu.onOpen(),
        },
        {
          name: "Eliminar",
          action: () => {
            //manda titulo y funcion para ejecutar al drawer de confirmacion, y lo abre
            setConfirmationMenuData({
              title: `eliminar transaccion de ${name}`,
              action: () => alert(`${name} eliminado`),
            });
            confirmationDrawerState.onOpen();
          },
        },
      ]}
    />
  );
};

export default TransactionsItemMenu;
