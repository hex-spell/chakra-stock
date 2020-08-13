import React, { useState, useContext } from "react";
import { LayoutContext, SET_CONFIRMATION_MENU } from "../context/Layout";
import {
  Page,
  ActionButton,
  ListItemStack,
  FilterStack,
  FilterDropdown,
  DynamicDrawerMenu,
} from "../components/Layout";
import { FaDropbox } from "react-icons/fa";
import { StockListItem } from "../components/ListItems";
import { useDisclosure, Input } from "@chakra-ui/core";
import { stockData } from "./";


//Pagina de stock, tengo que ver si agregar las funciones con la api del backend en este componente o hacer un wrapper
export default function Stock() {
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
    <Page title="Stock">
      <FilterStack>
      <Input name="search" />
        <FilterDropdown
          menu={[
            { name: "Todas las categorías", value: "all" },
            { name: "Especias", value: "especias" },
            { name: "Cotillón", value: "cotillon" },
          ]}
          onChange={()=>console.log("hello")}
          defaultValue="all"
          name="hello"
        />
      </FilterStack>
      <ListItemStack maxHeight="72vh">
        {stockData.map(({ title, ammount, price, updatedAt, id }) => (
          <StockListItem
            title={title}
            ammount={ammount}
            price={price}
            updatedAt={updatedAt}
            onClick={() => onItemClick(id, title)}
          />
        ))}
      </ListItemStack>
      <ActionButton
        icon={FaDropbox}
        ariaLabel="Agregar Item"
        action={() => actionButtonMenu.onOpen()}
      />
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
      <DynamicDrawerMenu
        isOpen={actionButtonMenu.isOpen}
        onClose={actionButtonMenu.onClose}
        title="Menu: Stock"
        menu={[
          {
            name: "Sumar producto existente al inventario",
            action: () => {
              alert(`Sumar producto existente a stock`);
            },
          },
          {
            name: "Registrar producto nuevo",
            action: () => {
              alert(`Registrar producto nuevo`);
            },
          },
          {
            name: "Modificar categorías",
            action: () => {
              alert(`Modificar categorías`);
            },
          },
        ]}
      />
    </Page>
  );
}
