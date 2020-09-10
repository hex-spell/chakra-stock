import React from "react";
import { FilterStack, SubText } from "../Layout";
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
  Flex,
  Box,
  FormHelperText,
  Text,
} from "@chakra-ui/core";
import FilterDropdown, { MenuOption } from "../Layout/FilterDropdown";

type FormInput = {
  name: string;
  title: string;
  defaultValue: NonNullable<any>;
  validationRules: ValidationOptions;
  options?: MenuOption[] | null;
  formHelperText?: string;
  maxW?: string;
};

interface IDrawerFormProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  subsubtitle?: string;
  inputs: FormInput[];
  onFormSubmit: (values: Record<string, any>) => void;
  deleteFunction?: (id: number) => void;
  deleteFieldName?: string;
}

const DrawerForm: React.FC<IDrawerFormProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  subsubtitle,
  inputs,
  onFormSubmit,
  deleteFunction,
  deleteFieldName,
}) => {
  const {
    register,
    handleSubmit,
    formState,
    errors,
    control,
    getValues,
  } = useForm();

  const onSubmit = handleSubmit((values) => {
    onFormSubmit(values);
    onClose();
  });

  const onDelete = (
    deleteFieldName: string,
    deleteFunction: (id: number) => void
  ) => {
    const itemID = getValues(deleteFieldName);
    deleteFunction(itemID);
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
      <DrawerOverlay />
      <DrawerContent maxHeight="100vh" overflowY="scroll">
        <DrawerCloseButton />
        <DrawerHeader>
          {title}
          <Text></Text>
          {subtitle && <SubText>{subtitle}</SubText>}
          {subsubtitle && <SubText>{subsubtitle}</SubText>}
        </DrawerHeader>
        <DrawerBody>
          {/* ESTA MINIFUNCION EN EL FORMCONTROL BUSCA SI TIENE ERRORES EL OBJETO, HACIENDO TYPECASTING A BOOLEAN TODAS SUS PROPIEDADES */}
          <FormControl
            isInvalid={Object.values(errors).find((value) => !!value)}
          >
            <form onSubmit={onSubmit}>
              <FilterStack>
                {inputs.map(
                  ({
                    name,
                    title,
                    defaultValue,
                    validationRules,
                    options,
                    formHelperText,
                    maxW,
                  }) => (
                    <>
                      {errors[name] && errors[name].message && (
                        <FormErrorMessage>
                          {errors[name].message}
                        </FormErrorMessage>
                      )}
                      <Box>
                        <InputGroup display="flex">
                          <InputLeftAddon children={title} flexGrow={1} />
                          {/* SI EL OBJETO TIENE OPCIONES, TIENE QUE SER DROPDOWN */}
                          {options ? (
                            <Controller
                              defaultValue={
                                defaultValue
                                  ? defaultValue
                                  : options[0]
                                  ? options[0].value
                                    ? options[0].value
                                    : 0
                                  : 0
                              }
                              rules={validationRules}
                              control={control}
                              name={name}
                              as={({ onChange, value, name }) => (
                                <FilterDropdown
                                  menu={options}
                                  onChange={(e) => {
                                    onChange(e.target.value);
                                  }}
                                  defaultValue={value}
                                  name={name}
                                />
                              )}
                            />
                          ) : (
                            <Input
                              name={name}
                              defaultValue={defaultValue}
                              ref={register(validationRules)}
                              maxW={maxW ? maxW : "initial"}
                            />
                          )}
                        </InputGroup>
                        {formHelperText && (
                          <FormHelperText mb="10px">
                            {formHelperText}
                          </FormHelperText>
                        )}
                      </Box>
                    </>
                  )
                )}
                <Flex justify="flex-end">
                  {/* BOTON QUE SOLO APARECE SI LE DOY UNA FUNCION PARA ELIMINAR E INDICO COMO IDENTIFICAR QUE ELIMINAR */}
                  {deleteFunction && deleteFieldName && (
                    <Button
                      mt={4}
                      variantColor="red"
                      isLoading={formState.isSubmitting}
                      onClick={() => onDelete(deleteFieldName, deleteFunction)}
                      float="right"
                    >
                      Borrar
                    </Button>
                  )}
                  <Button
                    mt={4}
                    ml={4}
                    variantColor="teal"
                    isLoading={formState.isSubmitting}
                    type="submit"
                    float="right"
                  >
                    Guardar
                  </Button>
                </Flex>
              </FilterStack>
            </form>
          </FormControl>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerForm;
