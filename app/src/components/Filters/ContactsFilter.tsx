import React from "react";
import { FilterStack, FilterDropdown } from "../Layout";
import { useForm, Controller } from "react-hook-form";
import { Input, FormControl } from "@chakra-ui/core";

interface IContactsFilterProps {
  setFilters: ({ search, role }: { search: string; role: string }) => void;
  search: string;
  role: string;
}

//TENGO QUE ABSTRAER ESTO USANDO UN ARREGLO CON LOS MENUS

const ContactsFilter: React.FC<IContactsFilterProps> = ({
  setFilters,
  search,
  role,
}) => {
  const { register, handleSubmit, errors, formState, control } = useForm();
  const onSubmit = handleSubmit(({ search, role }) => {
    setFilters({ search, role });
    console.log(search, role);
  });
  return (
    <FilterStack>
      <FormControl>
        <form onSubmit={onSubmit} onChange={onSubmit}>
          <Input
            name="search"
            placeholder="Buscar..."
            defaultValue=""
            ref={register}
          />
          <Controller
            control={control}
            name="role"
            as={({ onChange, value, name }) => (
              <FilterDropdown
                menu={[
                  { name: "Clientes", value: "c" },
                  { name: "Proveedores", value: "p" },
                ]}
                onChange={(e) => onChange(e.target.value)}
                defaultValue={role}
                name={name}
              />
            )}
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
          />
        </form>
      </FormControl>
    </FilterStack>
  );
};

export default ContactsFilter;
