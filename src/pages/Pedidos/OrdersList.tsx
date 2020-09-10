import React from "react";
import { ListItemStack, LoadMoreButton } from "../../components/Layout";
import {
  OrdersListItem,
} from "../../components/ListItems";
import { ServerOrder, Order } from "../../services/interfaces";

interface IOrdersListProps {
  result: {
    payload: ServerOrder[];
    status: string;
    error: any;
  };
  count: number;
  onItemClick: (data: Order) => void;
  loadMoreData: () => void;
}

const OrdersList: React.FC<IOrdersListProps> = ({
  result,
  count,
  onItemClick,
  loadMoreData,
}) => {
  return (
    <ListItemStack maxHeight="63vh">
      {result.status === "loaded" &&
        result.payload &&
        result.payload.map((data: ServerOrder) => {
          const {
            contact,
            products_count,
            delivered,
            sum,
            paid,
            updated_at,
            order_id,
            completed,
            type,
            contact_id,
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
                onItemClick({
                  contact,
                  products_count,
                  delivered,
                  sum,
                  paid,
                  order_id,
                  completed,
                  type,
                  contact_id,
                })
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
