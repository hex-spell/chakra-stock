import React, { ReactText, useEffect, useState, useCallback } from "react";
import { FilterStack } from "../../components/Layout";
import { useForm, ValidationOptions, Controller } from "react-hook-form";
import {
  FormControl,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerContent,
  DrawerBody,
  Button,
  Flex,
  Box,
  Stack,
  NumberInput,
  SliderTrack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
  FormLabel,
  IconButton,
} from "@chakra-ui/core";
import { FilterDropdown } from "../../components/Layout";
import {
  OrderProduct,
  MinifiedProduct,
  Order,
  Category,
  PostOrderProduct,
  DeleteOrderProduct,
} from "../../services/interfaces";
import { MenuOption } from "../../components/Layout/FilterDropdown";
import { FaTrashAlt } from "react-icons/fa";

interface IOrderProductsFormProps {
  clickedItem: Order;
  isOpen: boolean;
  onClose: () => void;
  fetchOrderProductsByOrderId: (order_id: number) => void;
  orderProducts: OrderProduct[] | null;
  minifiedProductsList: MinifiedProduct[] | null;
  fetchMinifiedProductsList: () => void;
  fetchProductCategories: () => void;
  categories: Category[] | null;
  onFormSubmit: (data: PostOrderProduct) => void;
  deleteFunction: (data: DeleteOrderProduct) => void;
  update: () => void;
}

