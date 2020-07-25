import React, { createContext, useReducer, useMemo } from "react";
import { useDisclosure } from "@chakra-ui/core";
import { SET_HEADER, SET_CONFIRMATION_MENU } from "./";

export const LayoutContext: any = createContext({});

interface IConfirmationMenuState {
  title: string;
  action: () => void;
}

interface ILayoutState {
  header: string;
  confirmationMenu: IConfirmationMenuState;
}

const initialState: ILayoutState = {
  header: "Error",
  confirmationMenu: {
    title: "Error",
    action: () => console.log("Confirmation menu action error"),
  },
};

const reducer = (
  state: ILayoutState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SET_HEADER:
      return { ...state, header: action.payload };
    case SET_CONFIRMATION_MENU:
      return { ...state, confirmationMenu: action.payload };
    default:
      throw new Error();
  }
};

export const LayoutContextProvider: React.FC = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState);
  const confirmationMenuDisclosure = useDisclosure();
  const layoutContextValue = useMemo(() => {
    return { store, dispatch, confirmationMenuDisclosure };
  }, [store, dispatch, confirmationMenuDisclosure]);

  return (
    <LayoutContext.Provider value={layoutContextValue}>
      {children}
    </LayoutContext.Provider>
  );
};
