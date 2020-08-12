export interface Timestamps {
  created_at: Date;
  deleted_at: Date | null;
  updated_at: Date;
}

export interface Contact {
  address: string;
  contact_id: number;
  money: number;
  name: string;
  role: "c" | "p";
  phone: string;
}

export interface Expense {
  description: string;
  expense_id: number;
  category_id: number;
  sum: number;
}

export interface ExpenseCategory {
  name: string;
  category_id: number;
}

export interface ServerContact extends Contact, Timestamps {}

export interface ServerExpense extends Expense, Timestamps {}

//pattern from https://dev.to/camilomejia/fetch-data-with-react-hooks-and-typescript-390c
interface ServiceInit {
  status: "init";
  payload: null | undefined;
  error: null | undefined;
}
interface ServiceLoading {
  status: "loading";
  payload: null | undefined;
  error: null | undefined;
}
interface ServiceLoaded<T> {
  status: "loaded";
  payload: T;
  error: null | undefined;
}
interface ServiceError {
  status: "error";
  payload: any;
  error: Error;
}
export type Service<T> =
  | ServiceInit
  | ServiceLoading
  | ServiceLoaded<T>
  | ServiceError;

export interface IServiceState<Entity, Filters> {
  filters: Filters;
  offset: number;
  count: number;
  results: Service<Entity>;
}

export interface IServiceResponse<Entity>{
  result:Entity[];
  count:number;
}

export interface IServiceRequestParamsWithPagination {
  offset:number;
  token:string;
}

//contenido del response
export interface Contacts extends IServiceResponse<ServerContact> {};

export interface IContactFilters {
  search: string;
  role: "c" | "p";
  order: "name" | "money" | "updated_at";
}

//parametros del request
export interface IContactRequestParams extends IContactFilters, IServiceRequestParamsWithPagination {}