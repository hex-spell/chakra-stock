import React from "react";
import { Button } from "@chakra-ui/core";

interface ILoadMoreButtonProps {
  action: () => void;
}

const LoadMoreButton: React.FC<ILoadMoreButtonProps> = ({action}) => {
  return (
    <Button variantColor="teal" variant="ghost" width="100%" onClick={action}>
      Cargar más resultados...
    </Button>
  );
};

export default LoadMoreButton;
