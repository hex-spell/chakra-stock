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
  FaUserTie,
  FaDollarSign,
  FaDonate,
  FaShoppingCart,
  FaCog,
  FaBookOpen,
} from "react-icons/fa";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Inicio,
  Stock,
  Pedidos,
  Compras,
  Clientes,
  Proveedores,
  Cobros,
  Pagos,
  Gastos,
  Configuracion,
} from "./pages";

//Raiz de la aplicacion, despues del login, seteo del enrutado
const App: React.FC = () => {
  //Hook que se encarga del manejo del estado del MainDrawer
  const { isOpen, onOpen, onClose } = useDisclosure();
  //estado, titulo y funcion que ejecuta el drawer de confirmacion
  const {
    store: {
      confirmationMenu: { title, action },
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
      />
      <MainDrawer
        isOpen={isOpen}
        onClose={onClose}
        links={[
          { name: "Inicio", link: "/", icon: FaHome },
          { name: "Stock", link: "/stock", icon: FaDropbox },
          { name: "Pedidos", link: "/pedidos", icon: FaListUl },
          { name: "Compras", link: "/compras", icon: FaShoppingCart },
          { name: "Clientes", link: "/clientes", icon: FaUsers },
          { name: "Proveedores", link: "/proveedores", icon: FaUserTie },
          { name: "Cobros", link: "/cobros", icon: FaDollarSign },
          { name: "Pagos", link: "/pagos", icon: FaDonate },
          { name: "Gastos", link: "/gastos", icon: FaBookOpen },
          { name: "Configuracion", link: "/configuracion", icon: FaCog },
        ]}
      />
      <Switch>
        <Route exact path="/" component={Inicio} />
        <Route path="/stock" component={Stock} />
        <Route path="/pedidos" component={Pedidos} />
        <Route path="/compras" component={Compras} />
        <Route path="/clientes" component={Clientes} />
        <Route path="/proveedores" component={Proveedores} />
        <Route path="/cobros" component={Cobros} />
        <Route path="/pagos" component={Pagos} />
        <Route path="/gastos" component={Gastos} />
        <Route path="/configuracion" component={Configuracion} />
      </Switch>
    </Router>
  );
};

export default App;
