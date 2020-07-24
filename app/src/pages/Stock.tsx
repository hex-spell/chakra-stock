import React, { useState } from "react";
import {
  Page,
  ActionButton,
  ListItemStack,
  FilterStack,
  FilterDropdown,
  DynamicDrawerMenu,
} from "../components/Layout";
import { Searchbar } from "../components/Searchbar";
import { FaRegPlusSquare } from "react-icons/fa";
import { StockListItem } from "../components/ListItems";
import { useDisclosure } from "@chakra-ui/core";
import { data } from "./";

export default function Stock() {
  //mantiene en estado el item clickeado, usa el id para hacer consultas con la api
  const [{ id, name }, setClickedItem] = useState({ id: 0, name: "error" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  //guarda el nombre y el id del item en el estado y abre el drawer
  const onItemClick = (id: number, name: string) => {
    setClickedItem({ id, name });
    onOpen();
  };
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
            onClick={()=>onItemClick(id,title)}
          />
        ))}
      </ListItemStack>
      <ActionButton
        icon={FaRegPlusSquare}
        ariaLabel="Agregar Item"
        action={() => alert("hello!")}
      />
      <DynamicDrawerMenu
        isOpen={isOpen}
        onClose={onClose}
        title={name}
        menu={[{ name: "Modificar", action: () => alert(`Modificar ${id}`) },{ name: "Eliminar", action: () => alert(`Eliminar ${id}`) }]}
      />
    </Page>
  );
}
