import React from "react";
import { DrawerForm } from "../../components/Forms";
import { UseDisclosureReturn } from "@chakra-ui/core/dist/useDisclosure";
import { Order } from "../../services/interfaces";
import { MenuOption } from "../../components/Layout/FilterDropdown";

interface IOrdersDrawerFormProps {
  contacts: MenuOption[];
  orderDrawerState: UseDisclosureReturn;
  orderDrawerFormState: {
    title: string;
    mode: string;
  };
  orderData: Order;
  submitFunction: (data: {order_id:number,contact_id:number,type:"a"|"b"}) => void;
}

const OrdersDrawerForm: React.FC<IOrdersDrawerFormProps> = ({
  orderDrawerState,
  orderDrawerFormState,
  orderData,
  submitFunction,
  contacts,
}) => {
  const { order_id } = orderData;
  return (
    <DrawerForm
      title={orderDrawerFormState.title}
      isOpen={orderDrawerState.isOpen}
      onClose={orderDrawerState.onClose}
      onFormSubmit={({ contact_id, type }) => {
        console.log({order_id, contact_id, type});
        submitFunction({order_id, contact_id, type});
      }}
      inputs={[
        {
          name: "contact_id",
          title: "Contacto",
          defaultValue: orderData.contact.contact_id ? orderData.contact.contact_id : contacts[0] ? contacts[0].value : 0,
          options: contacts,
          validationRules: {
            required:
              "Parece que no has creado ningun contacto",
          },
        },
        {
          name: "type",
          title: "Tipo",
          defaultValue: orderData.type ? orderData.type : "b",
          options: [{name:"Compra",value:"a"},{name:"Venta",value:"b"}],
          validationRules: {
            required:
              "Error en la seleccion de tipo",
          },
        }
      ]}
    />
  );
};

export default OrdersDrawerForm;
