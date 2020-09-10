import { useEffect, useContext, useReducer, useCallback, useState } from "react";
import {
  Transaction,
  IServiceState,
  Transactions,
  ITransactionFilters,
  ServerTransaction,
  IServiceRequestParamsWithPagination,
  UpdateTransaction,
} from "./interfaces";
import { UserContext } from "../context/User";
import {
  serverReducerFactory,
  fetchFunctionFactory,
  postFunctionFactory,
  pageControlsFactory,
  fetchMenuOptionFunctionFactory,
} from "./helpers";
import { MenuOption } from "../components/Layout/FilterDropdown";

const localapi = process.env.REACT_APP_ROOT_API;
const contactsDataUri = localapi + "transactions";

const InitialState: IServiceState<Transactions, ITransactionFilters> = {
  filters: { search: "", type: "b", order: "name" },
  offset: 0,
  count: 0,
  results: {
    status: "loading",
    payload: null,
    error: null,
  },
};

const reducer = serverReducerFactory<Transactions, ITransactionFilters>();

//debería comenzar a hacer error handling con toasts

//esto se puede abstraer aun mas
const useTransactionsService = () => {
  const [state, dispatch] = useReducer(reducer, InitialState);
  const { filters, offset, count } = state;

  //token para autorizar las peticiones
  const {
    store: { token },
  } = useContext(UserContext);

  const {updateFilters,loadMoreData} = pageControlsFactory<ITransactionFilters>(dispatch,offset);

  //funcion que obtiene los datos del server
  const fetchTransactions = useCallback(
    (params: IServiceRequestParamsWithPagination, filters: ITransactionFilters) => {
      fetchFunctionFactory<ServerTransaction, ITransactionFilters>(
        contactsDataUri,
        dispatch
      )(params, filters);
    },
    []
  );

  //actualiza un contacto y despues refresca los datos con offset en 0
  const UpdateTransactionByID = (data: UpdateTransaction) =>
    postFunctionFactory<UpdateTransaction>(
      contactsDataUri,
      token,
      ()=>fetchTransactions({ token, offset: 0 }, filters)
    )(data, data.transaction_id);

  //un listener que se triggerea en el primer render y cada vez que se cambian los filtros o el offset
  useEffect(() => {
    fetchTransactions({ offset, token }, filters);
  }, [filters, count, offset, token, fetchTransactions]);

  return {
    result: state.results,
    count: state.count,
    updateFilters,
    loadMoreData,
    UpdateTransactionByID
  };
};

export default useTransactionsService;
