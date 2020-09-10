import React from "react";
import { DrawerForm } from "../../components/Forms";
import { UseDisclosureReturn } from "@chakra-ui/core/dist/useDisclosure";
import { Order, OrderProduct, PostMarkDelivered } from "../../services/interfaces";

interface IDeliveredProductsDrawerFormProps {
  deliveredProductsDrawerState: UseDisclosureReturn;
  clickedItem: Order;
  orderProducts: OrderProduct[] | null;
  submitFunction: (data: PostMarkDelivered) => void;
}

const DeliveredProductsDrawerForm: React.FC<IDeliveredProductsDrawerFormProps> = ({
  deliveredProductsDrawerState,
  orderProducts,
  submitFunction,
  clickedItem: {order_id,contact:{name}}
}) => {
  return (
    <DrawerForm
      title={`Registrando entrega del pedido de ${name}`}
      subtitle="Los valores por defecto entregan el pedido completo."
      subsubtitle="Los valores negativos simbolizan retornos."
      isOpen={deliveredProductsDrawerState.isOpen}
      onClose={deliveredProductsDrawerState.onClose}
      onFormSubmit={(productsForm) =>{
        //mapea el formulario en el formato que necesito para el backend
        const products = Object.entries(productsForm).map((entry)=>({product_id:parseInt(entry[0]),ammount:parseInt(entry[1])}));
        submitFunction({ order_id, products})}
      }
      inputs={
        orderProducts ? 
        orderProducts.map((product)=>({
            name: `${product.product_id}`,
            title: product.product_version.name,
            defaultValue: product.ammount-product.delivered,
            validationRules: {
              required: true,
              pattern: {
                value: /^-?[0-9]*$/,
                message: "la cantidad debe ser numerica",
              },
              validate: {
                max:(value:string) => parseInt(value)<=product.ammount-product.delivered
              }
            },
            formHelperText:`Pedidos: ${product.ammount} - Entregados: ${product.delivered} - Faltan entregar: ${product.ammount-product.delivered}`,
            maxW:"20%"
        })) : [{
        name: "loading",
        title: "loading",
        defaultValue: 0,
        validationRules: {
          required: false,
          pattern: {
            value: /^-?[0-9]*$/,
            message: "El dinero debe ser numérico",
          },
        },
      }]}
    />
  );
};

export default DeliveredProductsDrawerForm;
