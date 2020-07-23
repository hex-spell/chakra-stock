import React from "react";
import { Page, ActionButton, ListItemStack, FilterStack } from "../components/Layout";
import { Searchbar } from "../components/Searchbar";
import { FilterDropdown } from "../components/FilterDropdown";
import { FaRegPlusSquare } from "react-icons/fa";
import { StockListItem } from "../components/ListItems";

export default function Stock() {
  const data = [
    {
      title: "Galletitas 1kg",
      ammount: 3,
      price: 300,
      lastUpdateDate: "2/3/2010",
    },
    {
      title: "Galletitas 1kg",
      ammount: 3,
      price: 300,
      lastUpdateDate: "2/3/2010",
    },
    {
      title: "Galletitas 1kg",
      ammount: 3,
      price: 300,
      lastUpdateDate: "2/3/2010",
    },
    {
      title: "Galletitas 1kg",
      ammount: 3,
      price: 300,
      lastUpdateDate: "2/3/2010",
    },
    {
      title: "Galletitas 1kg",
      ammount: 3,
      price: 300,
      lastUpdateDate: "2/3/2010",
    },
    {
      title: "Galletitas 1kg",
      ammount: 3,
      price: 300,
      lastUpdateDate: "2/3/2010",
    },
    {
      title: "Galletitas 1kg",
      ammount: 3,
      price: 300,
      lastUpdateDate: "2/3/2010",
    },
    {
      title: "Galletitas 1kg",
      ammount: 3,
      price: 300,
      lastUpdateDate: "2/3/2010",
    },
    {
      title: "Galletitas 1kg",
      ammount: 3,
      price: 300,
      lastUpdateDate: "2/3/2010",
    },
    {
      title: "Galletitas 1kg",
      ammount: 3,
      price: 300,
      lastUpdateDate: "2/3/2010",
    },
    {
      title: "Galletitas 1kg",
      ammount: 3,
      price: 300,
      lastUpdateDate: "2/3/2010",
    },
  ];
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
      <ListItemStack
        maxHeight="72vh"
      >
        {data.map(({ title, ammount, price, lastUpdateDate }) => (
          <StockListItem
            title={title}
            ammount={ammount}
            price={price}
            lastUpdateDate={lastUpdateDate}
          />
        ))}
      </ListItemStack>
      <ActionButton
        icon={FaRegPlusSquare}
        ariaLabel="Agregar Item"
        action={() => alert("hello!")}
      />
    </Page>
  );
}
