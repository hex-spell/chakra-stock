import React from "react";
import { Text } from "@chakra-ui/core";

interface IMoneyTextProps {
  red?: boolean;
}

const MoneyText: React.FC<IMoneyTextProps> = ({ children, red }) => {
  const color = red ? "darkred" : "darkgreen";
  return (
    <Text color={color} fontWeight="600">
      {children}
    </Text>
  );
};

export default MoneyText;
