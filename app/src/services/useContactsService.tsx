import { useEffect, useContext, useReducer, useCallback } from "react";
import { Service, ServerContact, Contact } from "./interfaces";
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
  contacts: ServerContact[];
  count: number;
}

//parametros del request
export interface IContactFilters {
  search: string;
  role: "c" | "p";
  order: "name" | "money" | "updated_at";
}

interface IContactRequestParams extends IContactFilters {
  offset: number;
  token: string;
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
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case SET_FILTERS:
      const { search, role, order } = action.payload;
      return { ...state, search, role, order, offset: 0 };
    case SET_OFFSET:
      return { ...state, offset: action.payload };
    case SET_RESULTS:
      console.log(SET_RESULTS);
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

const useContactsService = () => {
  const [state, dispatch] = useReducer(reducer, InitialState);
  const { search, role, order, offset } = state;

  //token para autorizar las peticiones
  const {
    store: { token },
  } = useContext(UserContext);

  //cambia los filtros usados en los parametros del request fetchContacts
  //por el useEffect esta funcion triggerea el request mismo
  const updateFilters = (filters: IContactFilters) => {
    dispatch({ type: SET_FILTERS, payload: filters });
  };

  //al sumar al offset, se va a triggerear fetchContacts y va a pushear al arreglo de contactos ya existente
  const loadMoreData = () => {
    dispatch({ type: SET_OFFSET, payload: state.offset + 10 });
  };

  //funcion que obtiene los datos del server
  const fetchContacts = useCallback(
    ({ search, role, order, offset, token }: IContactRequestParams) => {
      axios
        .get(contactsDataUri, {
          params: { search, role, order, offset: offset },
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response: AxiosResponse<Contacts>) =>
          dispatch({
            type: offset ? PUSH_RESULTS : SET_RESULTS,
            payload: {
              results: {
                status: "loaded",
                payload: response.data.contacts,
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
  const postOrUpdateContact = (data: Contact) => {
    //el id es un discernible, la unica forma de que sea 0 es si estoy creando un contacto nuevo
    const method = data.contact_id === 0 ? "POST" : "PUT";
    axios
      .request({
        url: contactsDataUri,
        method,
        data,
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => console.log(response.status))
      .catch((error) => console.log(error))
      .finally(() => fetchContacts({ search, role, order, offset: 0, token }));
  };

  //un listener que se triggerea en el primer render y cada vez que se cambian los filtros o el offset
  useEffect(() => {
    fetchContacts({ search, role, order, offset, token });
  }, [search, role, order, offset, token, fetchContacts]);

  return {
    result: state.results,
    count: state.count,
    updateFilters,
    loadMoreData,
    postOrUpdateContact,
  };
};

export default useContactsService;
