import React from 'react'
import { FilterForm } from '../../components/Forms';

interface IContactsFilterFormProps {
    updateFilters:(filters:any)=>void;
}

const ContactsFilterForm : React.FC<IContactsFilterFormProps> = ({updateFilters}) => {
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
              name: "role",
              menu: [
                { name: "Clientes", value: "c" },
                { name: "Proveedores", value: "p" },
              ],
              defaultValue: "c"
            },
            {
              name: "order",
              menu: [
                { name: "Ordenar por nombre", value: "name" },
                { name: "Ordenar por deuda", value: "money" },
                {
                  name: "Ordenar por fecha de ult. Actualización",
                  value: "updated_at",
                },
              ],
              defaultValue: "name"
            },
          ],
        }}
      />
    )
}

export default ContactsFilterForm;