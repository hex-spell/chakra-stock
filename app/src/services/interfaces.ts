export interface Contact {
  created_at: Date;
  deleted_at: Date | null;
  address: string;
  contact_id: number;
  money: number;
  name: string;
  role: string;
  phone: string;
  updated_at: Date;
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
