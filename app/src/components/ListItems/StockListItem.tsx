import React from "react";
import { Box, Text } from "@chakra-ui/core";
import { SubText, MoneyText, ListItemBox } from "../Layout";

interface IStockListItemProps {
  title: string;
  ammount: number;
  price: number;
  lastUpdateDate: string;
  onClick: () => void;
}

const StockListItem: React.FC<IStockListItemProps> = ({
  title,
  ammount,
  price,
  lastUpdateDate,
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
          <MoneyText>${price}</MoneyText>
          <SubText>{lastUpdateDate}</SubText>
        </Box>
      </ListItemBox>
    </div>
  );
};

export default StockListItem;
