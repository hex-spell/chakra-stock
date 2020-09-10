import { useEffect, useContext, useReducer, useCallback } from "react";
import {
  ServerExpense,
  Expenses,
  Category,
  IServiceState,
  IExpenseFilters,
  IServiceRequestParamsWithPagination,
  Expense,
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
const expensesDataUri = localapi + "expenses";
const expenseCategoriesDataUri = expensesDataUri + "/categories";

const InitialState: IServiceState<Expenses, IExpenseFilters> = {
  categories: null,
  filters: { search: "", category_id: null, order: "created_at" },
  offset: 0,
  count: 0,
  results: {
    status: "loading",
    payload: null,
    error: null,
  },
};

const reducer = serverReducerFactory<Expenses, IExpenseFilters>();

//debería comenzar a hacer error handling con toasts

const useExpensesService = () => {
  const [state, dispatch] = useReducer(reducer, InitialState);
  const { filters, offset, categories } = state;

  //token para autorizar las peticiones
  const {
    store: { token },
  } = useContext(UserContext);

  const {updateFilters,loadMoreData} = pageControlsFactory<IExpenseFilters>(dispatch,offset);

  //funcion que obtiene los datos del server
  const fetchExpenseCategories = useCallback(() => {
    fetchCategoryFunctionFactory(expenseCategoriesDataUri, token, dispatch)();
  }, [token]);

  //funcion que obtiene los datos del server
  const fetchExpenses = useCallback(
    (params: IServiceRequestParamsWithPagination, filters: IExpenseFilters) => {
      fetchFunctionFactory<ServerExpense, IExpenseFilters>(
        expensesDataUri,
        dispatch
      )(params, filters);
    },
    []
  );

  //actualiza un gasto y despues refresca los datos con offset en 0
  const postOrUpdateExpense = (data: Expense) =>
    postFunctionFactory<Expense>(
      expensesDataUri,
      token,
      ()=>fetchExpenses({ token, offset: 0 }, filters)
    )(data, data.expense_id);

  const postOrUpdateExpenseCategory = (data: Category) =>
    postFunctionFactory<Category>(
      expenseCategoriesDataUri,
      token,
      fetchExpenseCategories
    )(data, data.category_id);

  //elimina una categoria por id
  const deleteExpenseCategoryById = (id: number) =>
    deleteByIdFunctionFactory(
      expenseCategoriesDataUri,
      "category_id",
      token,
      ()=>fetchExpenseCategories()
    )(id);

  //elimina un gasto por id
  const deleteExpenseById = (id: number) =>
  deleteByIdFunctionFactory(
    expensesDataUri,
    "expense_id",
    token,
    ()=>fetchExpenses({ token, offset: 0 }, filters)
  )(id);

  //un listener que se triggerea en el primer render y cada vez que se cambian los filtros o el offset
  useEffect(() => {
    fetchExpenses({ token, offset: 0 }, filters)
  }, [token, filters, fetchExpenses]);

  return {
    result: state.results,
    count: state.count,
    updateFilters,
    loadMoreData,
    postOrUpdateExpense,
    fetchExpenseCategories,
    postOrUpdateExpenseCategory,
    deleteExpenseCategoryById,
    deleteExpenseById,
    categories,
    category_id : filters.category_id,
  };
};

export default useExpensesService;
