import React from "react";
import { FilterForm } from "../../components/Forms";
import { MenuOption } from "../../components/Layout/FilterDropdown";

interface IExpensesFilterFormProps {
  updateFilters: (filters: any) => void;
  categories: MenuOption[] | null;
}

const ExpensesFilterForm: React.FC<IExpensesFilterFormProps> = ({
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
              {
                name: "Ordenar por fecha de creación",
                value: "created_at",
              },
              { name: "Ordenar por descripcion", value: "description" },
              { name: "Ordenar por suma", value: "sum" },
            ],
            defaultValue: "created_at",
          },
        ],
      }}
    />
  );
};

export default ExpensesFilterForm;
