import React from "react";
import { FilterForm } from "../../components/Forms";
import { MenuOption } from "../../components/Layout/FilterDropdown";

interface IProductsFilterFormProps {
  updateFilters: (filters: any) => void;
  categories: MenuOption[] | null;
}

const ProductsFilterForm: React.FC<IProductsFilterFormProps> = ({
  updateFilters,
  categories,
}) => {
  return (
    <FilterForm
      updateFilters={updateFilters}
      filtersData={{
        searchBar: {
          name: "search",
          defaultValue: "",
          placeholder: "Buscar...",
        },
        dropdowns: [
          {
            name: "category_id",
            // el valor 0 el server identifica como "todas las categorías"
            menu: categories
              ? [{ name: "Todas las categorías", value: "0" }, ...categories]
              : [{ name: "...", value: "0" }],
            defaultValue: 0,
          },
          {
            name: "order",
            menu: [
              { name: "Ordenar por nombre", value: "name" },
              { name: "Ordenar por stock", value: "stock" },
              {
                name: "Ordenar por fecha de actualización",
                value: "updated_at",
              },
              { name: "Ordenar por precio de venta", value: "sell_price" },
              { name: "Ordenar por precio de compra", value: "buy_price" },
            ],
            defaultValue: "name",
          },
        ],
      }}
    />
  );
};

export default ProductsFilterForm;
