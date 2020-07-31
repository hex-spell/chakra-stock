import React from "react";
import { Box, Text } from "@chakra-ui/core";
import { SubText, MoneyText, ListItemBox } from "../Layout";

interface IStockListItemProps {
  title: string;
  ammount: number;
  price: number;
  updatedAt: string;
  onClick: () => void;
}

//Item de stock, el div en la raiz fue necesario porque de no hacerlo tendria que haber hecho prop drilling con la prop "onClick" hasta el componente de la librería de chakra
const StockListItem: React.FC<IStockListItemProps> = ({
  title,
  ammount,
  price,
  updatedAt,
  onClick,
}) => {
  return (
    <div onClick={()=>onClick()}>
      <ListItemBox>
        <Box display="flex" flexDirection="column" textAlign="left">
          <Text>{title}</Text>
          <SubText>
            {ammount} {ammount > 1 ? "unidades" : "unidad"}
          </SubText>
        </Box>
        <Box display="flex" flexDirection="column" textAlign="right">
          <MoneyText ammount={price}/>
          <SubText>{updatedAt}</SubText>
        </Box>
      </ListItemBox>
    </div>
  );
};

export default StockListItem;
