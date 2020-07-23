import React from "react";
import { Box, Text } from "@chakra-ui/core";
import { SubText, MoneyText, ListItemBox } from "../Layout";

interface IStockListItemProps {
  title: string;
  ammount: number;
  price: number;
  lastUpdateDate: string;
}

const StockListItem: React.FC<IStockListItemProps> = ({
  title,
  ammount,
  price,
  lastUpdateDate,
}) => {
  return (
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
  );
};

export default StockListItem;
