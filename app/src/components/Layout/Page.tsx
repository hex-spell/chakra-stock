import React, { useEffect, useContext } from "react";
import { LayoutContext, SET_HEADER } from "../../context/Layout";
import { Container } from "./";

interface IPagePropsInterface {
  title: string;
}

//Layout de pagina, hace despacho de titulo al contexto del header cuando se renderiza
const Page: React.FC<IPagePropsInterface> = ({ title, children }) => {
  const { dispatch } = useContext(LayoutContext);
  
  useEffect(() => {
    dispatch({type:SET_HEADER,payload:title});
  }, [title, dispatch]);
  
  return <Container>{children}</Container>;
};

export default Page;
