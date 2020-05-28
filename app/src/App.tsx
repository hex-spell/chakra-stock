import React, { useContext } from "react";
import { UserContext, LOG_OUT } from "./context/User";
import Navbar from "./components/Navbar";
import { useDisclosure } from "@chakra-ui/core";
import MainDrawer from "./components/MainDrawer";


//Raiz de la aplicacion, despues del login
const App: React.FC = () => {
  const {
    store: {
      user: { name, email }
    },
    dispatch
  } = useContext(UserContext);

  //Hook que se encarga del manejo del estado del MainDrawer
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Navbar onMenuClick={onOpen}/>
      <MainDrawer isOpen={isOpen} onClose={onClose} />
      welcome {name} ! your email is { email }.
      <button onClick={()=>dispatch({type:LOG_OUT})}>Log out</button>

    </div>
  );
};

export default App;
