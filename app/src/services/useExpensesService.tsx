import { useEffect, useContext, useReducer, useCallback } from "react";
import { Service, ServerExpense, Expense, ExpenseCategory } from "./interfaces";
import { UserContext } from "../context/User";
import axios, { AxiosResponse } from "axios";
import {
  SET_FILTERS,
  SET_OFFSET,
  SET_RESULTS,
  PUSH_RESULTS,
  SET_CATEGORIES,
} from "./constants";

const localapi = process.env.REACT_APP_ROOT_API;
const expensesDataUri = localapi + "expenses";
const expenseCategoriesDataUri = expensesDataUri + "/categories";

//contenido del response de expenses
export interface Expenses {
  expenses: ServerExpense[];
  count: number;
}

//parametros del request
export interface IExpenseFilters {
  search: string;
  category_id: number | null;
  order: "description" | "sum" | "created_at";
}

interface IExpenseRequestParams extends IExpenseFilters {
  offset: number;
  token: string;
}

interface IExpensesServiceState extends IExpenseFilters {
  offset: number;
  count: number;
  results: Service<Expenses>;
  categories: ExpenseCategory[] | null;
}

const InitialState: IExpensesServiceState = {
  categories: null,
  search: "",
  category_id: null,
  order: "created_at",
  offset: 0,
  count: 0,
  results: {
    status: "loading",
    payload: null,
    error: null,
  },
};

const reducer = (
  state: IExpensesServiceState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case SET_FILTERS:
      const { search, category_id, order } = action.payload;
      return { ...state, search, category_id, order, offset: 0 };
    case SET_OFFSET:
      return { ...state, offset: action.payload };
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case SET_RESULTS:
      console.log(SET_RESULTS, action.payload.results);
      return {
        ...state,
        results: action.payload.results,
        count: action.payload.count,
        offset: 0,
      };
    case PUSH_RESULTS:
      console.log(PUSH_RESULTS);
      return {
        ...state,
        count: action.payload.count,
        results: {
          status: action.payload.results.status,
          error: action.payload.results.error,
          payload: [
            ...state.results.payload,
            ...action.payload.results.payload,
          ],
        },
      };
    default:
      throw new Error();
  }
};

//debería comenzar a hacer error handling con toasts

const useExpensesService = () => {
  const [state, dispatch] = useReducer(reducer, InitialState);
  const { search, category_id, order, offset, categories } = state;

  //token para autorizar las peticiones
  const {
    store: { token },
  } = useContext(UserContext);

  //cambia los filtros usados en los parametros del request fetchExpenses
  //por el useEffect esta funcion triggerea el request mismo
  const updateFilters = (filters: IExpenseFilters) => {
    dispatch({ type: SET_FILTERS, payload: filters });
  };

  //al sumar al offset, se va a triggerear fetchExpenses y va a pushear al arreglo de contactos ya existente
  const loadMoreData = () => {
    dispatch({ type: SET_OFFSET, payload: state.offset + 10 });
  };

  //funcion que obtiene los datos del server
  const fetchExpenseCategories = useCallback(() => {
    axios
      .get(expenseCategoriesDataUri, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response: AxiosResponse<Expenses>) =>
        dispatch({
          type: SET_CATEGORIES,
          payload: response.data,
        })
      )
      .catch((error) => {
        throw new Error("no se han podido obtener datos del server");
      });
  }, [token]);

  //funcion que obtiene los datos del server
  const fetchExpenses = useCallback(
    ({ search, category_id, order, offset, token }: IExpenseRequestParams) => {
      axios
        .get(expensesDataUri, {
          params: { search, category_id, order, offset: offset },
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response: AxiosResponse<Expenses>) =>
          dispatch({
            type: offset ? PUSH_RESULTS : SET_RESULTS,
            payload: {
              results: {
                status: "loaded",
                payload: response.data.expenses,
                error: null,
              },
              count: response.data.count,
            },
          })
        )
        .catch((error) =>
          dispatch({
            type: SET_RESULTS,
            payload: { status: "error", error, payload: null },
          })
        );
    },
    []
  );

  //actualiza un contacto y despues refresca los datos con offset en 0
  const postOrUpdateExpense = (data: Expense) => {
    //el id es un discernible, la unica forma de que sea 0 es si estoy creando un contacto nuevo
    console.log(data);
    const method = data.expense_id === 0 ? "POST" : "PUT";
    axios
      .request({
        url: expensesDataUri,
        method,
        data,
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => console.log(response.status))
      .catch((error) => console.log(error))
      .finally(() =>
        fetchExpenses({ search, category_id, order, offset: 0, token })
      );
  };

  //actualiza un contacto y despues refresca los datos con offset en 0
  const postOrUpdateExpenseCategory = (data: ExpenseCategory) => {
    //el id es un discernible, la unica forma de que sea 0 es si estoy creando un contacto nuevo
    const method =
      data.category_id === 0 || data.category_id === undefined ? "POST" : "PUT";
    axios
      .request({
        url: expenseCategoriesDataUri,
        method,
        data,
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => console.log(response.status))
      .catch((error) => console.log(error))
      .finally(() => fetchExpenseCategories());
  };

  //actualiza un contacto y despues refresca los datos con offset en 0
  const deleteExpenseCategoryById = (category_id: number) => {
    console.log(category_id);
    axios
      .delete(expenseCategoriesDataUri, {
        params: { category_id },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => console.log(response.status))
      .catch((error) => console.log(error))
      .finally(() => fetchExpenseCategories());
  };

  //un listener que se triggerea en el primer render y cada vez que se cambian los filtros o el offset
  useEffect(() => {
    fetchExpenses({ search, category_id, order, offset, token });
  }, [search, category_id, order, offset, token, fetchExpenses]);

  return {
    result: state.results,
    count: state.count,
    updateFilters,
    loadMoreData,
    postOrUpdateExpense,
    fetchExpenseCategories,
    postOrUpdateExpenseCategory,
    deleteExpenseCategoryById,
    categories,
    category_id,
  };
};

export default useExpensesService;
