import React from 'react'
import { FilterForm } from '../../components/Forms';

interface ITransactionsFilterFormProps {
    updateFilters:(filters:any)=>void;
}

const TransactionsFilterForm : React.FC<ITransactionsFilterFormProps> = ({updateFilters}) => {
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
              name: "type",
              menu: [
                { name: "Cobros", value: "b" },
                { name: "Pagos", value: "a" },
              ],
              defaultValue: "b"
            }
          ],
        }}
      />
    )
}

export default TransactionsFilterForm;