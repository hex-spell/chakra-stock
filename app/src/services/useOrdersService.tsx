import {
  useEffect,
  useContext,
  useReducer,
  useCallback,
  useState,
} from "react";
import {
  IServiceState,
  Orders,
  IOrderFilters,
  ServerOrder,
  IServiceRequestParamsWithPagination,
  postOrUpdateOrder,
  OrderProduct,
  OrderProducts,
  PostOrderProduct,
  DeleteOrderProduct,
} from "./interfaces";
import { UserContext } from "../context/User";
import {
  serverReducerFactory,
  fetchFunctionFactory,
  postFunctionFactory,
  pageControlsFactory,
  deleteByIdFunctionFactory,
} from "./helpers";
import Axios, { AxiosResponse } from "axios";

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

  //esto queda fuera del reducer porque es muy especifico
  const [orderProducts, setOrderProducts] = useState<OrderProduct[] | null>(
    null
  );

  //funcion que obtiene los datos del server
  const fetchOrders = useCallback(
    (params: IServiceRequestParamsWithPagination, filters: IOrderFilters) => {
      fetchFunctionFactory<ServerOrder, IOrderFilters>(ordersDataUri, dispatch)(
        params,
        filters
      );
    },
    []
  );

  //funcion que obtiene los productos de un pedido
  const fetchOrderProductsByOrderId = useCallback(
    (order_id: number) => {
      Axios.get<OrderProducts>(`${ordersDataUri}/id/products`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { order_id },
      }).then((response: AxiosResponse<OrderProducts>) => {
        setOrderProducts(response.data.result);
        console.log(response);
      });
    },
    [token]
  );

  const postOrderProduct = useCallback(
    (data: PostOrderProduct) => {
      Axios.request<PostOrderProduct>({
        url: `${ordersDataUri}/products`,
        method: "POST",
        data,
        headers: { Authorization: `Bearer ${token}` },
      }).then(() => {
        fetchOrderProductsByOrderId(data.order_id);
      });
    },
    [fetchOrderProductsByOrderId, token]
  );

  const deleteOrderProduct = useCallback(
    (data: DeleteOrderProduct) => {
      Axios.request<DeleteOrderProduct>({
        url: `${ordersDataUri}/products`,
        method: "DELETE",
        data,
        headers: { Authorization: `Bearer ${token}` },
      }).then(() => {
        fetchOrderProductsByOrderId(data.order_id);
      });
    },
    [fetchOrderProductsByOrderId, token]
  );
  

  const deleteOrderById = (id: number) =>
    deleteByIdFunctionFactory(ordersDataUri, "order_id", token, () =>
      fetchOrders({ token, offset: 0 }, filters)
    )(id);

  //actualiza un pedido y despues refresca los datos con offset en 0
  const postOrUpdateOrder = (data: postOrUpdateOrder) =>
    postFunctionFactory<postOrUpdateOrder>(ordersDataUri, token, () =>
      fetchOrders({ token, offset: 0 }, filters)
    )(data, data.order_id);

  //un listener que se triggerea en el primer render y cada vez que se cambian los filtros o el offset
  useEffect(() => {
    fetchOrders({ offset, token }, filters);
  }, [filters, count, offset, token, fetchOrders]);

  const update = () => fetchOrders({ offset:0, token }, filters);

  return {
    result: state.results,
    count: state.count,
    updateFilters,
    update,
    loadMoreData,
    postOrUpdateOrder,
    deleteOrderById,
    fetchOrderProductsByOrderId,
    orderProducts,
    postOrderProduct,
    deleteOrderProduct
  };
};

export default useOrdersService;
