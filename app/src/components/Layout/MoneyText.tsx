import React from "react";
import { Text } from "@chakra-ui/core";

interface IMoneyTextProps {
  ammount: number;
  red?: boolean;
}

//texto verde y bold, si red es true pasa a ser rojo
const MoneyText: React.FC<IMoneyTextProps> = ({ ammount, red }) => {
  //si es positivo, el numero es verde, si es negativo es rojo
  //pero si el booleano "red" es true, el numero va a ser rojo igual
  const color = ammount<0 ? "darkred" : red ? "darkred" : "darkgreen";
  return (
    <Text color={color} fontWeight="600" display="inline">
      {/* RE-ACOMODA EL SIGNO MENOS EN LA SINTAXIS */}
      {ammount<0 ? `$${-ammount}` : `$${ammount}`}
    </Text>
  );
};

export default MoneyText;
