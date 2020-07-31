import React from "react";
import { FilterStack, FilterDropdown } from "../Layout";
import { useForm } from "react-hook-form";
import { Input, FormControl } from "@chakra-ui/core";

interface IContactsFilterProps {
  setFilters: ({ search, role }: { search: string; role: string }) => void;
  search: string;
  role: string;
}

const ContactsFilter: React.FC<IContactsFilterProps> = ({
  setFilters,
  search,
  role,
}) => {
  const { register, handleSubmit, errors, formState } = useForm();
  const onSubmit = handleSubmit(({ _search, _role }) => {
    setFilters({ search, role });
    console.log(_search,_role);
  });
  return (
    <FilterStack>
      <FormControl>
        <form onSubmit={onSubmit}>
          <Input name="_search" placeholder="Buscar..." defaultValue="" ref={register}/>
          <FilterDropdown
            menu={[
              { name: "Clientes", value: "c" },
              { name: "Proveedores", value: "p" },
            ]}
            onChange={() => console.log("no implementado")}
            defaultValue={role}
            name="_role"
            ref={register}
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
            onChange={() => console.log("no implementado")}
            defaultValue="ordenarPorNombre"
            name="order"
            ref={register}
          />
        </form>
      </FormControl>
    </FilterStack>
  );
};

export default ContactsFilter;
