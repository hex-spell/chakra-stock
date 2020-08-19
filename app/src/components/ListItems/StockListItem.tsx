import React from "react";
import { Box, Text, Flex } from "@chakra-ui/core";
import { SubText, MoneyText, ListItemBox } from "../Layout";
import { dateHelper } from "../../services";
import { FaCartArrowDown, FaCoins } from "react-icons/fa";

interface IStockListItemProps {
  title: string;
  ammount: number;
  buyPrice: number;
  sellPrice: number;
  updatedAt: Date;
  onClick: () => void;
}

//Item de stock, el div en la raiz fue necesario porque de no hacerlo tendria que haber hecho prop drilling con la prop "onClick" hasta el componente de la librería de chakra
const StockListItem: React.FC<IStockListItemProps> = ({
  title,
  ammount,
  buyPrice,
  sellPrice,
  updatedAt,
  onClick,
}) => {
  const updatedAtDate = new Date(updatedAt);
  const formattedUpdatedAtDate = dateHelper(updatedAtDate);
  return (
    <div onClick={() => onClick()}>
      <ListItemBox>
        <Flex direction="column" textAlign="left">
          <Text>{title}</Text>
          <SubText>
            {ammount} {ammount > 1 ? "unidades" : "unidad"}
          </SubText>
        </Flex>
        <Box flexDirection="column" textAlign="right" alignItems="right" maxWidth="40%">
          <Box display="flex" justifyContent="flex-end" flexWrap="wrap" maxWidth="100%" alignItems="right">
            <Box display="flex" m="5px" mr="0" flexDirection="column" alignItems={buyPrice<10000?"center":"flex-end"} textAlign="center">
              <Box mr={buyPrice<10000?"0":"1"} as={FaCartArrowDown}/>
              <MoneyText red ammount={buyPrice} />
            </Box>
            <Box display="flex" m="5px" mr="0" flexDirection="column" alignItems={sellPrice<10000?"center":"flex-end"} textAlign="center">
              <Box mr={sellPrice<10000?"0":"1"} as={FaCoins}/>
              <MoneyText ammount={sellPrice} />
            </Box>
          </Box>
          <SubText>{formattedUpdatedAtDate}</SubText>
        </Box>
      </ListItemBox>
    </div>
  );
};

export default StockListItem;
