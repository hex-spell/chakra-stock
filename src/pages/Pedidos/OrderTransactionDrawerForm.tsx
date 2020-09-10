import React from "react";
import { DrawerForm } from "../../components/Forms";
import { UseDisclosureReturn } from "@chakra-ui/core/dist/useDisclosure";
import { Order, PostTransaction } from "../../services/interfaces";

interface IOrdersDrawerFormProps {
  orderTransactionDrawerState: UseDisclosureReturn;
  orderData: Order;
  submitFunction: (data: PostTransaction) => void;
}

const OrdersDrawerForm: React.FC<IOrdersDrawerFormProps> = ({
  orderTransactionDrawerState,
  orderData,
  submitFunction,
}) => {
  const { order_id } = orderData;
  return (
    <DrawerForm
      title={`Registrar cobro de pedido de ${orderData.contact.name}`}
      isOpen={orderTransactionDrawerState.isOpen}
      onClose={orderTransactionDrawerState.onClose}
      onFormSubmit={({ sum }) => {
        submitFunction({order_id, sum});
      }}
      inputs={[
        {
          name: "sum",
          title: "$",
          defaultValue: orderData.sum - orderData.paid,
          validationRules: {
            required: true,
            pattern: {
              value: /^-?[0-9]*$/,
              message: "El dinero debe ser numérico",
            },
          },
        }
      ]}
    />
  );
};

export default OrdersDrawerForm;
