import React from "react";
import { FilterStack, FilterDropdown } from "../Layout";
import { useForm, Controller } from "react-hook-form";
import { Input, FormControl } from "@chakra-ui/core";

interface IContactsFilterProps {
  setFilters: ({ search, role, order }: { search: string; role: string; order:string }) => void;
  search: string;
  role: string;
  order: string;
}

//TENGO QUE ABSTRAER ESTO USANDO UN ARREGLO CON LOS MENUS

const ContactsFilter: React.FC<IContactsFilterProps> = ({
  setFilters,
  search,
  role,
  order
}) => {
  const { register, handleSubmit, errors, formState, control } = useForm();
  const onSubmit = handleSubmit(({ search, role, order }) => {
    setFilters({ search, role, order });
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
          <Controller
            control={control}
            name="order"
            as={({ onChange, value, name }) => (
              <FilterDropdown
              menu={[
                { name: "Ordenar por nombre", value: "name" },
                { name: "Ordenar por deuda", value: "money" },
                {
                  name: "Ordenar por fecha de ult. Actualización",
                  value: "updated_at",
                },
              ]}
              onChange={(e) => onChange(e.target.value)}
              defaultValue={order}
              name={name}
            />
            )}
          />
         
        </form>
      </FormControl>
    </FilterStack>
  );
};

export default ContactsFilter;
