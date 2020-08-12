import {
  SET_FILTERS,
  SET_OFFSET,
  SET_RESULTS,
  PUSH_RESULTS,
} from "./constants";
import axios, { AxiosResponse } from "axios";
import {IServiceState, IServiceResponse, IServiceRequestParamsWithPagination} from "./interfaces"

export function serverReducerFactory<Entity,Filters>() {
  return (state: IServiceState<Entity,Filters>, action: { type: string; payload?: any }) => {
    switch (action.type) {
      case SET_FILTERS:
        return { ...state, filters:action.payload, offset:0 }; //search, role, order, offset: 0 };
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
}

type axiosRequest<Filters> = (params: IServiceRequestParamsWithPagination, filters:Filters)=>void;

export function fetchFunctionFactory<Entity,Filters>(DataUri:string,dispatch:any) : axiosRequest<Filters>{
    return ({offset, token}, filters) => {
        axios
          .get(DataUri, {
            params:{offset,...filters},
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
}
}

export function postFunctionFactory<Entity,Filters>(DataUri:string,token:string,filters:Filters,fetchFunction:axiosRequest<Filters>){
    return (data: Entity,identifier:number) => {
        //el id es un discernible, la unica forma de que sea 0 es si estoy creando un contacto nuevo
        const method = identifier === 0 ? "POST" : "PUT";
        axios
          .request({
            url: DataUri,
            method,
            data,
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => console.log(response.status))
          .catch((error) => console.log(error))
          .finally(() =>fetchFunction({token,offset:0},filters));
      };
}