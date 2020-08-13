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

export interface Category {
  name: string;
  category_id: number;
}

export interface Product {
  product_id:number;
  name:string;
  sell_price:number;
  buy_price:number; 
  stock:number;
  category_id:number;
}

interface ProductHistory extends Timestamps {
  name: string;
  sell_price: number;
  buy_price: number;
  product_id: number;
  product_history_id: number;
}

export interface ServerProduct extends Timestamps {
  stock: number;
  product_id: number;
  product_history_id: number;
  category_id: number;
  current: ProductHistory;
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
  categories?: Category[] | null;
}

export interface IServiceResponse<Entity> {
  result: Entity[];
  count: number;
}

export interface IServiceRequestParamsWithPagination {
  offset: number;
  token: string;
}

//CONTACTOS

//contenido del response
export interface Contacts extends IServiceResponse<ServerContact> {}

export interface IContactFilters {
  search: string;
  role: "c" | "p";
  order: "name" | "money" | "updated_at";
}

//parametros del request
export interface IContactRequestParams
  extends IContactFilters,
    IServiceRequestParamsWithPagination {}

//GASTOS

//filtros
export interface IExpenseFilters {
  search: string;
  category_id: number | null;
  order: "description" | "sum" | "created_at";
}

//parametros del request
export interface IExpenseRequestParams
  extends IExpenseFilters,
    IServiceRequestParamsWithPagination {}

//contenido del response
export interface Expenses extends IServiceResponse<ServerExpense> {}

//contenido del response
export interface Categories extends IServiceResponse<Category> {}

//STOCK

//filtros
export interface IProductFilters {
  search: string;
  category_id: number | null;
  order: "name" | "buy_price" | "sell_price" | "created_at" | "updated_at";
}

//parametros del request
export interface IProductRequestParams
  extends IProductFilters,
    IServiceRequestParamsWithPagination {}

//contenido del response
export interface Products extends IServiceResponse<ServerProduct> {}
