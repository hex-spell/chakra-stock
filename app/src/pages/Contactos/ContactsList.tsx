import React from "react";
import { ListItemStack, LoadMoreButton } from "../../components/Layout";
import { ContactsListItem } from "../../components/ListItems";
import { Contact } from "../../services/interfaces";
import { IClickedItem } from "./Contactos";

interface IContactsListProps {
  result: any;
  count: number;
  onItemClick: (data: IClickedItem) => void;
  loadMoreData: () => void;
}

const ContactsList: React.FC<IContactsListProps> = ({
  result,
  count,
  onItemClick,
  loadMoreData,
}) => {
  return (
    <ListItemStack maxHeight="63vh">
      {result.payload &&
        result.payload.map(
          ({
            name,
            address,
            phone,
            money,
            updated_at,
            contact_id,
          }: Contact) => (
            <ContactsListItem
              name={name}
              address={address}
              phone={phone}
              money={money}
              updatedAt={updated_at}
              onClick={() =>
                onItemClick({ name, address, phone, money, contact_id })
              }
            />
          )
        )}
      {/* BOTON DE CARGAR MAS */}
      {result.payload && result.payload.length < count && (
        <LoadMoreButton action={loadMoreData} />
      )}
    </ListItemStack>
  );
};

export default ContactsList;
