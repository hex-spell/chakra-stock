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
import { Searchbar } from "../components/Searchbar";
import { FaDropbox } from "react-icons/fa";
import { StockListItem } from "../components/ListItems";
import { useDisclosure } from "@chakra-ui/core";
import { data } from "./";

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
        <Searchbar />
        <FilterDropdown
          menu={[
            { name: "Todas las categorías", value: "all" },
            { name: "Especias", value: "especias" },
            { name: "Cotillón", value: "cotillon" },
          ]}
        />
      </FilterStack>
      <ListItemStack maxHeight="72vh">
        {data.map(({ title, ammount, price, lastUpdateDate, id }) => (
          <StockListItem
            title={title}
            ammount={ammount}
            price={price}
            lastUpdateDate={lastUpdateDate}
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
        title={name}
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
            name: "Registrar producto nuevo",
            action: () => {
              alert(`Registrar producto nuevo`);
            },
          },
          {
            name: "Sumar producto existente a stock",
            action: () => {
              alert(`Sumar producto existente a stock`);
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
