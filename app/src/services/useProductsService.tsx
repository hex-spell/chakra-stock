import { useEffect, useContext, useReducer, useCallback } from "react";
import {
  ServerProduct,
  Products,
  Category,
  IServiceState,
  IProductFilters,
  IServiceRequestParamsWithPagination,
  Product,
} from "./interfaces";
import { UserContext } from "../context/User";
import {
  serverReducerFactory,
  fetchCategoryFunctionFactory,
  fetchFunctionFactory,
  postFunctionFactory,
  deleteByIdFunctionFactory,
  pageControlsFactory,
} from "./helpers";

const localapi = process.env.REACT_APP_ROOT_API;
const expensesDataUri = localapi + "products";
const expenseCategoriesDataUri = expensesDataUri + "/categories";

const InitialState: IServiceState<Products, IProductFilters> = {
  categories: null,
  filters: { search: "", category_id: null, order: "name" },
  offset: 0,
  count: 0,
  results: {
    status: "loading",
    payload: null,
    error: null,
  },
};

const reducer = serverReducerFactory<Products, IProductFilters>();

//debería comenzar a hacer error handling con toasts

const useProductsService = () => {
  const [state, dispatch] = useReducer(reducer, InitialState);
  const { filters, offset, categories } = state;

  //token para autorizar las peticiones
  const {
    store: { token },
  } = useContext(UserContext);

  const {updateFilters,loadMoreData} = pageControlsFactory<IProductFilters>(dispatch,offset);

  //funcion que obtiene los datos del server
  const fetchProductCategories = useCallback(() => {
    fetchCategoryFunctionFactory(expenseCategoriesDataUri, token, dispatch)();
  }, [token]);

  //funcion que obtiene los datos del server
  const fetchProducts = useCallback(
    (params: IServiceRequestParamsWithPagination, filters: IProductFilters) => {
      fetchFunctionFactory<ServerProduct, IProductFilters>(
        expensesDataUri,
        dispatch
      )(params, filters);
    },
    []
  );

  //actualiza un contacto y despues refresca los datos con offset en 0
  const postOrUpdateProduct = (data: Product) =>
    postFunctionFactory<Product>(
      expensesDataUri,
      token,
      ()=>fetchProducts({ token, offset: 0 }, filters)
    )(data, data.product_id);

  const postOrUpdateProductCategory = (data: Category) =>
    postFunctionFactory<Category>(
      expenseCategoriesDataUri,
      token,
      fetchProductCategories
    )(data, data.category_id);

  //elimina una categoria por id
  const deleteProductCategoryById = (id: number) =>
    deleteByIdFunctionFactory(
      expenseCategoriesDataUri,
      "category_id",
      token,
      ()=>fetchProductCategories()
    )(id);

  //elimina un producto por id
  const deleteProductById = (id: number) =>
  deleteByIdFunctionFactory(
    expensesDataUri,
    "product_id",
    token,
    ()=>fetchProducts({ token, offset: 0 }, filters)
  )(id);

  //un listener que se triggerea en el primer render y cada vez que se cambian los filtros o el offset
  useEffect(() => {
    fetchProducts({ token, offset: 0 }, filters)
  }, [token, filters, fetchProducts]);

  return {
    result: state.results,
    count: state.count,
    updateFilters,
    loadMoreData,
    postOrUpdateProduct,
    fetchProductCategories,
    postOrUpdateProductCategory,
    deleteProductCategoryById,
    deleteProductById,
    categories,
    category_id : filters.category_id,
  };
};

export default useProductsService;
