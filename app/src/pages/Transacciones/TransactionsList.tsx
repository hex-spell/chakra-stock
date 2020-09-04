import React from "react";
import { ListItemStack, LoadMoreButton } from "../../components/Layout";
import { TransactionsListItem } from "../../components/ListItems";
import { ServerTransaction, Transaction } from "../../services/interfaces";

interface ITransactionsListProps {
  result: {
    payload: ServerTransaction[];
    status: string;
    error: any;
  };
  count: number;
  onItemClick: (data: Transaction) => void;
  loadMoreData: () => void;
}

const TransactionsList: React.FC<ITransactionsListProps> = ({
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
            transaction_id,
            name,
            sum,
            type,
            order_id,
            contact_id,
            created_at,
          }: ServerTransaction) => (
            <TransactionsListItem
              title={name}
              sum={sum}
              createdAt={created_at}
              onClick={() =>
                onItemClick({
                  transaction_id,
                  name,
                  sum,
                  type,
                  order_id,
                  contact_id,
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

export default TransactionsList;
