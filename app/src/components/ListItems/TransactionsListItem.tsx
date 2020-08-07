import React from "react";
import { Box, Text } from "@chakra-ui/core";
import { SubText, MoneyText, ListItemBox } from "../Layout";
import { dateHelper } from "../../services";

interface ITransactionsListItemProps {
  title: string;
  sum: number;
  createdAt: Date;
  onClick: () => void;
}

//Item de stock, el div en la raiz fue necesario porque de no hacerlo tendria que haber hecho prop drilling con la prop "onClick" hasta el componente de la librería de chakra
const TransactionsListItem: React.FC<ITransactionsListItemProps> = ({
  title,
  sum,
  createdAt,
  onClick,
}) => {
  const createdAtDate = new Date(createdAt);
  const formattedCreatedAtDate = dateHelper(createdAtDate);
  return (
    <div onClick={()=>onClick()}>
      <ListItemBox>
        <Box display="flex" flexDirection="column" textAlign="left">
          <Text>{title}</Text>
        </Box>
        <Box display="flex" flexDirection="column" textAlign="right">
          <MoneyText ammount={sum}/>
          <SubText>{formattedCreatedAtDate}</SubText>
        </Box>
      </ListItemBox>
    </div>
  );
};

export default TransactionsListItem;
