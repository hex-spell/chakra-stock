import { useEffect, useContext, useReducer, useCallback } from "react";
import {
  Order,
  IServiceState,
  Orders,
  IOrderFilters,
  ServerOrder,
  IServiceRequestParamsWithPagination,
} from "./interfaces";
import { UserContext } from "../context/User";
import {
  serverReducerFactory,
  fetchFunctionFactory,
  postFunctionFactory,
  pageControlsFactory,
  deleteByIdFunctionFactory,
} from "./helpers";

const localapi = process.env.REACT_APP_ROOT_API;
const ordersDataUri = localapi + "orders";

const InitialState: IServiceState<Orders, IOrderFilters> = {
  filters: {
    search: "",
    type: "a",
    completed: "all",
    delivered: "all" /* , order: "name" */,
  },
  offset: 0,
  count: 0,
  results: {
    status: "loading",
    payload: null,
    error: null,
  },
};

const reducer = serverReducerFactory<Orders, IOrderFilters>();

//debería comenzar a hacer error handling con toasts

//esto se puede abstraer aun mas
const useOrdersService = () => {
  const [state, dispatch] = useReducer(reducer, InitialState);
  const { filters, offset, count } = state;

  //token para autorizar las peticiones
  const {
    store: { token },
  } = useContext(UserContext);

  const { updateFilters, loadMoreData } = pageControlsFactory<IOrderFilters>(
    dispatch,
    offset
  );

  //funcion que obtiene los datos del server
  const fetchOrders = useCallback(
    (params: IServiceRequestParamsWithPagination, filters: IOrderFilters) => {
      fetchFunctionFactory<ServerOrder, IOrderFilters>(
        ordersDataUri,
        dispatch
      )(params, filters);
    },
    []
  );

   //elimina un gasto por id
   const deleteOrderById = (id: number) =>
   deleteByIdFunctionFactory(
     ordersDataUri,
     "order_id",
     token,
     ()=>fetchOrders({ token, offset: 0 }, filters)
   )(id);

  //actualiza un ordero y despues refresca los datos con offset en 0
  const postOrUpdateOrder = (data: Order) =>
    postFunctionFactory<Order>(ordersDataUri, token, () =>
      fetchOrders({ token, offset: 0 }, filters)
    )(data, data.order_id);

  //un listener que se triggerea en el primer render y cada vez que se cambian los filtros o el offset
  useEffect(() => {
    fetchOrders({ offset, token }, filters);
  }, [filters, count, offset, token, fetchOrders]);

  return {
    result: state.results,
    count: state.count,
    updateFilters,
    loadMoreData,
    postOrUpdateOrder,
    deleteOrderById
  };
};

export default useOrdersService;
