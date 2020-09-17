import React from "react";
import { ListItemStack, LoadMoreButton } from "../../components/Layout";
import { OrdersListItem } from "../../components/ListItems";
import { ServerOrder } from "../../services/interfaces";

interface IOrdersListProps {
  result: {
    payload: ServerOrder[];
    status: string;
    error: any;
  };
  count: number;
  onItemClick: (data: ServerOrder) => void;
  loadMoreData: () => void;
}

const OrdersList: React.FC<IOrdersListProps> = ({
  result,
  count,
  onItemClick,
  loadMoreData,
}) => {
  return (
    <ListItemStack maxHeight="55vh" noResult={(count===0&&!!result.payload)}>
      {result.status === "loaded" &&
        result.payload &&
        result.payload.length > 0 &&
        result.payload.map((data: ServerOrder) => {
          const {
            contact,
            products_count,
            delivered,
            sum,
            paid,
            updated_at
          } = data;
          return (
            <OrdersListItem
              name={contact.name}
              itemAmmount={products_count}
              delivered={delivered}
              sum={sum}
              debt={sum - paid}
              updatedAt={updated_at}
              onClick={() =>
                onItemClick(data)
              }
            />
          );
        })}
      {/* BOTON DE CARGAR MAS */}
      {result.payload && result.payload.length < count && (
        <LoadMoreButton action={loadMoreData} />
      )}
    </ListItemStack>
  );
};

export default OrdersList;