const OrderProductsForm: React.FC<IOrderProductsFormProps> = ({
  isOpen,
  onClose,
  onFormSubmit,
  deleteFunction,
  fetchOrderProductsByOrderId,
  orderProducts,
  minifiedProductsList,
  fetchMinifiedProductsList,
  fetchProductCategories,
  categories,
  clickedItem: {
    order_id,
    contact: { name },
  },
  update,
}) => {
  const {
    register,
    handleSubmit,
    formState,
    errors,
    control,
    watch,
    getValues,
    setValue,
  } = useForm();

  const [
    filteredMinifiedProductsList,
    setFilteredMinifiedProductsList,
  ] = useState<MenuOption[] | null>(null);

  const [maxProducts, setMaxProducts] = useState(0);

  const selectedCategory = watch("category");
  const selectedProduct = watch("product_id");

  //obtiene categorias y productos del server
  useEffect(() => {
    fetchMinifiedProductsList();
    fetchProductCategories();
  }, [fetchMinifiedProductsList, fetchProductCategories]);

  //obtiene los productos del pedido
  useEffect(() => {
    if (order_id) {
      fetchOrderProductsByOrderId(order_id);
    }
  }, [fetchOrderProductsByOrderId, order_id]);

  //filtra los menus por categoria y por productos que ya esten en el pedido
  useEffect(() => {
    console.log(selectedCategory);
    console.log(categories);

    let filteredMinifiedProductsList: MinifiedProduct[] = [];

    if (
      orderProducts &&
      minifiedProductsList &&
      (selectedCategory == 0 || selectedCategory === undefined)
    ) {
      filteredMinifiedProductsList = minifiedProductsList.filter(
        (product) =>
          !orderProducts.find(
            (orderProduct) => orderProduct.product_id === product.product_id
          )
      );
    }

    if (
      orderProducts &&
      minifiedProductsList &&
      selectedCategory != 0 &&
      selectedCategory !== undefined
    ) {
      filteredMinifiedProductsList = minifiedProductsList.filter(
        (product) =>
          !orderProducts.find(
            (orderProduct) => orderProduct.product_id === product.product_id
          ) && product.category_id == selectedCategory
      );
    }

    const setFilteredMinifiedProductsListMenu = filteredMinifiedProductsList.map(
      ({ name, product_id }) => ({
        name,
        value: product_id,
      })
    );

    setFilteredMinifiedProductsList(setFilteredMinifiedProductsListMenu);
  }, [
    orderProducts,
    minifiedProductsList,
    categories,
    selectedCategory,
    setValue,
    selectedProduct,
  ]);

  //busca el producto en el array y setea el maximo del slider
  const findAndSetMax = useCallback((product_id:string|string,minifiedProductsList:MinifiedProduct[])=>{
    const selectedProductInArray = minifiedProductsList.find(
      (product) =>
        product.product_id === parseInt(product_id)
    );
    setMaxProducts(
      selectedProductInArray && selectedProductInArray.stock
        ? selectedProductInArray.stock
        : 0
    );
    setValue("ammount", 0)
  },[setValue]);

  //setea la cantidad maxima que podes definir en un orderproduct por el stock del producto y a la vez setea un producto si no esta seteado
  useEffect(() => {
    if (
      filteredMinifiedProductsList &&
      filteredMinifiedProductsList[0] &&
      filteredMinifiedProductsList[0].value &&
      minifiedProductsList &&
      !selectedProduct
    ) {
      setValue("product_id", filteredMinifiedProductsList[0].value);
      findAndSetMax(filteredMinifiedProductsList[0].value,minifiedProductsList);
    }
  }, [filteredMinifiedProductsList, setValue, minifiedProductsList, findAndSetMax, selectedProduct]);


  //setea la cantidad maxima que podes definir en un orderproduct por el stock del producto
  useEffect(() => {
    if (minifiedProductsList && selectedProduct) {
      findAndSetMax(selectedProduct, minifiedProductsList);
    }
  }, [
    minifiedProductsList,
    findAndSetMax,
    selectedProduct,
  ]);

  const onSubmit = handleSubmit(({ product_id, ammount }) => {
    console.log({ product_id, ammount, order_id });
    onFormSubmit({ product_id, ammount, order_id });
  });

  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => {
        onClose();
        update();
      }}
      placement="bottom"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{`Productos del pedido de ${name}`}</DrawerHeader>
        <DrawerBody>
          <Box height="30vh" overflowY="scroll">
            {orderProducts && (
              <Accordion allowToggle allowMultiple>
                {orderProducts.map((product: OrderProduct) => (
                  <AccordionItem>
                    <AccordionHeader>
                      <Box flex="1" textAlign="left">
                        {`x${product.ammount} `}
                        {product.product_version.name}
                      </Box>
                      <AccordionIcon />
                    </AccordionHeader>
                    <AccordionPanel pb={4}>
                      <Stack direction="row" justify="flex-end">
                        <IconButton
                          icon={FaTrashAlt}
                          variantColor="red"
                          isLoading={formState.isSubmitting}
                          onClick={() =>
                            deleteFunction({
                              product_id: product.product_id,
                              order_id: order_id,
                            })
                          }
                          float="right"
                          aria-label="borrar"
                        >
                          Borrar
                        </IconButton>
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </Box>
          {/* ESTA MINIFUNCION EN EL FORMCONTROL BUSCA SI TIENE ERRORES EL OBJETO, HACIENDO TYPECASTING A BOOLEAN TODAS SUS PROPIEDADES */}
          <FormControl
            isInvalid={Object.values(errors).find((value) => !!value)}
          >
            <form onSubmit={onSubmit}>
              <FilterStack>
                <Stack justify="center">
                  {categories && (
                    <Box>
                      <FormLabel htmlFor="category">Categoría</FormLabel>
                      <Controller
                        defaultValue={0}
                        control={control}
                        name="category"
                        as={({ onChange, value, name }) => (
                          <FilterDropdown
                            menu={[
                              { name: "Todas las categorías", value: 0 },
                              ...categories.map((category: Category) => ({
                                name: category.name,
                                value: category.category_id,
                              })),
                            ]}
                            onChange={(e) => onChange(e.target.value)}
                            defaultValue={value}
                            name={name}
                          />
                        )}
                      />
                    </Box>
                  )}
                  {filteredMinifiedProductsList && (
                    <Box>
                      <FormLabel htmlFor="product_id">Producto</FormLabel>
                      <Controller
                        defaultValue={
                          filteredMinifiedProductsList[0]
                            ? filteredMinifiedProductsList[0].value
                            : 1
                        }
                        control={control}
                        name="product_id"
                        as={({ onChange, value, name }) => (
                          <FilterDropdown
                            menu={filteredMinifiedProductsList}
                            onChange={(e) => onChange(e.target.value)}
                            defaultValue={value}
                            name={name}
                          />
                        )}
                      />
                    </Box>
                  )}
                  {filteredMinifiedProductsList && (
                    <Box>
                      <FormLabel htmlFor="ammount">Cantidad</FormLabel>
                      <Controller
                        defaultValue={1}
                        control={control}
                        name="ammount"
                        as={({ onChange, value, name }) => (
                          <Box>
                            <Flex mr={3} mb={5}>
                              <NumberInput
                                maxW="100px"
                                mr="2rem"
                                value={value}
                                onChange={(n: ReactText) => onChange(n)}
                              />
                              <Slider
                                max={maxProducts}
                                min={1}
                                flex="1"
                                value={value}
                                onChange={(n: ReactText) => onChange(n)}
                              >
                                <SliderTrack />
                                <SliderFilledTrack />
                                <SliderThumb
                                  fontSize="sm"
                                  width="32px"
                                  height="20px"
                                  children={value}
                                />
                              </Slider>
                            </Flex>
                          </Box>
                        )}
                      />
                    </Box>
                  )}
                </Stack>
                <Button
                  variantColor="teal"
                  isLoading={formState.isSubmitting}
                  type="submit"
                  float="right"
                >
                  Agregar
                </Button>
              </FilterStack>
            </form>
          </FormControl>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default OrderProductsForm;
