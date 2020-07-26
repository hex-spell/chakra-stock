import React, { useState, useContext } from "react";
import {
  Page,
  ActionButton,
  FilterStack,
  FilterDropdown,
  ListItemStack,
  ListItemBox,
  DynamicDrawerMenu,
} from "../components/Layout";
import { FaListUl } from "react-icons/fa";
import { Searchbar } from "../components/Searchbar";
import { OrdersListItem } from "../components/ListItems";
import { ordersData } from "./";
import { useDisclosure, Stack, Checkbox } from "@chakra-ui/core";
import { LayoutContext, SET_CONFIRMATION_MENU } from "../context/Layout";

export default function Pedidos() {
  const [{ id, name }, setClickedItem] = useState({ id: 0, name: "error" });
  const listItemMenu = useDisclosure();
  const actionButtonMenu = useDisclosure();
  const { dispatch, confirmationMenuDisclosure } = useContext(LayoutContext);
  const onItemClick = (id: number, name: string) => {
    setClickedItem({ id, name });
    listItemMenu.onOpen();
  };
  return (
    <Page title="Pedidos">
      <FilterStack>
        <Searchbar />
        <FilterDropdown
          menu={[
            { name: "Ventas", value: "ventas" },
            { name: "Compras", value: "compras" },
          ]}
        />
        <FilterDropdown
          menu={[
            { name: "Pendientes", value: "pendientes" },
            { name: "Completadas", value: "completadas" },
          ]}
        />
        <FilterDropdown
          menu={[
            { name: "Ordenar por nombre", value: "ordenarPorNombre" },
            { name: "Ordenar por deuda", value: "ordenarPorDeuda" },
            {
              name: "Ordenar por fecha de ult. Actualización",
              value: "ordenarPorFecha",
            },
          ]}
        />
        <ListItemBox>
        {/* DEBERIA SEPARAR ESTE STACK EN UN COMPONENTE APARTE QUE TOME UN ARREGLO CON NOMBRES, VALORES BOOLEANOS Y FUNCIONES QUE LOS CAMBIAN, PARA MANEJAR SU ESTADO DESDE ACA */}
        <Stack spacing={10} isInline>
          <Checkbox>
            Omitir entregadas
          </Checkbox>
          <Checkbox>
            Omitir pagadas
          </Checkbox>
        </Stack>
        </ListItemBox>
      </FilterStack>
      <ListItemStack maxHeight="59vh">
        {ordersData.map(
          ({ name, itemAmmount, delivered, sum, debt, lastUpdateDate }) => (
            <OrdersListItem
              name={name}
              itemAmmount={itemAmmount}
              delivered={delivered}
              sum={sum}
              debt={debt}
              lastUpdateDate={lastUpdateDate}
              onClick={() => onItemClick(id, name)}
            />
          )
        )}
      </ListItemStack>
      <ActionButton
        icon={FaListUl}
        ariaLabel="Agregar Pedido"
        action={() => actionButtonMenu.onOpen()}
      />
      <DynamicDrawerMenu
        isOpen={listItemMenu.isOpen}
        onClose={listItemMenu.onClose}
        title={`Menu: Pedidos/${name}`}
        menu={[
          {
            name: "Modificar pedido",
            action: () => alert(`Modificar ${name}`),
          },
          {
            name: "Registrar pago",
            action: () => alert(`Registrar pago de ${name}`),
          },
          {
            name: "Marcar como entregado",
            action: () => alert(`Marcar pedido de ${name} como entregado`),
          },
          {
            name: "Marcar como completado",
            action: () => alert(`Marcar pedido de ${name} como completado`),
          },
          {
            name: "Eliminar",
            action: () => {
              //manda titulo y funcion para ejecutar al drawer de confirmacion, y lo abre
              dispatch({
                type: SET_CONFIRMATION_MENU,
                payload: {
                  title: `eliminar el pedido de ${name}`,
                  action: () => alert(`pedido de ${name} eliminado`),
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
        title="Menu: Pedidos"
        menu={[
          {
            name: "Registrar venta",
            action: () => {
              alert(`Registrar venta`);
            },
          },
          {
            name: "Registrar compra",
            action: () => {
              alert(`Registrar compra`);
            },
          },
        ]}
      />
    </Page>
  );
}
