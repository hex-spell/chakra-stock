import React from "react";
import { Text } from "@chakra-ui/core";

const SubText: React.FC = ({ children }) => {
  return (
    <Text opacity={0.7} fontSize="sm">
      {children}
    </Text>
  );
};

export default SubText;
