import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { UserContext, SAVE_TOKEN } from "../../context/User";
import {
  FormControl,
  Input,
  Button,
  FormLabel,
  Divider,
  Heading,
  Box,
} from "@chakra-ui/core";

//Enlace del server backend, guardado en las variables de entorno.
const localapi = process.env.REACT_APP_ROOT_API;
//Enlace de login
const loginUri = localapi + "login";

//Formulario de login, se encarga de enviar credenciales al server y recibir token
const LoginForm: React.FC = () => {
  const { dispatch } = useContext(UserContext);

  const { register, handleSubmit, errors, formState } = useForm();

  //Peticion al server, guarda token en UserContext, para ser manejado por LoginWrapper
  const onSubmit = handleSubmit(({ email, password }) => {
    console.log(loginUri);

    axios
      .request({
        url: loginUri,
        method: "POST",
        data: { email, password },
      })
      .then((res: any) =>{console.log(res);
        dispatch({ type: SAVE_TOKEN, payload: res.data.token })}
      )
      .catch((err) => console.log(err));
  });
  return (
    <Box>
      <Box textAlign="center">
        <Heading as="h3">Admin de Stock</Heading>
      </Box>
      <Divider />
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={errors.email && errors.password}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            type="email"
            name="email"
            ref={register({
              required: true,
            })}
          />
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            name="password"
            ref={register({
              required: true,
            })}
          />
          <Button
            mt={4}
            variantColor="teal"
            isLoading={formState.isSubmitting}
            type="submit"
            float="right"
          >
            Submit
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default LoginForm;
