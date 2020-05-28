import React, { useContext, useEffect } from "react";
import { UserContext, SAVE_USER, SAVE_TOKEN } from "../../context/User";
import axios from "axios";
import jwt from "jsonwebtoken";
import LoginForm from "./LoginForm";

const localapi = process.env.REACT_APP_ROOT_API;
const usersUri = localapi + "users/";

//Wrapper del formulario Login, se encarga de guardar la informacion del usuario en la sesion, y renderizar condicionalmente la app.
const LoginWrapper: React.FC = ({ children }) => {
  const {
    store: {
      token,
      user: { name },
    },
    dispatch,
  } = useContext(UserContext);

  //Revisar almacenamiento local buscando token
  //Si lo encuentra, lo guarda en UserContext
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      dispatch({ type: SAVE_TOKEN, payload: localToken });
    }
  }, [dispatch]);

  //Si hay cambios en el estado del token, se descodifica y se pide al server info del usuario.
  //Guarda el token en el almacenamiento local, y los datos del usuario en UserContext
  useEffect(() => {
    const decodedIdentity = jwt.decode(token);
    if (decodedIdentity) {
      localStorage.setItem("token",token);
      const userDataUri = usersUri + decodedIdentity.sub;
      axios
        .get(userDataUri, { params: { token } })
        .then((res: any) => dispatch({ type: SAVE_USER, payload: res.data }))
        .catch((err) => console.log(err));
    }
  }, [token, dispatch]);

  //Condicional : usuario logueado? S: renderizar app, N: renderizar formulario de logueo
  return <>{name ? <>{children}</> : <LoginForm />}</>;
};

export default LoginWrapper;
