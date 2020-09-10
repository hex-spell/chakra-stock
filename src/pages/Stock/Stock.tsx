import React, { useState, useContext, useEffect } from "react";
import { Page, ActionButton } from "../../components/Layout";
import { FaBookOpen } from "react-icons/fa";
import { useDisclosure } from "@chakra-ui/core";
import { LayoutContext } from "../../context/Layout";
import { useProductsService } from "../../services";
import {
  ProductsFilterForm,
  ProductsList,
  ProductsItemMenu,
  ProductsMainMenu,
  ProductCategoriesDrawerForm,
  ProductsDrawerForm,
  ModifyProductCategoriesDrawerForm,
} from "./";
import { Product, Category, PostProduct } from "../../services/interfaces";
import { MenuOption } from "../../components/Layout/FilterDropdown";

const ClickedItemInitialState: Product = {
  product_id: 0,
  category_id: 0,
  name: "",
  buy_price: 0,
  sell_price: 0,
  stock:0,
  product_history_id:0
};

interface IProductsMenuState {
  title: string;
  mode: "error" | "edit" | "create";
  category_id: number;
}

export default function Stock() {
  //guarda datos del gasto que clickeaste para usarlos en un formulario
  const [clickedItem, setClickedItem] = useState<Product>(
    ClickedItemInitialState
  );

  //menu de clickear gastos
  const listItemDrawerState = useDisclosure();

  //menu de action button
  const actionButtonDrawerState = useDisclosure();

  //menu de crear/modifcar gasto
  const productDrawerState = useDisclosure();

  //menu de crear categoría de gasto
  const productCategoryDrawerState = useDisclosure();

  //menu de modifcar categoría de gasto
  const modifyProductCategoryDrawerState = useDisclosure();

  //define si el formulario de gastos va a ser usado para modificar uno existente o agregar uno nuevo
  const [productDrawerFormState, setProductMenuFormState] = useState({
    title: "error",
    mode: "error",
  });

  //menu de "estas seguro?"
  const { confirmationDrawerState, setConfirmationMenuData } = useContext(
    LayoutContext
  );

  //almacena los datos del item clickeado y modifica el estado del formulario de gastos
  const onItemClick = (data: Product) => {
    setClickedItem({ ...data });
    setProductMenuFormState({
      title: `Modificar: ${data.name}`,
      mode: "edit",
    });
    listItemDrawerState.onOpen();
  };

  //funcion ejecutada por los botones de agregar
  const onAddProductClick = (title: string) => {
    //meto en el clickeditem los datos del estado inicial
    setClickedItem({ ...ClickedItemInitialState });
    setProductMenuFormState({ title, mode: "create" });
    productDrawerState.onOpen();
  };

  //servicio que toma valores de los filtros, hace una peticion al server y devuelve datos
  const {
    result,
    count,
    updateFilters,
    loadMoreData,
    postOrUpdateProduct,
    fetchProductCategories,
    postOrUpdateProductCategory,
    deleteProductCategoryById,
    deleteProductById,
    categories,
    category_id
  } = useProductsService();

  useEffect(() => {
    fetchProductCategories();
  }, [fetchProductCategories]);

  const [categoryDropdown, setCategoryDropdown] = useState<MenuOption[] | null>(
    null
  );

  useEffect(() => {
    if (categories) {
      setCategoryDropdown(
        categories.map(({ name, category_id }: Category) => ({
          name,
          value: category_id,
        }))
      );
    }
  }, [categories]);

  return (
    <Page title="Stock">
      {/* DROPDOWNS Y BARRA DE BUSQUEDA */}
      <ProductsFilterForm
        updateFilters={updateFilters}
        categories={categoryDropdown}
      />
      {/* LISTA DE GASTOS */}
      <ProductsList
        result={result}
        count={count}
        onItemClick={onItemClick}
        loadMoreData={loadMoreData}
      />
      {/* BOTON DE MENU */}
      <ActionButton
        icon={FaBookOpen}
        ariaLabel="Menu: Stock"
        action={() => actionButtonDrawerState.onOpen()}
      />
      {/* MENU DE GASTO ESPECIFICO */}
      <ProductsItemMenu
        listItemDrawerState={listItemDrawerState}
        productDrawerState={productDrawerState}
        confirmationDrawerState={confirmationDrawerState}
        productData={clickedItem}
        setConfirmationMenuData={setConfirmationMenuData}
        deleteFunction={deleteProductById}
      />
      {/* MENU PRINCIPAL */}
      <ProductsMainMenu
        actionButtonDrawerState={actionButtonDrawerState}
        onAddProductClick={(title) => onAddProductClick(title)}
        onAddProductCategoryClick={productCategoryDrawerState}
        onModifyProductCategoryClick={modifyProductCategoryDrawerState}
      />
      {/* FORMULARIO DE MODIFICAR/ELIMINAR GASTOS */}
      <ProductsDrawerForm
        categories={categoryDropdown}
        productDrawerState={productDrawerState}
        productDrawerFormState={productDrawerFormState}
        submitFunction={(data: PostProduct) => postOrUpdateProduct(data)}
        productData={clickedItem}
      />
      {/* FORMULARIO DE CREAR CATEGORIA DE GASTOS */}
      {/* NO OLVIDARME DE HACER ERROR HANDLING PARA NOMBRES REPETIDOS */}
      <ProductCategoriesDrawerForm
        submitFunction={postOrUpdateProductCategory}
        productCategoryDrawerState={productCategoryDrawerState}
        categories={categoryDropdown}
      />
      {/* FORMULARIO DE MODIFICAR/ELIMINAR CATEGORIA DE GASTOS */}
      <ModifyProductCategoriesDrawerForm
        submitFunction={postOrUpdateProductCategory}
        modifyProductCategoryDrawerState={modifyProductCategoryDrawerState}
        categories={categoryDropdown}
        selectedCategory={category_id}
        deleteProductCategoryById={deleteProductCategoryById}
        confirmationDrawerState={confirmationDrawerState}
        setConfirmationMenuData={setConfirmationMenuData}
        productCategoryDrawerState={productCategoryDrawerState}
      />
    </Page>
  );
}
