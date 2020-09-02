import React from "react";
import { Box, Text, Checkbox } from "@chakra-ui/core";
import { SubText, MoneyText, ListItemBox } from "../Layout";
import { dateHelper } from "../../services";

interface IOrdersListItemProps {
  name: string;
  itemAmmount: number;
  delivered: boolean;
  sum: number;
  debt: number;
  updatedAt: Date;
  onClick: () => void;
}

//Item de pedidos, el div en la raiz fue necesario porque de no hacerlo tendria que haber hecho prop drilling con la prop "onClick" hasta el componente de la librería de chakra
const OrdersListItem: React.FC<IOrdersListItemProps> = ({
  name,
  itemAmmount,
  delivered,
  sum,
  debt,
  updatedAt,
  onClick,
}) => {
  const updatedAtDate = new Date(updatedAt);
  const formattedUpdatedAtDate = dateHelper(updatedAtDate);
  return (
    <div onClick={() => onClick()}>
      <ListItemBox>
        <Box display="flex" flexDirection="column" textAlign="left">
          <Text>{name}</Text>
          <SubText>
            {itemAmmount} {itemAmmount > 1 ? "items" : "item"}
          </SubText>
          <SubText>
            <Checkbox isChecked={delivered} size="sm">
              Entregado
            </Checkbox>
          </SubText>
        </Box>
        <Box display="flex" flexDirection="column" textAlign="right">
          <Box>
            <Text display="inline"> Suma: </Text>
            <MoneyText ammount={sum} />
          </Box>
          {
            debt >=0 ?
            <Box>
              <Text display="inline"> Falta pagar: </Text>
              <MoneyText ammount={debt} red />
            </Box> :
            <Box>
            <Text display="inline"> Quedó a favor: </Text>
            <MoneyText ammount={-debt} />
          </Box>
          }
          <SubText>{formattedUpdatedAtDate}</SubText>
        </Box>
      </ListItemBox>
    </div>
  );
};

export default OrdersListItem;
