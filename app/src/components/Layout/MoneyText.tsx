import React from "react";
import { Text } from "@chakra-ui/core";

interface IMoneyTextProps {
  ammount: number;
}

//texto verde y bold, si red es true pasa a ser rojo
const MoneyText: React.FC<IMoneyTextProps> = ({ ammount }) => {
  const color = ammount<0 ? "darkred" : "darkgreen";
  return (
    <Text color={color} fontWeight="600" display="inline">
      {ammount<0 ? `-$${-ammount}` : `$${ammount}`}
    </Text>
  );
};

export default MoneyText;
