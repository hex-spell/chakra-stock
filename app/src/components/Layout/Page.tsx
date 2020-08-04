import React, { useEffect, useContext } from "react";
import { LayoutContext } from "../../context/Layout";
import { Container } from "./";

interface IPagePropsInterface {
  title: string;
}

//Layout de pagina, hace despacho de titulo al contexto del header cuando se renderiza
const Page: React.FC<IPagePropsInterface> = ({ title, children }) => {
  const { setHeader } = useContext(LayoutContext);
  
  useEffect(() => {
    setHeader(title);
  }, [title, setHeader]);
  
  return <Container>{children}</Container>;
};

export default Page;
