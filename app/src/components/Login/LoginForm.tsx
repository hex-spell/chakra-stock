import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { UserContext, SAVE_TOKEN } from "../../context/User";

const localapi = process.env.REACT_APP_ROOT_API;
const loginUri = localapi+"login";

//Formulario de login, se encarga de enviar credenciales al server y recibir token
const LoginForm: React.FC = () => {
  const { dispatch } = useContext(UserContext);

  const { register, handleSubmit } = useForm();

  //Peticion al server, guarda token en UserContext, para ser manejado por LoginWrapper
  const onSubmit = handleSubmit(({ email, password }) => {
    axios
      .post(loginUri, {
        email,
        password,
      })
      .then((res: any) =>
        dispatch({ type: SAVE_TOKEN, payload: res.data.token })
      )
      .catch((err) => console.log(err));
  });
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="email" name="email" ref={register} />
        <input
          type="password"
          placeholder="password"
          name="password"
          ref={register}
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default LoginForm;