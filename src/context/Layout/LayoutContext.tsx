import React, { createContext, useReducer, useMemo, useCallback } from "react";
import { useDisclosure } from "@chakra-ui/core";
import { SET_HEADER, SET_CONFIRMATION_MENU } from "./";

/*contexto de layout, los contextos son una forma localizada de manejar el estado,
se pueden extraer el dispatch (funcion para cambiar los valores del estado)
y la store (donde estan los valores del estado) usando el hook "useContext" con el contexto creado usando "createContext"
siempre y cuando sea invocado en un componente que esté wrappeado por el provider que createContext te da*/
export const LayoutContext: any = createContext({});

//interfaces para tipear el estado de la store
export interface IConfirmationMenu {
  title: string;
  subtitle?: string;
  action: () => void;
}

interface ILayoutState {
  header: string;
  confirmationMenu: IConfirmationMenu;
}

//el estado inicial de la store
const initialState: ILayoutState = {
  header: "Error",
  confirmationMenu: {
    title: "Error",
    subtitle: undefined,
    action: () => console.log("Confirmation menu action error"),
  },
};

/*el reducer, se encarga de recibir un string para determinar que accion realizar con el estado y el payload (carga de datos opcional),
lo que retorna sería el nuevo estado de la store completa, por eso se destructura state de esa forma*/
/*EL STRING QUE RECIBE SIEMPRE LO TENGO ESCRITO DE FORMA PREVIA EN UN ARCHIVO LOCAL LLAMADO "constants.ts"
PARA ASEGURARME DE NO TENER CONFLICTOS CON TYPOS O CAMBIOS DE NOMBRE A MITAD DE DESARROLLO*/
const reducer = (
  state: ILayoutState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SET_HEADER:
      return { ...state, header: action.payload };
    case SET_CONFIRMATION_MENU:
      console.log(action.payload);
      return { ...state, confirmationMenu: action.payload };
    default:
      throw new Error();
  }
};

//el provider del context del layout, asegurate de wrappear todos los componentes con los que quieras acceder al estado y al dispatch del layout en este componente
export const LayoutContextProvider: React.FC = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState);

  const confirmationDrawerState = useDisclosure();

  const setHeader = useCallback(
    (header: string) => dispatch({ type: SET_HEADER, payload: header }),
    []
  );

  const setConfirmationMenuData = useCallback(
    (confirmationMenu: IConfirmationMenu) =>
      dispatch({ type: SET_CONFIRMATION_MENU, payload: confirmationMenu }),
    []
  );

  const layoutContextValue = useMemo(() => {
    return { store, dispatch, confirmationDrawerState, setHeader, setConfirmationMenuData };
  }, [store, dispatch, confirmationDrawerState, setHeader, setConfirmationMenuData]);

  return (
    <LayoutContext.Provider value={layoutContextValue}>
      {children}
    </LayoutContext.Provider>
  );
};
