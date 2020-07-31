import React from "react";
import { Select } from "@chakra-ui/core";

type MenuOption = {
    name:string,
    value:string
}

interface IFilterDropdownProps {
    menu:MenuOption[];
    onChange:()=>void;
    defaultValue:string;
    name:string;
    ref?:any;
}


//mapea un array de nombres con valores, va a ser usado para hacer requests al servidor filtrando datos
//por ahi utilizo un wrapper para manejar el estado
const FilterDropdown: React.FC<IFilterDropdownProps> = ({ menu, onChange, defaultValue, name, ref }) => {
  return (
    <Select onChange={onChange} defaultValue={defaultValue} name={name} ref={ref}>
      {menu.map(({name,value})=><option key={value} value={value} ref={ref}>{name}</option>) }
    </Select>
  );
};

export default FilterDropdown;