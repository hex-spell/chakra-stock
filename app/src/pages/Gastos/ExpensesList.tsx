import React from "react";
import { ListItemStack, LoadMoreButton } from "../../components/Layout";
import { TransactionsListItem } from "../../components/ListItems";
import { ServerExpense, Expense } from "../../services/interfaces";

interface IExpensesListProps {
  result: {
    payload:ServerExpense[];
    status:string;
    error:any;
  };
  count: number;
  onItemClick: (data: Expense) => void;
  loadMoreData: () => void;
}

const ExpensesList: React.FC<IExpensesListProps> = ({
  result,
  count,
  onItemClick,
  loadMoreData,
}) => {
  return (
    <ListItemStack maxHeight="63vh">
      {result.status==="loaded" && result.payload &&
        result.payload.map(
          ({
            description,
            sum,
            created_at,
            updated_at,
            expense_id,
            category_id
          }: ServerExpense) => (
            <TransactionsListItem
              title={description}
              sum={-sum}
              createdAt={created_at}
              onClick={() =>
                onItemClick({ description, expense_id, category_id, sum })
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

export default ExpensesList;
