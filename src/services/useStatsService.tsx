import Axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useContext, useReducer, useCallback } from "react";
import { UserContext } from "../context/User";
import { IStats, Service } from "./interfaces";

const localapi = process.env.REACT_APP_ROOT_API;
const statsDataUri = localapi + "stats";

const statsInitialState: Service<IStats> = {
  status: "init",
  payload: null,
  error: null,
};

const reducer = (
  state: Service<IStats>,
  action: { type: string; payload?: any }
): Service<IStats> => {
  switch (action.type) {
    case "SET_RESULTS":
      return {
        ...state,
        status: "loaded",
        payload: action.payload,
        error: null,
      };
    case "SET_LOADING":
      return { payload: null, status: "loading", error: null };
    case "SET_ERROR":
      return { payload: null, status: "error", error: action.payload };
    default:
      throw new Error();
  }
};

//debería comenzar a hacer error handling con toasts

//esto se puede abstraer aun mas
const useTransactionsService = () => {
  //token para autorizar las peticiones
  const {
    store: { token },
  } = useContext(UserContext);

  const [store, dispatch] = useReducer(reducer, statsInitialState);

  const getStats = useCallback(() => {
    dispatch({ type: "SET_LOADING" });
    Axios.request({
      url: statsDataUri,
      method: "get",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res: AxiosResponse<IStats>) =>
        dispatch({ type: "SET_RESULTS", payload: res.data })
      )
      .catch((err: AxiosError) =>
        dispatch({ type: "SET_ERROR", payload: "Error de petición" })
      );
  }, [token]);

  //un listener que se triggerea en el primer render
  useEffect(() => {
    getStats();
  }, [getStats]);

  return {
    store
  };
};

export default useTransactionsService;
