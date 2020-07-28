import React, { useState, useContext } from "react";
import { LayoutContext, SET_CONFIRMATION_MENU } from "../context/Layout";
import {
  Page,
  ListItemStack,
  FilterStack,
  DynamicDrawerMenu,
  ActionButton,
} from "../components/Layout";
import { Searchbar } from "../components/Searchbar";
import { TransactionsListItem } from "../components/ListItems";
import { useDisclosure } from "@chakra-ui/core";
import { expensesData } from "./";
import { FaBookOpen } from "react-icons/fa";

//TENGO QUE VER SI USAR FECHA DE REGISTRO O DE ULTIMA MODIFICACION, O AMBAS
//Pagina de gastos, tengo que ver si agregar las funciones con la api del backend en este componente o hacer un wrapper
export default function Gastos() {
  //mantiene en estado el item clickeado, usa el id para hacer consultas con la api
  const [{ id, name }, setClickedItem] = useState({ id: 0, name: "error" });
  const listItemMenu = useDisclosure();
  const actionButtonMenu = useDisclosure();
  //guarda el nombre y el id del item en el estado y abre el drawer
  const onItemClick = (id: number, name: string) => {
    setClickedItem({ id, name });
    listItemMenu.onOpen();
  };
  const { dispatch, confirmationMenuDisclosure } = useContext(LayoutContext);
  return (
    <Page title="Gastos">
      <FilterStack>
        <Searchbar />
      </FilterStack>
      <ListItemStack maxHeight="80vh">
        {expensesData.map(({ title, sum, lastUpdateDate, id }) => (
          <TransactionsListItem
            title={title}
            sum={sum}
            lastUpdateDate={lastUpdateDate}
            onClick={() => onItemClick(id, title)}
          />
        ))}
      </ListItemStack>
      <DynamicDrawerMenu
        isOpen={listItemMenu.isOpen}
        onClose={listItemMenu.onClose}
        title={`Menu: ${name}`}
        menu={[
          { name: "Modificar", action: () => alert(`Modificar ${name}`) },
          {
            name: "Eliminar",
            action: () => {
              //manda titulo y funcion para ejecutar al drawer de confirmacion, y lo abre
              dispatch({
                type: SET_CONFIRMATION_MENU,
                payload: {
                  title: `eliminar ${name}`,
                  action: () => alert(`${name} eliminado`),
                },
              });
              confirmationMenuDisclosure.onOpen();
            },
          },
        ]}
      />
      <ActionButton
        icon={FaBookOpen}
        ariaLabel="Agregar Pedido"
        action={() => actionButtonMenu.onOpen()}
      />
      <DynamicDrawerMenu
        isOpen={actionButtonMenu.isOpen}
        onClose={actionButtonMenu.onClose}
        title="Menu: Gastos"
        menu={[
          {
            name: "Registrar gasto",
            action: () => {
              alert(`Registrar gasto`);
            },
          },
        ]}
      />
    </Page>
  );
}
