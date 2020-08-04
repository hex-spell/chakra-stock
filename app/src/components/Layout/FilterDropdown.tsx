import React from "react";
import { Select } from "@chakra-ui/core";

type MenuOption = {
    name:string,
    value:string
}

interface IFilterDropdownProps {
    menu:MenuOption[];
    onChange:(e:any|null)=>void | any;
    defaultValue:string;
    name:string;
}


//mapea un array de nombres con valores, va a ser usado para hacer requests al servidor filtrando datos
//por ahi utilizo un wrapper para manejar el estado
const FilterDropdown: React.FC<IFilterDropdownProps> = ({ menu, onChange, defaultValue, name }) => {
  return (
    <Select onChange={onChange} defaultValue={defaultValue} name={name}>
      {menu.map(({name,value})=><option key={value} value={value}>{name}</option>) }
    </Select>
  );
};

export default FilterDropdown;