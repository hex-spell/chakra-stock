import { useEffect, useContext, useReducer } from "react";
import { Service, Contact } from "./interfaces";
import { UserContext } from "../context/User";
import axios, { AxiosResponse } from "axios";
import {
  SET_FILTERS,
  SET_OFFSET,
  SET_RESULTS,
  PUSH_RESULTS,
} from "./constants";

const localapi = process.env.REACT_APP_ROOT_API;
const contactsDataUri = localapi + "contacts";

//contenido del response
export interface Contacts {
  contacts: Contact[];
  count: number;
}

//parametros del request
export interface IContactFilters {
  search: string;
  role: "c" | "p";
  order: "name" | "money" | "updated_at";
}

interface IContactsServiceState extends IContactFilters {
  offset: number;
  count: number;
  results: Service<Contacts>;
}

const InitialState: IContactsServiceState = {
  search: "",
  role: "c",
  order: "name",
  offset: 0,
  count: 0,
  results: {
    status: "loading",
    payload: null,
    error: null,
  },
};

const reducer = (
  state: IContactsServiceState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SET_FILTERS:
      const { search, role, order } = action.payload;
      return { ...state, search, role, order, offset: 0 };
    case SET_OFFSET:
      return { ...state, offset: action.payload };
    case SET_RESULTS:
      return { ...state, results: action.payload.results, count:action.payload.count };
    case PUSH_RESULTS:
      return {
        ...state,  
        count: action.payload.count,
        results: {
          status: action.payload.results.status,
          error: action.payload.results.error,
          payload: [...state.results.payload,...action.payload.results.payload],
        },
      };
    default:
      throw new Error();
  }
};

//debería comenzar a hacer error handling con toasts

const useContactsService = () => {

  const [state, dispatch] = useReducer(reducer, InitialState);
  const { search, role, order, offset } = state;

  //token para autorizar las peticiones
  const {
    store: { token },
  } = useContext(UserContext);


  useEffect(() => {
    //tipo de accion que sera utilizado en el dispatch en caso de que la peticion sea exitosa
    const updateAction = offset ? PUSH_RESULTS : SET_RESULTS;
    axios
      .get(contactsDataUri, { params: { search, role, order, offset }, headers: {"Authorization" : `Bearer ${token}`} } )
      .then((response: AxiosResponse<Contacts>) =>
        dispatch({
          type: updateAction,
          payload: { results:{status: "loaded", payload: response.data.contacts, error: null}, count: response.data.count },
        })
      )
      .catch((error) =>
        dispatch({
          type: SET_RESULTS,
          payload: { status: "error", error, payload: null },
        })
      );
  }, [dispatch, search, role, order, offset, token]);

  //al ser un hook puedo retornar los dispatchs prefabricados, con los context no puedo y no se por que
  //me generan un bucle infinito de cambios en alguna parte de la jerarquia
  return {
    result: state.results,
    count: state.count,
    updateFilters: (filters: IContactFilters) =>
      dispatch({ type: SET_FILTERS, payload: filters }),
    loadMoreData: () =>
      dispatch({ type: SET_OFFSET, payload: state.offset + 10 }),
  };
};

export default useContactsService;
