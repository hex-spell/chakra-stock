import React from "react";
import { FilterStack } from "../Layout";
import { useForm } from "react-hook-form";
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
  Text,
  Button,
  InputLeftAddon,
} from "@chakra-ui/core";

type FormInput = {
  name: string;
  title: string;
  defaultValue: any;
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
  const { register, handleSubmit, formState } = useForm();
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
          <FormControl>
            <form onSubmit={onSubmit}>
              <FilterStack>
                {inputs.map(({ name, title, defaultValue }) => (
                  <InputGroup>
                    <InputLeftAddon children={title} />
                    <Input
                      name={name}
                      defaultValue={defaultValue}
                      ref={register}
                    />
                  </InputGroup>
                ))}
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
