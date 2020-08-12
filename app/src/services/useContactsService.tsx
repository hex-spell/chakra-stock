import { useEffect, useContext, useReducer, useCallback } from "react";
import {
  Contact,
  IServiceState,
  Contacts,
  IContactFilters,
  ServerContact,
  IServiceRequestParamsWithPagination,
} from "./interfaces";
import { UserContext } from "../context/User";
import { SET_FILTERS, SET_OFFSET } from "./constants";
import {
  serverReducerFactory,
  fetchFunctionFactory,
  postFunctionFactory,
} from "./helpers";

const localapi = process.env.REACT_APP_ROOT_API;
const contactsDataUri = localapi + "contacts";

const InitialState: IServiceState<Contacts, IContactFilters> = {
  filters: { search: "", role: "c", order: "name" },
  offset: 0,
  count: 0,
  results: {
    status: "loading",
    payload: null,
    error: null,
  },
};

const reducer = serverReducerFactory<Contacts, IContactFilters>();

//debería comenzar a hacer error handling con toasts

//esto se puede abstraer aun mas
const useContactsService = () => {
  const [state, dispatch] = useReducer(reducer, InitialState);
  const { filters, offset, count } = state;

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
    console.log(state.offset);
    dispatch({ type: SET_OFFSET, payload: state.offset + 10 });
  };

  //funcion que obtiene los datos del server
  const fetchContacts = useCallback(
    (params: IServiceRequestParamsWithPagination, filters: IContactFilters) => {
      fetchFunctionFactory<ServerContact, IContactFilters>(
        contactsDataUri,
        dispatch
      )(params, filters);
    },
    []
  );

  //actualiza un contacto y despues refresca los datos con offset en 0
  const postOrUpdateContact = (data: Contact) =>
    postFunctionFactory<Contact, IContactFilters>(
      contactsDataUri,
      token,
      filters,
      fetchContacts
    )(data, data.contact_id);

  //un listener que se triggerea en el primer render y cada vez que se cambian los filtros o el offset
  useEffect(() => {
    fetchContacts({ offset, token }, filters);
  }, [filters, count, offset, token, fetchContacts]);

  return {
    result: state.results,
    count: state.count,
    updateFilters,
    loadMoreData,
    postOrUpdateContact,
  };
};

export default useContactsService;
