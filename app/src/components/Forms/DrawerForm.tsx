import React from "react";
import { FilterStack } from "../Layout";
import { useForm, ValidationOptions, Controller } from "react-hook-form";
import {
  Input,
  FormControl,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerContent,
  DrawerBody,
  InputGroup,
  Button,
  InputLeftAddon,
  FormErrorMessage,
} from "@chakra-ui/core";
import FilterDropdown, { MenuOption } from "../Layout/FilterDropdown";

type FormInput = {
  name: string;
  title: string;
  defaultValue: any;
  validationRules: ValidationOptions;
  options?: MenuOption[] | null;
};

interface IDrawerFormProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  inputs: FormInput[];
  onFormSubmit: (values: Record<string, any>) => void;
}

const DrawerForm: React.FC<IDrawerFormProps> = ({
  isOpen,
  onClose,
  title,
  inputs,
  onFormSubmit,
}) => {
  const { register, handleSubmit, formState, errors, control } = useForm();
  const onSubmit = handleSubmit((values) => {
    onFormSubmit(values);
    onClose();
  });
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{title}</DrawerHeader>
        <DrawerBody>
          {/* ESTA MINIFUNCION EN EL FORMCONTROL BUSCA SI TIENE ERRORES EL OBJETO, HACIENDO TYPECASTING A BOOLEAN TODAS SUS PROPIEDADES */}
          <FormControl
            isInvalid={Object.values(errors).find((value) => !!value)}
          >
            <form onSubmit={onSubmit}>
              <FilterStack>
                {inputs.map(
                  ({ name, title, defaultValue, validationRules, options }) => (
                    <>
                      {errors[name] && errors[name].message && (
                        <FormErrorMessage>
                          {errors[name].message}
                        </FormErrorMessage>
                      )}
                      <InputGroup>
                        <InputLeftAddon children={title} />
                        {/* SI EL OBJETO TIENE OPCIONES, TIENE QUE SER DROPDOWN */}
                        {options ? (
                          <Controller
                            control={control}
                            name={name}
                            as={({ onChange, value, name }) => (
                              <FilterDropdown
                                menu={options}
                                onChange={(e) => onChange(e.target.value)}
                                defaultValue={defaultValue}
                                name={name}
                              />
                            )}
                          />
                        ) : (
                          <Input
                            name={name}
                            defaultValue={defaultValue}
                            ref={register(validationRules)}
                          />
                        )}
                      </InputGroup>
                    </>
                  )
                )}
                <Button
                  mt={4}
                  variantColor="teal"
                  isLoading={formState.isSubmitting}
                  type="submit"
                  float="right"
                >
                  Guardar
                </Button>
              </FilterStack>
            </form>
          </FormControl>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerForm;
