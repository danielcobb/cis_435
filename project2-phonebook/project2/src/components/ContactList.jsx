import ContactItem from "./ContactItem";

function ContactList({ contacts, filterText, onDelete }) {
  if (contacts.length === 0) {
    return <p>No contacts yet.</p>;
  }

  const lowerFilter = filterText.toLowerCase();
  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(lowerFilter) ||
      c.email.toLowerCase().includes(lowerFilter),
  );

  if (filtered.length === 0) {
    return <p>No matches found for {filterText}. </p>;
  }

  return (
    <ul>
      {filtered.map((contact) => (
        <ContactItem key={contact.id} contact={contact} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default ContactList;
