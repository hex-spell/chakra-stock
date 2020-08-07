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
            menu: categories ? categories : [{ name: "...", value: "1" }],
          },
          {
            name: "order",
            menu: [
              { name: "Ordenar por descripcion", value: "description" },
              { name: "Ordenar por suma", value: "sum" },
              {
                name: "Ordenar por fecha de creación",
                value: "created_at",
              },
            ],
          },
        ],
      }}
    />
  );
};

export default ExpensesFilterForm;
