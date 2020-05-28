import React, { createContext, useReducer, useMemo } from "react";
import { SAVE_TOKEN, SAVE_USER, LOG_OUT} from "./constants";

export const UserContext: any = createContext({});

export type UserData = {
    name: string;
    email: string;
    id: number;
}

export interface IUser {
  user: UserData;
  token: string;
}

const initialUserState : UserData = {
    name: '',
    email: '',
    id: 0,
}

const initialState: IUser = {
  user: initialUserState,
  token: "",
};

const reducer = (state: IUser, action: { type: string; payload: any }) => {
  switch (action.type) {
    case SAVE_TOKEN:
      return { ...state, token: action.payload };
    case SAVE_USER:
      return { ...state, user: action.payload };
    case LOG_OUT:
      localStorage.removeItem("token");
      return { user: initialUserState, token: "" };
    default:
      throw new Error();
  }
};

export const UserContextProvider: React.FC = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState);
  const userContextValue = useMemo(() => {
    return { store, dispatch };
  }, [store, dispatch]);
  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};
