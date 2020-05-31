import React from "react";
import { Select } from "@chakra-ui/core";

type MenuOption = {
    name:string,
    value:string
}

interface IFilterDropdownProps {
    menu:MenuOption[];
}


//mapea un array de nombres con valores, va a ser usado para hacer requests al servidor filtrando datos
//por ahi utilizo un wrapper para manejar el estado
const FilterDropdown: React.FC<IFilterDropdownProps> = ({ menu }) => {
  return (
    <Select>
      {menu.map(({name,value})=><option value={value}>{name}</option>)}
    </Select>
  );
};

export default FilterDropdown;