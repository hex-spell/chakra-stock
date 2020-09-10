import React from "react";
import { ListItemStack, LoadMoreButton } from "../../components/Layout";
import { StockListItem } from "../../components/ListItems";
import { ServerProduct, Product } from "../../services/interfaces";

interface IProductsListProps {
  result: {
    payload: ServerProduct[];
    status: string;
    error: any;
  };
  count: number;
  onItemClick: (data: Product) => void;
  loadMoreData: () => void;
}

const ProductsList: React.FC<IProductsListProps> = ({
  result,
  count,
  onItemClick,
  loadMoreData,
}) => {
  return (
    <ListItemStack maxHeight="63vh">
      {result.status === "loaded" &&
        result.payload &&
        result.payload.map(
          ({
            name,
            buy_price,
            sell_price,
            created_at,
            updated_at,
            product_history_id,
            product_id,
            category_id,
            stock,
          }: ServerProduct) => (
            <StockListItem
              ammount={stock}
              title={name}
              sellPrice={sell_price}
              buyPrice={buy_price}
              //sisi, voy a cambiar esto
              updatedAt={created_at}
              onClick={() =>
                onItemClick({
                  name,
                  buy_price,
                  sell_price,
                  product_id,
                  category_id,
                  product_history_id,
                  stock,
                })
              }
            />
          )
        )}
      {/* BOTON DE CARGAR MAS */}
      {result.payload && result.payload.length < count && (
        <LoadMoreButton action={loadMoreData} />
      )}
    </ListItemStack>
  );
};

export default ProductsList;
