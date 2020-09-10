import {
  useEffect,
  useContext,
  useReducer,
  useCallback,
  useState,
} from "react";
import {
  Contact,
  IServiceState,
  Contacts,
  IContactFilters,
  ServerContact,
  IServiceRequestParamsWithPagination,
} from "./interfaces";
import { UserContext } from "../context/User";
import {
  serverReducerFactory,
  fetchFunctionFactory,
  postFunctionFactory,
  pageControlsFactory,
  fetchMenuOptionFunctionFactory,
  deleteByIdFunctionFactory,
} from "./helpers";
import { MenuOption } from "../components/Layout/FilterDropdown";

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

  const { updateFilters, loadMoreData } = pageControlsFactory<IContactFilters>(
    dispatch,
    offset
  );

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

  const [contactsMenu, setContactsMenu] = useState<MenuOption[]>([]);

  const fetchContactsMinified = useCallback(() => {
    fetchMenuOptionFunctionFactory(
      `${contactsDataUri}/menu`,
      token,
      setContactsMenu
    )();
  }, [token]);

  //actualiza un contacto y despues refresca los datos con offset en 0
  const postOrUpdateContact = (data: Contact) =>
    postFunctionFactory<Contact>(contactsDataUri, token, () =>
      fetchContacts({ token, offset: 0 }, filters)
    )(data, data.contact_id);

  const deleteContactById = (id: number) =>
    deleteByIdFunctionFactory(contactsDataUri, "contact_id", token, () =>
      fetchContacts({ token, offset: 0 }, filters)
    )(id);

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
    contactsMenu,
    fetchContactsMinified,
    deleteContactById
  };
};

export default useContactsService;
