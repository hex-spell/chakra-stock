import React from "react";
import { Box, Text } from "@chakra-ui/core";
import { SubText, MoneyText, ListItemBox } from "../Layout";
import { FaMapMarkedAlt, FaPhoneAlt } from "react-icons/fa";
import { dateHelper } from "../../services";

interface IContactsListItemProps {
  name: string;
  address: string;
  phone: string;
  money: number;
  updatedAt: Date;
  onClick: () => void;
}

//Item de contactos, el div en la raiz fue necesario porque de no hacerlo tendria que haber hecho prop drilling con la prop "onClick" hasta el componente de la librería de chakra
const ContactsListItem: React.FC<IContactsListItemProps> = ({
  name,
  address,
  phone,
  money,
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
            <Box as={FaMapMarkedAlt} display="inline" mr="5px"/>
            {address}
          </SubText>
          <SubText>
            <Box as={FaPhoneAlt} display="inline" mr="5px"/>
            {phone}
          </SubText>
        </Box>
        <Box display="flex" flexDirection="column" textAlign="right" justifyContent="space-between">
          <Box><Text display="inline">{money>0 ? "A favor" : "Deuda"}: </Text><MoneyText ammount={money}/></Box>
          <SubText>{formattedUpdatedAtDate}</SubText>
        </Box>
      </ListItemBox>
    </div>
  );
};

export default ContactsListItem;
