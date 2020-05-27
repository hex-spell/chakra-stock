import React, { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import axios from "axios";
import { useForm } from "react-hook-form";
import jwt from "jsonwebtoken";

const localapi = "http://localhost:4000/";

const App: React.FC = () => {
  const {
    store: {
      user: { name },
      token,
    },
    dispatch,
  } = useContext(UserContext);

  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(({ email, password }) => {
    axios
      .post(localapi + "login", {
        email,
        password,
      })
      .then((res: any) =>
        dispatch({ type: "SAVE_TOKEN", payload: res.data.token })
      )
      .catch((err) => console.log(err));
  });

  useEffect(() => {
    const decodedIdentity = jwt.decode(token);
    if(decodedIdentity){
      axios
      .get(localapi + `users/${decodedIdentity.sub}`, { params: { token } })
      .then((res: any) => dispatch({ type: "SAVE_USER", payload: res.data }))
      .catch((err) => console.log(err));
    }  
  }, [token, dispatch]);

  return (
    <div>
      {name ? (
        <p>welcome {name} !</p>
      ) : (
        <div>
          <h1>Login</h1>
          <form onSubmit={onSubmit}>
            <input
              type="email"
              placeholder="email"
              name="email"
              ref={register}
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              ref={register}
            />
            <input type="submit" value="submit" />
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
