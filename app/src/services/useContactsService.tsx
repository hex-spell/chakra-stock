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
  const [{search,role,order}, setFilters] = useState({search:"",role:"c",order:"name"});

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
      .get(contactsDataUri, { params: { token, search, role, order } })
      .then((response: AxiosResponse<Contacts>) => setResult({ status: "loaded", payload: response.data, error: null }))
      .catch((error) => setResult({ status: "error", error, payload: null }));
  }, [role,search,order,token]);

  return {result,search,role,order,setFilters};
};

export default useContactsService;
