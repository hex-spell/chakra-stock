import React from "react";
import { DrawerForm } from "../../components/Forms";
import { UseDisclosureReturn } from "@chakra-ui/core/dist/useDisclosure";
import { Transaction, UpdateTransaction } from "../../services/interfaces";

interface ITransactionsDrawerFormProps {
  transactionMenu: UseDisclosureReturn;
  transactionData: Transaction;
  submitFunction: (data: UpdateTransaction) => void;
}

const TransactionsDrawerForm: React.FC<ITransactionsDrawerFormProps> = ({
  transactionMenu,
  transactionData,
  submitFunction,
}) => {
  const { transaction_id, type, name } = transactionData;
  return (
    <DrawerForm
      title={`Modificar ${type === "a"? "pago" : "cobro"} a ${name}`}
      isOpen={transactionMenu.isOpen}
      onClose={transactionMenu.onClose}
      onFormSubmit={({ sum }) =>
        submitFunction({ sum, transaction_id })
      }
      inputs={[
        {
          name: "sum",
          title: "Dinero",
          defaultValue: transactionData.sum,
          validationRules: {
            required: false,
            pattern: {
              value: /^-?[0-9]*$/,
              message: "El dinero debe ser numérico",
            },
          },
        },
      ]}
    />
  );
};

export default TransactionsDrawerForm;
