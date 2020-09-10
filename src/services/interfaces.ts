export interface Timestamps {
  created_at: Date;
  deleted_at: Date | null;
  updated_at: Date;
}

export interface Category {
  name: string;
  category_id: number;
}

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

export interface Contact {
  address: string;
  contact_id: number;
  money: number;
  name: string;
  role: "c" | "p";
  phone: string;
}

//contenido del response
export interface ServerContact extends Contact, Timestamps {}

//estructura con status
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

export interface Expense {
  description: string;
  expense_id: number;
  category_id: number;
  sum: number;
}

export interface ServerExpense extends Expense, Timestamps {}

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

export interface Product {
  product_id: number;
  name: string;
  sell_price: number;
  buy_price: number;
  stock: number;
  category_id: number;
  product_history_id: number;
}

export interface PostProduct {
  product_id: number;
  name: string;
  sell_price: number;
  buy_price: number;
  stock: number;
  category_id: number;
}

//esto esta al pedo, mas tarde lo cambio
export interface MinifiedProduct {
  name: string;
  sell_price: number;
  buy_price: number;
  stock: number;
  product_id: number;
  category_id: number;
}

/* interface ProductHistory extends Timestamps {
  name: string;
  sell_price: number;
  buy_price: number;
  product_id: number;
  product_history_id: number; 
}
*/
/* 
VERSION VIEJA SIN JOINS
export interface ServerProduct extends Timestamps {
  stock: number;
  product_id: number;
  product_history_id: number;
  category_id: number;
  current: ProductHistory;
} */

export interface ServerProduct extends Timestamps, Product {}

//filtros
export interface IProductFilters {
  search: string;
  category_id: number | null;
  order: "name" | "buy_price" | "sell_price" | "updated_at";
}

//parametros del request
export interface IProductRequestParams
  extends IProductFilters,
    IServiceRequestParamsWithPagination {}

//contenido del response
export interface Products extends IServiceResponse<ServerProduct> {}

export interface MinifiedProducts extends IServiceResponse<MinifiedProduct> {}

//PEDIDOS

export interface OrderProductHistory {
  product_id: number;
  product_history_id: number;
  name: string;
  sell_price: number;
  buy_price: number;
}

export interface OrderProduct {
  ammount: number;
  delivered: number;
  product_id: number;
  product_history_id: number;
  current_version?: OrderProductHistory;
  product_version: OrderProductHistory;
}

export interface PostOrderProduct {
  order_id: number;
  product_id: number;
  ammount: number;
}

export interface PostTransaction {
  order_id: number;
  sum: number;
}

export interface PostMarkCompleted {
  order_id: number;
}

interface ProductDelivery {
  product_id: number;
  ammount: number;
}

export interface PostMarkDelivered {
  order_id: number;
  products: ProductDelivery[];
}

export interface DeleteOrderProduct {
  order_id: number;
  product_id: number;
}

export interface Order {
  order_id: number;
  completed: boolean;
  type: string;
  contact_id: number;
  products_count: number;
  paid: number;
  sum: number;
  delivered: boolean;
  contact: {
    name: string;
    address: string;
    phone: string;
    contact_id: number;
  };
}

export interface postOrUpdateOrder {
  order_id: number;
  contact_id: number;
  type: "a" | "b";
}

export interface ServerOrder extends Order, Timestamps {}

export interface Orders extends IServiceResponse<ServerOrder> {}

export interface OrderProducts extends IServiceResponse<OrderProduct> {}

//filtros
export interface IOrderFilters {
  search: string;
  completed: "completed" | "not_completed" | "all";
  delivered: "delivered" | "not_delivered" | "all";
  type: "a" | "b";
  //order: "description" | "sum" | "created_at";
}

//TRANSACCIONES

export interface Transaction {
  sum: number;
  transaction_id: number;
  contact_id: number;
  order_id: number;
  name: string;
  type: "a" | "b";
}

export interface UpdateTransaction {
  transaction_id: number;
  sum: number;
}

export interface ServerTransaction extends Transaction, Timestamps {}

//filtros
export interface ITransactionFilters {
  search: string;
  type: "a" | "b";
  order: "name" | "sum" | "created_at";
}

//parametros del request
export interface ITransactionRequestParams
  extends ITransactionFilters,
    IServiceRequestParamsWithPagination {}

//contenido del response
export interface Transactions extends IServiceResponse<ServerTransaction> {}
