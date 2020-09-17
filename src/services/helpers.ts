import {
  SET_FILTERS,
  SET_OFFSET,
  SET_RESULTS,
  PUSH_RESULTS,
  SET_CATEGORIES,
} from "./constants";
import axios, { AxiosResponse } from "axios";
import {
  IServiceState,
  IServiceResponse,
  IServiceRequestParamsWithPagination,
  Categories,
} from "./interfaces";
import { MenuOption } from "../components/Layout/FilterDropdown";

export function serverReducerFactory<Entity, Filters>() {
  return (
    state: IServiceState<Entity, Filters>,
    action: { type: string; payload?: any }
  ) => {
    switch (action.type) {
      case SET_FILTERS:
        return { ...state, filters: action.payload, offset: 0 }; //search, role, order, offset: 0 };
      case SET_OFFSET:
        return { ...state, offset: action.payload };
      case SET_CATEGORIES:
      return { ...state, categories: action.payload };
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
}

type axiosRequest<Filters> = (
  params: IServiceRequestParamsWithPagination,
  filters: Filters
) => void;

export function fetchFunctionFactory<Entity, Filters>(
  dataUri: string,
  dispatch: any
): axiosRequest<Filters> {
  return ({ offset, token }, filters) => {
    axios
      .get(dataUri, {
        params: { offset, ...filters },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response: AxiosResponse<IServiceResponse<Entity>>) =>
        dispatch({
          type: offset ? PUSH_RESULTS : SET_RESULTS,
          payload: {
            results: {
              status: "loaded",
              payload: response.data.result,
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
  };
}

export function fetchCategoryFunctionFactory(
  dataUri: string,
  token: string,
  dispatch: any
) {
  return () => {
    axios
      .get(dataUri, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response: AxiosResponse<Categories>) =>{
        dispatch({
          type: SET_CATEGORIES,
          payload: response.data.result,
        })}
      )
      .catch((error) => {
        throw new Error("no se han podido obtener datos del server");
      });
  };
}

export function fetchMenuOptionFunctionFactory(
  dataUri: string,
  token: string,
  setter: (data:MenuOption[])=>void
) {
  return () => {
    axios
      .get(dataUri, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response: AxiosResponse<{result:MenuOption[]}>) =>{
        setter(response.data.result)}
      )
      .catch((error) => {
        throw new Error("no se han podido obtener datos del server");
      });
  };
}

export function postFunctionFactory<Entity>(
  dataUri: string,
  token: string,
  update: () => void
) {
  return (data: Entity, identifier: number) => {
    //el id es un discernible, la unica forma de que sea 0 es si estoy creando un contacto nuevo
    const method = identifier === 0 || identifier === undefined || identifier === null ? "POST" : "PUT";
    axios
      .request({
        url: dataUri,
        method,
        data,
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => console.log(response.status))
      .catch((error) => console.log(error))
      .finally(() => update());
  };
}

export function deleteByIdFunctionFactory(
  dataUri: string,
  idField: string,
  token: string,
  update: () => void
) {
  return (id: number) =>
    axios
      .delete(dataUri, {
        params: { [idField]: id },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => console.log(response.status))
      .catch((error) => console.log(error))
      .finally(() => update());
}

export function pageControlsFactory<Filters>(dispatch:any,offset:number){
  const updateFilters = (filters:Filters) => {
    dispatch({ type: SET_FILTERS, payload: filters });
  };

  //al sumar al offset, se va a triggerear fetch y va a pushear al arreglo ya existente
  const loadMoreData = () => {
    dispatch({ type: SET_OFFSET, payload: offset + 10 });
  };

  return {updateFilters,loadMoreData};
}

export const dateHelper = (date:Date) => {
  return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()<10 ? `0${date.getMinutes()}` : date.getMinutes()}`;

}

export const dateHelperMin = (date:Date) => {
  return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;

}

export const getCurrentMonthName = () => {
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];
  const today = new Date();
  const month = today.getMonth();
  const day = today.getDate();
  return `${monthNames[month]} 1 - ${day}`;
}


//funcion sacada de https://blog.jayway.com/2017/07/13/open-pdf-downloaded-api-javascript/
export const showFile = (blob:Blob,filename:string) =>{
  // It is necessary to create a new blob object with mime-type explicitly set
  // otherwise only Chrome works like it should
  var newBlob = new Blob([blob], {type: "application/pdf"})

  // IE doesn't allow using a blob object directly as link href
  // instead it is necessary to use msSaveOrOpenBlob
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(newBlob);
    return;
  } 

  // For other browsers: 
  // Create a link pointing to the ObjectURL containing the blob.
  const data = window.URL.createObjectURL(newBlob);
  var link = document.createElement('a');
  link.href = data;
  link.download=filename;
  link.click();
  setTimeout(function(){
    // For Firefox it is necessary to delay revoking the ObjectURL
    window.URL.revokeObjectURL(data);
  }, 100);
}