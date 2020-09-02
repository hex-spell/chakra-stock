import React from "react";
import { FilterForm } from "../../components/Forms";

interface IOrdersFilterFormProps {
  updateFilters: (filters: any) => void;
}

const OrdersFilterForm: React.FC<IOrdersFilterFormProps> = ({
  updateFilters,
}) => {
  return (
    <FilterForm
      updateFilters={updateFilters}
      filtersData={{
        searchBar: {
          name: "search",
          defaultValue: "",
          placeholder: "Buscar (por nombre de contacto)...",
        },
        dropdowns: [
          {
            name: "type",
            menu: [
              {
                name: "Compras",
                value: "a",
              },
              { name: "Ventas", value: "b" },
            ],
            defaultValue: "b",
          },
          {
            name: "completed",
            menu: [
              { name: "Pendientes", value: "not_completed" },
              { name: "Completadas", value: "completed" },    
            ],
            defaultValue: "not_completed",
          },
          {
            name: "delivered",
            menu: [
              {
                name: "Entregas finalizadas y pendientes",
                value: "all",
              },
              { name: "Entregas finalizadas", value: "delivered" },
              { name: "Entregas pendientes", value: "not_delivered" },
            ],
            defaultValue: "all",
          },
          /* {
            name: "order",
            menu: [
              {
                name: "Ordenar por fecha de creación",
                value: "created_at",
              },
              { name: "Ordenar por descripcion", value: "description" },
              { name: "Ordenar por suma", value: "sum" },
            ],
            defaultValue: "created_at",
          }, */
        ],
      }}
    />
  );
};

export default OrdersFilterForm;
