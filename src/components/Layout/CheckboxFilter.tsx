import React from "react";
import { Stack, Checkbox } from "@chakra-ui/core";

type checkboxOption = {
  name: string;
  isChecked: boolean;
  onChange: () => void;
};

interface ICheckboxFilterProps {
  checkboxes: checkboxOption[];
}

//abstraccion de filtro checkbox, lo uso en pedidos como "omitir pagados" y "omitir entregados"
//recibe un arreglo con los checkboxes
const CheckboxFilter: React.FC<ICheckboxFilterProps> = ({ checkboxes }) => {
  return (
    <Stack spacing={10} isInline>
      {checkboxes.map(({ name, isChecked, onChange }) => (
        <Checkbox isChecked={isChecked} onChange={onChange}>
          {name}
        </Checkbox>
      ))}
    </Stack>
  );
};

export default CheckboxFilter;
