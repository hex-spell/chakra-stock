import React from "react";
import { ListItemStack, LoadMoreButton } from "../../components/Layout";
import { ContactsListItem } from "../../components/ListItems";
import { ServerContact, Contact } from "../../services/interfaces";

interface IContactsListProps {
  result: {
    payload:ServerContact[];
    status:string;
    error:any;
  };
  count: number;
  onItemClick: (data: Contact) => void;
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
      {result.status==="loaded" && result.payload &&
        result.payload.map(
          ({
            name,
            address,
            phone,
            money,
            role,
            updated_at,
            contact_id,
          }: ServerContact) => (
            <ContactsListItem
              name={name}
              address={address}
              phone={phone}
              money={money}
              updatedAt={updated_at}
              onClick={() =>
                onItemClick({ name, address, phone, money, role, contact_id })
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
