import React, { ReactText, useEffect, useState, useCallback } from "react";
import { FilterStack } from "../../components/Layout";
import { useForm, Controller } from "react-hook-form";
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
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
  FormLabel,
  IconButton,
  List,
  ListItem,
  ListIcon,
  Stat,
  StatLabel,
  StatNumber,
  FormHelperText,
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
  orderProducts: OrderProduct[] | null;
  minifiedProductsList: MinifiedProduct[] | null;
  fetchMinifiedProductsList: () => void;
  fetchProductCategories: () => void;
  categories: Category[] | null;
  onFormSubmit: (data: PostOrderProduct, callback: () => void) => void;
  deleteFunction: (data: DeleteOrderProduct) => void;
  update: () => void;
}

const OrderProductsForm: React.FC<IOrderProductsFormProps> = ({
  isOpen,
  onClose,
  onFormSubmit,
  deleteFunction,
  orderProducts,
  minifiedProductsList,
  fetchMinifiedProductsList,
  fetchProductCategories,
  categories,
  clickedItem: {
    order_id,
    type,
    contact: { name },
    completed
  },
  update,
}) => {
  const {
    handleSubmit,
    formState,
    errors,
    control,
    watch,
    setValue,
  } = useForm();

  const [
    filteredMinifiedProductsList,
    setFilteredMinifiedProductsList,
  ] = useState<MinifiedProduct[] | null>(null);

  const [filteredMenu, setFilteredMenu] = useState<MenuOption[]>();

  const [maxProducts, setMaxProducts] = useState(0);

  const selectedCategory = watch("category");
  const selectedProduct = watch("product_id");

  //obtiene categorias y productos del server
  useEffect(() => {
    fetchMinifiedProductsList();
    fetchProductCategories();
  }, [fetchMinifiedProductsList, fetchProductCategories]);

  //filtra los menus por categoria y por productos que ya esten en el pedido
  useEffect(() => {
    if (orderProducts && minifiedProductsList) {
      setFilteredMinifiedProductsList(
        minifiedProductsList.filter(
          (product) =>
            !orderProducts.find(
              (orderProduct) => orderProduct.product_id === product.product_id
            )
        )
      );
    }
  }, [orderProducts, minifiedProductsList]);

  //busca el producto en el array y setea el maximo del slider
  const findAndSetMax = useCallback(
    (product_id: string | string, minifiedProductsList: MinifiedProduct[]) => {
      const selectedProductInArray = minifiedProductsList.find(
        (product) => product.product_id === parseInt(product_id)
      );
      setMaxProducts(
        selectedProductInArray && selectedProductInArray.stock
          ? selectedProductInArray.stock
          : 0
      );
      setValue("ammount", 1);
    },
    [setValue]
  );

  const onChangeCategory = useCallback(
    (category: string) => {
      if (
        orderProducts &&
        minifiedProductsList &&
        filteredMinifiedProductsList
      ) {
        const productsListFilteredByCategory = parseInt(category)
          ? filteredMinifiedProductsList.filter(
              (product) => product.category_id === parseInt(category)
            )
          : filteredMinifiedProductsList;
        const newMenu = productsListFilteredByCategory.map(
          ({ name, product_id }) => ({
            name,
            value: product_id,
          })
        );
        console.log(newMenu);
        setFilteredMenu(newMenu);
        const newDefaultProduct = newMenu[0] ? newMenu[0].value : 0;
        setValue("product_id", newDefaultProduct);
        findAndSetMax(`${newDefaultProduct}`, minifiedProductsList);
      }
    },
    [
      filteredMinifiedProductsList,
      findAndSetMax,
      minifiedProductsList,
      orderProducts,
      setValue,
    ]
  );

  useEffect(() => {
    if (filteredMinifiedProductsList) {
      onChangeCategory("0");
    }
  }, [categories, filteredMinifiedProductsList, onChangeCategory]);

  //setea la cantidad maxima que podes definir en un orderproduct por el stock del producto
  useEffect(() => {
    if (minifiedProductsList && selectedProduct) {
      findAndSetMax(selectedProduct, minifiedProductsList);
    }
  }, [minifiedProductsList, findAndSetMax, selectedProduct, selectedCategory]);

  const onSubmit = handleSubmit(({ product_id, ammount }) => {
    console.log({ product_id, ammount, order_id });
    onFormSubmit({ product_id, ammount, order_id }, () => {
      setValue("product_id", undefined);
      setValue("category", 0);
    });
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
      <DrawerContent overflowY="scroll" maxHeight="100vh">
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
                      <List spacing={3}>
                        <ListItem>
                          <ListIcon icon="attachment" color="green.500" />
                          Valor por unidad : $
                          {
                            //checkea si es compra o venta
                            type === "a"
                              ? product.product_version.buy_price
                              : product.product_version.sell_price
                          }
                        </ListItem>
                        <ListItem>
                          <ListIcon icon="attachment" color="green.500" />
                          Suma : $
                          {
                            //checkea si es compra o venta
                            type === "a"
                              ? product.product_version.buy_price *
                                product.ammount
                              : product.product_version.sell_price *
                                product.ammount
                          }
                        </ListItem>
                        {!completed && <ListItem>
                          <ListIcon
                            icon={
                              product.delivered === product.ammount
                                ? "check-circle"
                                : "warning"
                            }
                            color={
                              product.delivered === product.ammount
                                ? "green.500"
                                : "red.500"
                            }
                          />
                          Entregados : {product.delivered}
                        </ListItem>}
                      </List>
                      {!completed && <Stack direction="row" justify="flex-end">
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
                      </Stack>}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </Box>
          {/* ESTA MINIFUNCION EN EL FORMCONTROL BUSCA SI TIENE ERRORES EL OBJETO, HACIENDO TYPECASTING A BOOLEAN TODAS SUS PROPIEDADES */}
          {!completed && <Accordion allowToggle allowMultiple>
            <AccordionItem>
              <AccordionHeader>
                <Box flex="1" textAlign="center">
                  <FormLabel
                    htmlFor="addproduct"
                    textAlign="center"
                    width="100%"
                    fontWeight="bold"
                  >
                    Agregar un producto
                  </FormLabel>
                </Box>
                <AccordionIcon />
              </AccordionHeader>
              <AccordionPanel>
                <FormControl
                  isInvalid={Object.values(errors).find((value) => !!value)}
                >
                  <form onSubmit={onSubmit} name="addproduct">
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
                                  onChange={(e) => {
                                    onChange(e.target.value);
                                    onChangeCategory(e.target.value);
                                  }}
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
                                filteredMenu
                                  ? filteredMenu[0]
                                    ? filteredMenu[0].value
                                    : 1
                                  : 1
                              }
                              control={control}
                              name="product_id"
                              as={({ onChange, value, name }) => (
                                <FilterDropdown
                                  menu={filteredMenu ? filteredMenu : []}
                                  onChange={(e) => onChange(e.target.value)}
                                  defaultValue={value}
                                  name={name}
                                />
                              )}
                            />
                            <FormHelperText mb="10px">
                              {`En stock: ${maxProducts}`}
                            </FormHelperText>
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
                                      max={
                                        //checkea si es compra o venta
                                        type === "b" ? maxProducts : 20
                                      }
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
                      <Stack
                        justify="space-between"
                        direction="row"
                        align="center"
                      >
                        {orderProducts && (
                          <Stat>
                            <StatLabel>Suma total del pedido</StatLabel>
                            <StatNumber color="darkgreen">
                              $
                              {orderProducts.reduce(
                                (acc, product) =>
                                  //checkea si es compra o venta
                                  type === "a"
                                    ? acc +
                                      product.ammount *
                                        product.product_version.buy_price
                                    : acc +
                                      product.ammount *
                                        product.product_version.sell_price,
                                0
                              )}
                            </StatNumber>
                          </Stat>
                        )}
                        <Box>
                          <Button
                            variantColor="teal"
                            isLoading={formState.isSubmitting}
                            type="submit"
                          >
                            Agregar
                          </Button>
                        </Box>
                      </Stack>
                    </FilterStack>
                  </form>
                </FormControl>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default OrderProductsForm;
