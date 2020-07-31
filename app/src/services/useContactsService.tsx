import { useEffect, useState, useContext } from "react";
import { Service, Contact } from "./interfaces";
import { UserContext } from "../context/User";
import axios, { AxiosResponse } from "axios";

const localapi = process.env.REACT_APP_ROOT_API;
const contactsDataUri = localapi + 'contacts';

export interface Contacts {
  results: Contact[];
}

//fijarme si separar los filtros en un hook aparte o dejarlos aca

const useContactsService = () => {
  //filtros y seteadores
  const [{search,role}, setFilters] = useState({search:"",role:"c"});

  //token para autorizar las peticiones
  const {
    store: { token },
  } = useContext(UserContext);

  const [result, setResult] = useState<Service<Contacts>>({
    status: "loading",
    payload: null,
    error: null
  });

  useEffect(() => {
      axios
      .get(contactsDataUri, { params: { token, search, role } })
      .then((response: AxiosResponse<Contacts>) => setResult({ status: "loaded", payload: response.data, error: null }))
      .catch((error) => setResult({ status: "error", error, payload: null }));
  }, [role,search,token]);

  return {result,search,role,setFilters};
};

export default useContactsService;
