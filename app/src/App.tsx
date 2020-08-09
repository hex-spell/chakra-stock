import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import { useDisclosure } from "@chakra-ui/core";
import MainDrawer from "./components/MainDrawer";
import { ConfirmationMenu } from "./components/Layout";
import { LayoutContext } from "./context/Layout";
import {
  FaHome,
  FaDropbox,
  FaListUl,
  FaUsers,
  FaDonate,
  FaCog,
  FaBookOpen,
} from "react-icons/fa";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Inicio,
  Stock,
  Pedidos,
  Contactos,
  Transacciones,
  Gastos,
  Configuracion,
} from "./pages";

//Raiz de la funcionalidad de la aplicacion, despues del login, seteo del enrutado y el layout global
const App: React.FC = () => {
  //Hook que se encarga del manejo del estado del MainDrawer
  const { isOpen, onOpen, onClose } = useDisclosure();
  //estado, titulo y funcion que ejecuta el drawer de confirmacion
  const {
    store: {
      confirmationMenu: { title, action, subtitle },
    },
    confirmationMenuDisclosure,
  } = useContext(LayoutContext);
  return (
    <Router>
      <Navbar onMenuClick={onOpen} />
      <ConfirmationMenu
        isOpen={confirmationMenuDisclosure.isOpen}
        onClose={confirmationMenuDisclosure.onClose}
        title={title}
        action={action}
        subtitle={subtitle}
      />
      <MainDrawer
        isOpen={isOpen}
        onClose={onClose}
        links={[
          { name: "Inicio", link: "/", icon: FaHome },
          { name: "Stock", link: "/stock", icon: FaDropbox },
          { name: "Pedidos", link: "/pedidos", icon: FaListUl },
          { name: "Contactos", link: "/contactos", icon: FaUsers },
          { name: "Transacciones", link: "/transacciones", icon: FaDonate },
          { name: "Gastos", link: "/gastos", icon: FaBookOpen },
          { name: "Configuracion", link: "/configuracion", icon: FaCog },
        ]}
      />
      <Switch>
        <Route exact path="/" component={Inicio} />
        <Route path="/stock" component={Stock} />
        <Route path="/pedidos" component={Pedidos} />
        <Route path="/contactos" component={Contactos} />
        <Route path="/transacciones" component={Transacciones} />
        <Route path="/gastos" component={Gastos} />
        <Route path="/configuracion" component={Configuracion} />
      </Switch>
    </Router>
  );
};

export default App;
